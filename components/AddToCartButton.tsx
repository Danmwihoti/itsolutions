'use client';

import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check } from 'lucide-react';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);

  const isInCart = items.some(item => item.product.id === product.id);

  const handleClick = () => {
    addToCart(product as any);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button 
      className="bg-green-600 hover:bg-green-700 text-lg py-6 px-8"
      disabled={!product.inStock}
      onClick={handleClick}
    >
      {added ? (
        <span className="flex items-center gap-2">
          <Check className="h-5 w-5" /> Added to Cart
        </span>
      ) : isInCart ? (
        'Add to Cart (In Cart)'
      ) : product.inStock ? (
        'Add to Cart'
      ) : (
        'Out of Stock'
      )}
    </Button>
  );
}
