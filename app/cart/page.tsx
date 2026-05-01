'use client';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any laptops yet.
        </p>
        <Link href="/products">
          <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
            Browse Laptops
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-white p-4 rounded-lg border">
              <img 
                src={product.image} 
                alt={product.name}
                className="h-24 w-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.specs}</p>
                <p className="text-green-700 font-bold mt-1">KSh {product.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button 
                  onClick={() => removeFromCart(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-1 rounded-md bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="font-bold">KSh {(product.price * quantity).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg border h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} items)</span>
              <span>KSh {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>Free (Pickup)</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-700">KSh {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Link href="/checkout">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                Proceed to Checkout
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            ✓ Pay with M-Pesa &nbsp; | &nbsp; ✓ Free pickup at our Nairobi shops
          </p>
        </div>
      </div>
    </main>
  );
}
