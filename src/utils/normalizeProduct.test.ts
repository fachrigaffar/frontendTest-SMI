import { describe, expect, it } from 'vitest';
import { normalizeProducts } from './normalizeProduct';

describe('normalizeProducts', () => {
  it('filters items without a valid ID and supplies safe defaults for missing fields', () => {
    const products = normalizeProducts([
      { id: 1, title: '  Kamera  ', price: 29.5, rating: 4.4, stock: 0, thumbnail: 'https://example.com/camera.png' },
      { title: 'No ID', price: 10 },
      { id: 0, title: 'Invalid ID' },
      { id: 2, title: '  ', price: Number.NaN, rating: Number.POSITIVE_INFINITY, thumbnail: '' },
    ]);

    expect(products).toHaveLength(2);
    expect(products[0]).toMatchObject({ id: 1, title: 'Kamera', price: 29.5, stock: 0 });
    expect(products[1]).toMatchObject({ id: 2, title: 'Produk tanpa nama', price: null, rating: null, thumbnail: null });
  });
});
