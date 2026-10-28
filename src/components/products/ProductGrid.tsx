import { ProductCard } from './ProductCard';
import type { Product } from '../../types';

export function ProductSkeleton() {
  return <article className="skeleton-card" aria-hidden="true"><div className="skeleton-image shimmer" /><div className="skeleton-content"><div className="skeleton-line short shimmer" /><div className="skeleton-line title shimmer" /><div className="skeleton-line shimmer" /><div className="skeleton-line price shimmer" /></div></article>;
}

export function ProductGrid({ products, loading }: { products: Product[]; loading: boolean }) {
  if (loading) return <div className="product-grid" aria-label="Memuat produk">{Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)}</div>;
  return <div className="product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>;
}
