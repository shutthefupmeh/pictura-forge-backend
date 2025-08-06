import { Request } from 'express';
import { Document } from 'mongoose';

// User Types
export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'seller';
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  addresses: IAddress[];
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateAuthToken(): string;
}

export interface IAddress {
  _id?: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Product Types
export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  subcategory?: string;
  brand: string;
  sku: string;
  images: string[];
  inventory: {
    quantity: number;
    lowStockThreshold: number;
    trackInventory: boolean;
  };
  attributes: {
    size?: string[];
    color?: string[];
    material?: string;
    weight?: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    slug: string;
  };
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  rating: {
    average: number;
    count: number;
  };
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface IOrder extends Document {
  _id: string;
  orderNumber: string;
  user: string;
  items: IOrderItem[];
  totalAmount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  paymentDetails: {
    transactionId?: string;
    paymentIntentId?: string;
    refundId?: string;
  };
  shippingAddress: IAddress;
  billingAddress: IAddress;
  tracking: {
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: Date;
    actualDelivery?: Date;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes?: {
    size?: string;
    color?: string;
  };
}

// Cart Types
export interface ICart extends Document {
  _id: string;
  user: string;
  items: ICartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  product: string;
  quantity: number;
  price: number;
  attributes?: {
    size?: string;
    color?: string;
  };
}

// Category Types
export interface ICategory extends Document {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  image?: string;
  parent?: string;
  children: string[];
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

// Review Types
export interface IReview extends Document {
  _id: string;
  user: string;
  product: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  reported: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Request Types
export interface AuthRequest extends Request {
  user?: IUser;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface ProductQuery extends PaginationQuery {
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  search?: string;
  featured?: string;
  status?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Email Types
export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

// Payment Types
export interface PaymentIntentData {
  amount: number;
  currency: string;
  orderId: string;
  userId: string;
  metadata?: Record<string, any>;
}