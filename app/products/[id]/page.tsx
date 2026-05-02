import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductById, getAllProducts } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  // Get related products (same brand, excluding current)
  const relatedProducts = getAllProducts()
    .filter(p => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <a href="/products" className="inline-flex items-center text-green-700 hover:underline mb-6">
        ← Back to Products
      </a>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            {product.inStock ? (
              <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">In Stock</span>
            ) : (
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">Out of Stock</span>
            )}
          </div>

          <p className="text-4xl font-bold text-green-700 mb-6">
            KSh {product.price.toLocaleString()}
          </p>

          {/* Specs */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Specifications</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-gray-600">Brand</dt>
              <dd className="font-medium">{product.brand}</dd>
              
              <dt className="text-gray-600">Processor</dt>
              <dd className="font-medium">{product.cpu}</dd>
              
              <dt className="text-gray-600">RAM</dt>
              <dd className="font-medium">{product.ram}</dd>
              
              <dt className="text-gray-600">Storage</dt>
              <dd className="font-medium">{product.storage}</dd>
              
              <dt className="text-gray-600">Graphics</dt>
              <dd className="font-medium">{product.graphics}</dd>
              
              <dt className="text-gray-600">Touchscreen</dt>
              <dd className="font-medium">{product.touch ? 'Yes' : 'No'}</dd>
              
              <dt className="text-gray-600">Condition</dt>
              <dd className="font-medium">{product.condition}</dd>
            </dl>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <AddToCartButton product={product} />
            <a 
              href={`https://wa.me/254723559412?text=Hi, I'm interested in ${product.name} (KSh ${product.price.toLocaleString()})`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border-2 border-green-600 text-green-700 hover:bg-green-50 text-lg py-3 px-8 rounded-lg">
                Inquire on WhatsApp
              </button>
            </a>
          </div>

          {/* Trust Signals */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              ✓ 30-day warranty &nbsp; | &nbsp; ✓ Visit our Nairobi shops &nbsp; | &nbsp; ✓ M-Pesa payment accepted
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map(product => ({
    id: product.id,
  }));
}
