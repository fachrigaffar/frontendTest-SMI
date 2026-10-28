export interface ProductApi {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  rating?: number;
  stock?: number;
  thumbnail?: string;
  images?: string[];
  brand?: string;
  discountPercentage?: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number | null;
  rating: number | null;
  stock: number | null;
  thumbnail: string | null;
  brand: string;
  discountPercentage: number | null;
}

export interface ProductsResponse {
  products?: ProductApi[];
  total?: number;
  skip?: number;
  limit?: number;
}

export interface ProductPage {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface AuthUser {
  email: string;
  name: string;
}

export interface DemoUser extends AuthUser {
  password: string;
}
