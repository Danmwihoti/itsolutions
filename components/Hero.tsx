import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-700 to-blue-800 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Kenyan IT Solutions
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Quality refurbished laptops for students, professionals & small businesses in Nairobi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-3">
              Shop Laptops
            </Button>
          </Link>
          <Link href="https://wa.me/254723559412" target="_blank">
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-3">
              Chat on WhatsApp
            </Button>
          </Link>
        </div>
        <div className="mt-8 text-sm opacity-90">
          <p>Visit us: Tsavo Road (Tetu Arcade G4) • Tom Mboya Street (Old Nation B27) • Moi Avenue (Iconic Plaza G1)</p>
        </div>
      </div>
    </section>
  );
}
