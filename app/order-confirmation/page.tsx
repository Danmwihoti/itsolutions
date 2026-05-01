'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  if (status === 'success') {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-gray-600 mb-2">Thank you for your order.</p>
        <p className="text-gray-600 mb-8">
          Your payment has been received. We will contact you shortly to arrange pickup/delivery.
        </p>
        <div className="bg-green-50 p-6 rounded-lg max-w-md mx-auto mb-8">
          <h3 className="font-bold mb-2">Next Steps:</h3>
          <ul className="text-left space-y-2 text-gray-700">
            <li>✓ You will receive an M-Pesa confirmation message</li>
            <li>✓ Our team will call you within 2 hours</li>
            <li>✓ Pickup from any of our 3 Nairobi shops</li>
            <li>✓ Or free delivery within Nairobi (24hrs)</li>
          </ul>
        </div>
        <div className="space-x-4">
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              Continue Shopping
            </Button>
          </Link>
          <a href="https://wa.me/0723559412" target="_blank">
            <Button variant="outline">
              Contact Us on WhatsApp
            </Button>
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Status</h1>
      <p className="text-xl text-gray-600 mb-8">
        Something went wrong. Please contact us for assistance.
      </p>
      <a href="https://wa.me/0723559412" target="_blank">
        <Button className="bg-green-600 hover:bg-green-700">
          Chat on WhatsApp
        </Button>
      </a>
    </main>
  );
}
