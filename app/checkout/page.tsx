'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryMethod: 'pickup',
    pickupLocation: 'tsavo',
    deliveryAddress: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.phone) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setMessage('Sending M-Pesa prompt to your phone...');

    try {
      const response = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          amount: totalPrice,
          orderId: `ORDER-${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('STK Push sent! Check your phone and enter M-Pesa PIN to complete payment.');
        setTimeout(() => {
          clearCart();
          router.push('/order-confirmation?status=success');
        }, 5000);
      } else {
        setMessage(`Payment failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('Payment failed. Please try again or contact us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (totalItems === 0 && typeof window !== 'undefined') {
    router.push('/cart');
    return null;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="0722000000"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Enter phone number registered with M-Pesa</p>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Delivery Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={handleInputChange}
                />
                <div>
                  <p className="font-medium">Pickup at Shop (Free)</p>
                  <p className="text-sm text-gray-600">Collect from any of our 3 Nairobi locations</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="delivery"
                  checked={formData.deliveryMethod === 'delivery'}
                  onChange={handleInputChange}
                />
                <div>
                  <p className="font-medium">Delivery in Nairobi (KSh 300)</p>
                  <p className="text-sm text-gray-600">Delivery within 24 hours in Nairobi</p>
                </div>
              </label>
            </div>

            {formData.deliveryMethod === 'pickup' && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Select Pickup Location</label>
                <select
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="tsavo">Tsavo Road (Tetu Arcade G4)</option>
                  <option value="tomboya">Tom Mboya Street (Old Nation B27)</option>
                  <option value="moi">Moi Avenue (Iconic Plaza G1)</option>
                </select>
              </div>
            )}

            {formData.deliveryMethod === 'delivery' && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Delivery Address</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your full delivery address"
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg border h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm">
                <span>{product.name} x{quantity}</span>
                <span>KSh {(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="space-y-2 mt-4">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span>KSh {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>{formData.deliveryMethod === 'delivery' ? 'KSh 300' : 'Free'}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-700">
                KSh {(totalPrice + (formData.deliveryMethod === 'delivery' ? 300 : 0)).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay with M-Pesa (KSh ${(totalPrice + (formData.deliveryMethod === 'delivery' ? 300 : 0)).toLocaleString()})`}
            </Button>
            <a 
              href={`https://wa.me/254723559412?text=Hi, I want to order laptops worth KSh ${totalPrice.toLocaleString()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full">
                Or Chat on WhatsApp
              </Button>
            </a>
          </div>

          {message && (
            <p className={`mt-4 text-sm ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
