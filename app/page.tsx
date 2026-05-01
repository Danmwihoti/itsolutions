import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { getFeaturedProducts } from '@/lib/products';

export default async function HomePage() {
  const featuredProducts = getFeaturedProducts(8);

  return (
    <main>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
          Featured Laptops
        </h2>
        <ProductGrid products={featuredProducts} />
        <div className="text-center mt-8">
          <a 
            href="/products" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            View All Products
          </a>
        </div>
      </section>
    </main>
  );
}
