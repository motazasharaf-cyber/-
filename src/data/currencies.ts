import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    nameAr: 'دولار أمريكي',
    symbol: '$',
    rate: 1.0,
    flag: '🇺🇸',
  },
  SAR: {
    code: 'SAR',
    nameAr: 'ريال سعودي',
    symbol: 'ر.س',
    rate: 3.75,
    flag: '🇸🇦',
  },
  EGP: {
    code: 'EGP',
    nameAr: 'جنيه مصري',
    symbol: 'ج.م',
    rate: 49.20,
    flag: '🇪🇬',
  },
  AED: {
    code: 'AED',
    nameAr: 'درهم إماراتي',
    symbol: 'د.إ',
    rate: 3.67,
    flag: '🇦🇪',
  },
  JOD: {
    code: 'JOD',
    nameAr: 'دينار أردني',
    symbol: 'د.أ',
    rate: 0.71,
    flag: '🇯🇴',
  },
};

export function formatPrice(amountInUSD: number, currency: CurrencyConfig): string {
  const converted = amountInUSD * currency.rate;
  if (currency.code === 'JOD') {
    return `${converted.toFixed(2)} ${currency.symbol}`;
  }
  if (currency.code === 'USD') {
    return `$${converted.toFixed(converted % 1 === 0 ? 0 : 2)}`;
  }
  return `${Math.round(converted).toLocaleString()} ${currency.symbol}`;
}

export function formatNumber(amountInUSD: number, currency: CurrencyConfig): number {
  return +(amountInUSD * currency.rate).toFixed(2);
}
