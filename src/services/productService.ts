import type { ProductApi, ProductPage, ProductsResponse } from '../types';
import { apiGet } from './apiClient';
import { normalizeProducts } from '../utils/normalizeProduct';

const PAGE_SIZE = 12;

type ProductEndpoint = '/products' | `/products/search?q=${string}` | `/products/category/${string}`;

export async function getProducts(options: {
  query?: string;
  category?: string;
  skip?: number;
  signal?: AbortSignal;
} = {}): Promise<ProductPage> {
  const { query = '', category = '', skip = 0, signal } = options;
  const params = new URLSearchParams({ limit: String(PAGE_SIZE), skip: String(skip), select: 'id,title,description,category,price,rating,stock,thumbnail,images,brand,discountPercentage' });
  let endpoint: ProductEndpoint = '/products';
  if (query.trim()) endpoint = `/products/search?q=${encodeURIComponent(query.trim())}`;
  else if (category) endpoint = `/products/category/${encodeURIComponent(category)}`;

  const separator = endpoint.includes('?') ? '&' : '?';
  const result = await apiGet<ProductsResponse>(`${endpoint}${separator}${params.toString()}`, signal);
  const rawProducts = Array.isArray(result.products) ? result.products : [];
  const products = normalizeProducts(rawProducts as ProductApi[]);

  return {
    products,
    total: Number.isFinite(result.total) ? Math.max(0, Number(result.total)) : products.length,
    skip: Number.isFinite(result.skip) ? Math.max(0, Number(result.skip)) : skip,
    limit: Number.isFinite(result.limit) && Number(result.limit) > 0 ? Number(result.limit) : PAGE_SIZE,
  };
}

export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  const result = await apiGet<Array<string | { slug?: string; name?: string }>>('/products/categories', signal);
  return Array.isArray(result)
    ? result.map((category) => (typeof category === 'string' ? category : category.slug ?? category.name ?? '')).filter(Boolean)
    : [];
}
