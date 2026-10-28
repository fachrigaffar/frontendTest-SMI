import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Boxes, PackageCheck } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { Pagination } from '../components/products/Pagination';
import { ProductGrid } from '../components/products/ProductGrid';
import { SearchBar } from '../components/products/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../types';

function sortProducts(products: Product[], sort: string): Product[] {
  if (sort === 'featured') return products;
  return [...products].sort((a, b) => {
    if (sort === 'price-asc') return (a.price ?? Infinity) - (b.price ?? Infinity);
    if (sort === 'price-desc') return (b.price ?? -Infinity) - (a.price ?? -Infinity);
    if (sort === 'rating-desc') return (b.rating ?? -Infinity) - (a.rating ?? -Infinity);
    return 0;
  });
}

export function ProductsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [dark, setDark] = useState(() => localStorage.getItem('atelier-theme') === 'dark');
  const debouncedQuery = useDebounce(query, 350);
  const { products, total, categories, loading, error, pageSize, retry } = useProducts(debouncedQuery, category, page);
  const visibleProducts = useMemo(() => sortProducts(products, sort), [products, sort]);
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; localStorage.setItem('atelier-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { setPage(1); }, [debouncedQuery, category]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); document.querySelector<HTMLInputElement>('.search-field input')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const resetFilters = () => { setQuery(''); setCategory(''); setSort('featured'); setPage(1); };
  const from = total ? (page - 1) * pageSize + 1 : 0;
  const to = Math.min(page * pageSize, total);
  return (
    <div className="app-shell">
      <Navbar dark={dark} onToggleTheme={() => setDark((value) => !value)} />
      <main className="catalog-page">
        <div className="catalog-heading">
          <div><div className="eyebrow"><span className="heading-dot" /> KOLEKSI PILIHAN</div><h1>Temukan favoritmu<span className="heading-period">.</span></h1><p>Hal-hal baik, dikurasi untuk keseharianmu.</p></div>
          <div className="collection-stamp"><span>CURATED</span><strong>FOR<br />YOU</strong><ArrowUpRight size={18} /></div>
        </div>
        <div className="collection-stats"><div><span className="stat-icon"><Boxes size={17} /></span><span><strong>{total.toLocaleString('id-ID')}</strong> produk tersedia</span></div><span className="stats-divider" /><div><span className="stat-icon green"><PackageCheck size={17} /></span><span>Gratis ongkir <strong>min. $50</strong></span></div></div>
        <SearchBar query={query} category={category} sort={sort} categories={categories} onQueryChange={setQuery} onCategoryChange={setCategory} onSortChange={setSort} />
        <div className="results-row"><p>{loading ? 'Memuat koleksi...' : error ? 'Koleksi belum tersedia' : total === 0 ? 'Belum ada produk' : <>Menampilkan <strong>{from}–{to}</strong> dari <strong>{total.toLocaleString('id-ID')}</strong> produk</>}</p><span className="results-caption">DIPILIH DENGAN SAKSAMA</span></div>
        {error ? <ErrorMessage message={error} onRetry={retry} /> : !loading && products.length === 0 ? <EmptyState onReset={resetFilters} /> : <ProductGrid products={visibleProducts} loading={loading} />}
        {!loading && !error && products.length > 0 && <div className="catalog-bottom"><span className="bottom-note">Koleksi yang baik membuat hari lebih baik <span>✳</span></span><Pagination page={page} totalPages={totalPages} onChange={setPage} /></div>}
        {!loading && total === 0 && !error && <div className="catalog-bottom"><span className="bottom-note">Koleksi yang baik membuat hari lebih baik <span>✳</span></span></div>}
      </main>
      <footer className="site-footer"><span><span className="footer-mark">FS</span> FachShop</span><span>Thoughtfully curated, always.</span><span>© 2026 FachShop</span></footer>
    </div>
  );
}
