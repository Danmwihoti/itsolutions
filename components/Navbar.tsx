import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
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

        {/* WhatsApp Button */}
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
    </nav>
  );
}
