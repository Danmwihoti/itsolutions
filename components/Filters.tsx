'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getBrands, getPriceRange } from '@/lib/products';

export default function Filters() {
  const brands = getBrands();
  const { min, max } = getPriceRange();
  const [priceRange, setPriceRange] = useState<[number, number]>([min, max]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [touchOnly, setTouchOnly] = useState(false);

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (selectedBrand) params.set('brand', selectedBrand);
    if (priceRange[0] > min) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < max) params.set('maxPrice', priceRange[1].toString());
    if (touchOnly) params.set('touch', 'true');
    
    window.location.href = `/products?${params.toString()}`;
  };

  const clearFilters = () => {
    setSelectedBrand('');
    setPriceRange([min, max]);
    setTouchOnly(false);
    window.location.href = '/products';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border w-full md:w-64">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      {/* Brand Filter */}
      <div className="mb-6">
        <Label className="mb-2 block">Brand</Label>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger>
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            {brands.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <Label className="mb-2 block">Price Range (KSh)</Label>
        <Slider
          min={min}
          max={max}
          step={1000}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{priceRange[0].toLocaleString()}</span>
          <span>{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Touchscreen Filter */}
      <div className="mb-6 flex items-center space-x-2">
        <Checkbox 
          id="touch" 
          checked={touchOnly} 
          onCheckedChange={(checked) => setTouchOnly(checked === true)} 
        />
        <Label htmlFor="touch">Touchscreen Only</Label>
      </div>

      {/* Filter Buttons */}
      <div className="space-y-2">
        <Button onClick={handleFilter} className="w-full bg-green-600 hover:bg-green-700">
          Apply Filters
        </Button>
        <Button onClick={clearFilters} variant="outline" className="w-full">
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
