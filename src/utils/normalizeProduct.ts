import type { Product, ProductApi } from '../types';

export function normalizeProducts(items: ProductApi[]): Product[] {
  return items
    .filter((item): item is ProductApi & { id: number } => Number.isInteger(item.id) && Number(item.id) > 0)
    .map((item) => ({
      id: item.id,
      title: typeof item.title === 'string' && item.title.trim() ? item.title.trim() : 'Produk tanpa nama',
      description: typeof item.description === 'string' ? item.description : '',
      category: typeof item.category === 'string' ? item.category : '',
      price: typeof item.price === 'number' && Number.isFinite(item.price) ? item.price : null,
      rating: typeof item.rating === 'number' && Number.isFinite(item.rating) ? item.rating : null,
      stock: typeof item.stock === 'number' && Number.isFinite(item.stock) ? item.stock : null,
      thumbnail: typeof item.thumbnail === 'string' && item.thumbnail.trim() ? item.thumbnail : null,
      brand: typeof item.brand === 'string' ? item.brand : '',
      discountPercentage: typeof item.discountPercentage === 'number' && Number.isFinite(item.discountPercentage) ? item.discountPercentage : null,
    }));
}
