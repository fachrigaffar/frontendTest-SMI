import { useState } from 'react';
import { ImageOff, Star } from 'lucide-react';
import type { Product } from '../../types';
import { formatCategory, formatCurrency } from '../../utils/formatCurrency';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const available = product.stock === null ? null : product.stock > 0;
  return (
    <article className="product-card" style={{ animationDelay: `${Math.min(index, 11) * 35}ms` }}>
      <div className={`product-image ${imageFailed || !product.thumbnail ? 'image-fallback' : ''}`}>
        {!imageFailed && product.thumbnail ? (
          <img src={product.thumbnail} alt={product.title} loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <div className="image-placeholder" aria-label="Gambar produk tidak tersedia"><ImageOff size={26} /><span>Image unavailable</span></div>
        )}
        {product.discountPercentage !== null && product.discountPercentage > 0 && <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>}
        {available !== null && <span className={`stock-badge ${available ? 'in-stock' : 'out-stock'}`}><span className="stock-dot" />{available ? 'Tersedia' : 'Habis'}</span>}
      </div>
      <div className="product-info">
        <div className="product-meta"><span className="category-label">{product.category ? formatCategory(product.category) : 'Katalog'}</span>{product.rating !== null && <span className="rating"><Star size={13} fill="currentColor" aria-hidden="true" />{product.rating.toFixed(1)}</span>}</div>
        <h3 title={product.title}>{product.title || 'Produk tanpa nama'}</h3>
        <p className="product-description">{product.description || 'Temukan detail produk ini di katalog kami.'}</p>
        <div className="product-footer"><strong>{formatCurrency(product.price)}</strong></div>
      </div>
    </article>
  );
}
