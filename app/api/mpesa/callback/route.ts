import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('M-Pesa Callback Received:', JSON.stringify(body, null, 2));
    
    // Parse callback data
    const { Body } = body;
    const { stkCallback } = Body;
    
    const checkoutRequestId = stkCallback.CheckoutRequestID;
    const resultCode = stkCallback.ResultCode;
    const resultDesc = stkCallback.ResultDesc;
    
    if (resultCode === 0) {
      // Payment successful
      const { CallbackMetadata } = stkCallback;
      const metadata = CallbackMetadata.Item;
      
      // Extract payment details
      const amount = metadata.find((item: any) => item.Name === 'Amount')?.Value;
      const mpesaReceiptNumber = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
      const phone = metadata.find((item: any) => item.Name === 'PhoneNumber')?.Value;
      
      console.log('Payment Successful:', {
        checkoutRequestId,
        amount,
        mpesaReceiptNumber,
        phone,
      });
      
      // TODO: Update order status in database
      // await updateOrderStatus(checkoutRequestId, 'paid', { mpesaReceiptNumber });
      
      // TODO: Send confirmation SMS/WhatsApp to customer
      // await sendConfirmation(phone, mpesaReceiptNumber, amount);
      
    } else {
      // Payment failed or cancelled
      console.log('Payment Failed:', resultDesc);
      // TODO: Update order status to failed
    }
    
    // Always respond with success to Safaricom
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' });
    
  } catch (error) {
    console.error('M-Pesa Callback Error:', error);
    return NextResponse.json(
      { ResultCode: 1, ResultDesc: 'Error' },
      { status: 500 }
    );
  }
}
