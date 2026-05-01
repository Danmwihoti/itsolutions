import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-green-700">
          Kenyan IT Solutions
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/products" className="text-gray-700 hover:text-green-700">
            Laptops
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-700">
            Contact
          </Link>
        </div>

        {/* Cart + WhatsApp Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative">
            <Button variant="outline" className="border-gray-300">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          <a 
            href="https://wa.me/0723559412" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700">
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
