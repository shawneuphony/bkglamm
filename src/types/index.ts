// ── Payload / CMS types ──────────────────────────────────────

export interface Media {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  filename: string;
  mimeType: string;
}

// ── Product types ────────────────────────────────────────────

export type ProductStatus = "draft" | "published" | "archived";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: Media;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;          // stored in cents / smallest currency unit
  compareAtPrice?: number;
  images: Media[];
  category: Category | string;
  tags?: string[];
  stock: number;
  status: ProductStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Cart types ───────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;          // sum in cents
}

// ── User / Auth types ────────────────────────────────────────

export type UserRole = "admin" | "customer";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: string;
}

// ── API response wrapper ─────────────────────────────────────

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

// ── Utility types ────────────────────────────────────────────

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;