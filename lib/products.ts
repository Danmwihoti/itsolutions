import productsData from '@/data/products.json';

export interface Product {
  id: string;
  name: string;
  brand: string;
  cpu: string;
  ram: string;
  storage: string;
  graphics: string;
  touch: boolean;
  condition: string;
  price: number;
  inStock: boolean;
  image: string;
  specs: string;
}

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getFeaturedProducts(count: number = 8): Product[] {
  // Return first N products as featured (can be customized later)
  return getAllProducts().slice(0, count);
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(product => product.id === id);
}

export function getBrands(): string[] {
  const brands = new Set(getAllProducts().map(p => p.brand));
  return Array.from(brands);
}

export function getPriceRange(): { min: number; max: number } {
  const products = getAllProducts();
  return {
    min: Math.min(...products.map(p => p.price)),
    max: Math.max(...products.map(p => p.price))
  };
}
