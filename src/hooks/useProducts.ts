import { useCallback, useEffect, useState } from 'react';
import type { Product } from '../types';
import { getCategories, getProducts } from '../services/productService';

export function useProducts(query: string, category: string, page: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState(false);
  const pageSize = 12;

  const loadProducts = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getProducts({ query, category, skip: (page - 1) * pageSize, signal });
      setProducts(result.products);
      setTotal(result.total);
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === 'AbortError') return;
      setError(cause instanceof Error ? cause.message : 'Produk gagal dimuat.');
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [query, category, page]);

  useEffect(() => {
    const controller = new AbortController();
    void loadProducts(controller.signal);
    return () => controller.abort();
  }, [loadProducts]);

  useEffect(() => {
    const controller = new AbortController();
    void getCategories(controller.signal)
      .then(setCategories)
      .catch((cause: unknown) => {
        if (!(cause instanceof DOMException && cause.name === 'AbortError')) setCategoryError(true);
      });
    return () => controller.abort();
  }, []);

  const retry = useCallback(() => { void loadProducts(); }, [loadProducts]);
  return { products, total, categories, loading, error, categoryError, pageSize, retry };
}
