import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCategories, getProducts } from './productService';

afterEach(() => vi.unstubAllGlobals());

describe('productService', () => {
  it('requests the selected search page and normalizes products', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        products: [
          { id: 4, title: 'Bag', price: 12.5, thumbnail: 'https://example.com/bag.png' },
          { title: 'Invalid record' },
        ],
        total: 25,
        skip: 12,
        limit: 12,
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await getProducts({ query: 'blue bag', skip: 12 });
    const requestedUrl = String(fetchMock.mock.calls[0][0]);
    expect(requestedUrl).toContain('/products/search?q=blue%20bag');
    expect(requestedUrl).toContain('limit=12');
    expect(requestedUrl).toContain('skip=12');
    expect(result).toMatchObject({ total: 25, skip: 12, limit: 12 });
    expect(result.products).toHaveLength(1);
    expect(result.products[0].title).toBe('Bag');
  });

  it('requests category options and supports category objects from the API', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => [{ slug: 'beauty', name: 'Beauty' }, 'fragrances'] }));
    await expect(getCategories()).resolves.toEqual(['beauty', 'fragrances']);
  });

  it('surfaces an API error response for retry UI', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(getProducts()).rejects.toThrow('Terjadi masalah saat mengambil data');
  });
});
