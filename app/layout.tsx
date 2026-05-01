import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'Kenyan IT Solutions - Refurbished Laptops Nairobi',
  description: 'Quality refurbished laptops for students, professionals & small businesses in Nairobi. HP, Dell, Lenovo, Apple.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
