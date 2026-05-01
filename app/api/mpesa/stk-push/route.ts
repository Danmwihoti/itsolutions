import { NextRequest, NextResponse } from 'next/server';

// M-Pesa Daraja API credentials (use environment variables in production)
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY || 'your_consumer_key';
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET || 'your_consumer_secret';
const SHORTCODE = process.env.MPESA_SHORTCODE || '174379'; // Sandbox default
const PASSKEY = process.env.MPESA_PASSKEY || 'your_passkey';
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL || 'https://your-domain.com/api/mpesa/callback';

// Get access token from Safaricom
async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  
  const response = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    }
  );
  
  const data = await response.json();
  return data.access_token;
}

// Generate password for STK Push
function generatePassword(timestamp: string) {
  const str = `${SHORTCODE}${PASSKEY}${timestamp}`;
  return Buffer.from(str).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const { phone, amount, orderId } = await request.json();
    
    // Validate inputs
    if (!phone || !amount) {
      return NextResponse.json(
        { error: 'Phone number and amount are required' },
        { status: 400 }
      );
    }

    // Format phone number (remove leading 0, add 254)
    let formattedPhone = phone.replace(/\s/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1);
    }
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    // Get access token
    const accessToken = await getAccessToken();
    
    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
    const password = generatePassword(timestamp);

    // STK Push request
    const stkPushData = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: orderId || 'KenyanIT-Solutions',
      TransactionDesc: 'Payment for laptop purchase',
    };

    const response = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stkPushData),
      }
    );

    const data = await response.json();

    if (data.ResponseCode === '0') {
      return NextResponse.json({
        success: true,
        checkoutRequestId: data.CheckoutRequestID,
        merchantRequestId: data.MerchantRequestID,
        message: 'STK Push sent successfully. Check your phone.',
      });
    } else {
      return NextResponse.json(
        { error: data.ResponseDescription || 'STK Push failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('M-Pesa STK Push error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
