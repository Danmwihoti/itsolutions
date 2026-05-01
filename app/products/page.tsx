import ProductGrid from '@/components/ProductGrid';
import Filters from '@/components/Filters';
import SearchBar from '@/components/SearchBar';
import { getAllProducts } from '@/lib/products';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; brand?: string; minPrice?: string; maxPrice?: string; touch?: string };
}) {
  const allProducts = getAllProducts();
  
  // Apply filters
  const filteredProducts = allProducts.filter((product) => {
    // Search filter
    if (searchParams.search) {
      const searchLower = searchParams.search.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.specs.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    // Brand filter
    if (searchParams.brand && product.brand !== searchParams.brand) return false;
    
    // Price range filter
    if (searchParams.minPrice && product.price < Number(searchParams.minPrice)) return false;
    if (searchParams.maxPrice && product.price > Number(searchParams.maxPrice)) return false;
    
    // Touchscreen filter
    if (searchParams.touch === 'true' && !product.touch) return false;
    
    return true;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8">All Laptops</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64">
          <Filters />
        </div>
        <div className="flex-1">
          <SearchBar />
          <p className="text-gray-600 mb-4">{filteredProducts.length} products found</p>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </main>
  );
}
