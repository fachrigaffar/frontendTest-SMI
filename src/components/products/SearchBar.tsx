import { ArrowDownWideNarrow, Search, X } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { formatCategory } from '../../utils/formatCurrency';

interface SearchBarProps {
  query: string;
  category: string;
  sort: string;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function SearchBar({ query, category, sort, categories, onQueryChange, onCategoryChange, onSortChange }: SearchBarProps) {
  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value);
  return (
    <div className="catalog-controls">
      <label className="search-field">
        <Search size={19} aria-hidden="true" />
        <span className="sr-only">Cari produk</span>
        <input value={query} onChange={handleQuery} placeholder="Cari produk yang kamu suka..." />
        {query && <button type="button" className="clear-search" aria-label="Hapus pencarian" onClick={() => onQueryChange('')}><X size={17} /></button>}
        <kbd>⌘ K</kbd>
      </label>
      <label className="select-field">
        <span className="sr-only">Kategori</span>
        <select value={category} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">Semua kategori</option>
          {categories.map((item) => <option key={item} value={item}>{formatCategory(item)}</option>)}
        </select>
      </label>
      <label className="select-field sort-select">
        <ArrowDownWideNarrow size={16} aria-hidden="true" />
        <span className="sr-only">Urutkan produk</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="featured">Unggulan</option>
          <option value="price-asc">Harga: terendah</option>
          <option value="price-desc">Harga: tertinggi</option>
          <option value="rating-desc">Rating tertinggi</option>
        </select>
      </label>
    </div>
  );
}
