const API_BASE_URL = 'https://dummyjson.com';

export class ApiError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new ApiError('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
  }

  if (!response.ok) {
    throw new ApiError('Terjadi masalah saat mengambil data. Silakan coba lagi.', response.status);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError('Respons server tidak dapat dibaca.');
  }
}
