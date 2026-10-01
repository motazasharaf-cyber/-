export type CurrencyCode = 'USD' | 'SAR' | 'EGP' | 'AED' | 'JOD';

export interface CurrencyConfig {
  code: CurrencyCode;
  nameAr: string;
  symbol: string;
  rate: number; // relative to 1 USD
  flag: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  originalPrice: number; // in USD
  discountPrice: number; // in USD
  discountPercent: number;
  savings: number; // in USD
  rating: number;
  reviewsCount: number;
  stockLeft: number;
  image?: string;
  brand?: string;
  featured?: boolean;
  tags?: string[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  discountRate: string;
  bannerImage?: string;
  accentColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  fastTrackDelivery?: boolean;
  fastTrackFee?: number;
  total: number;
  centuryGiftVoucherCode?: string;
  centuryGiftVoucherValue?: number;
  currency: CurrencyConfig;
}
