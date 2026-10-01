import React from 'react';
import { ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem, CurrencyConfig } from '../types';
import { formatPrice } from '../data/currencies';

interface FloatingQuickCartProps {
  cart: CartItem[];
  currency: CurrencyConfig;
  onOpenCart: () => void;
  onScrollToCheckout: () => void;
}

export const FloatingQuickCart: React.FC<FloatingQuickCartProps> = ({
  cart,
  currency,
  onOpenCart,
  onScrollToCheckout,
}) => {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.discountPrice * item.quantity,
    0
  );

  return (
    <aside aria-label="السلة السريعة العائمة" className="fixed bottom-6 left-6 z-40 flex items-center gap-2 print:hidden">
      {/* Expanded Quick Cart Pill */}
      <button
        onClick={onOpenCart}
        aria-label="فتح سلة التسوق"
        className="group flex items-center gap-3 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white pl-4 pr-3.5 py-3 rounded-2xl shadow-2xl shadow-red-950/60 border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md"
      >
        {/* Animated Icon Container */}
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>

          {/* Badge Counter with Ping on items */}
          {totalCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 text-xs font-black rounded-full h-5 w-5 flex items-center justify-center shadow-md animate-bounce">
              {totalCount}
            </span>
          )}
        </div>

        {/* Text Details */}
        <div className="text-right">
          <span className="text-[11px] text-amber-200 block font-bold leading-tight">
            سلة Temo السريعة
          </span>
          <span className="text-sm font-black font-mono text-white tabular-nums">
            {totalCount > 0 ? formatPrice(totalAmount, currency) : 'السلة فارغة'}
          </span>
        </div>

        {/* Action arrow / checkout hint */}
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-white mr-1 group-hover:bg-white/25 transition-colors">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
        </div>
      </button>
    </aside>
  );
};
