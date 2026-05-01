'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    window.location.href = `/products?${params.toString()}`;
  };

  return (
    <form onSubmit={handleSearch} className="mb-6 flex gap-2">
      <Input
        type="text"
        placeholder="Search laptops (e.g. HP ZBOOK, i7, 16GB RAM)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
}
