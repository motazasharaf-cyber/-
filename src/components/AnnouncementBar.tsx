import React from 'react';
import { ShieldCheck, ShoppingBag, Clock } from 'lucide-react';
import { useCountdownTimer } from '../hooks/useCountdownTimer';
import { CurrencyConfig } from '../types';
import { CURRENCIES } from '../data/currencies';

interface AnnouncementBarProps {
  currentCurrency: CurrencyConfig;
  onCurrencyChange: (currency: CurrencyConfig) => void;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToCheckout: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  onScrollToCheckout,
}) => {
  const timer = useCountdownTimer();

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-700 via-rose-600 to-amber-600 text-white shadow-md border-b border-red-500/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
        
        {/* Urgent announcement text with live timer */}
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-200"></span>
          </span>

          <p className="truncate">
            <span className="font-bold">⚡ خصم Temo الحصري:</span>{' '}
            <span className="hidden md:inline">خصم خاص يتجدد لك خصيصاً بنسبة 50% إلى 70% عند السداد الإلكتروني!</span>
            <span className="font-bold text-amber-200 mr-1.5 inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 inline" /> ينتهي عرضك الشخصي بعد:
            </span>
          </p>

          {/* Individual Timer Box */}
          <div className="inline-flex items-center gap-1 font-mono font-bold bg-black/35 px-2 py-0.5 rounded border border-amber-300/40 text-amber-200 text-xs sm:text-sm shrink-0 tabular-nums shadow-inner">
            <span>{timer.hours}</span>
            <span className="animate-pulse">:</span>
            <span>{timer.minutes}</span>
            <span className="animate-pulse">:</span>
            <span>{timer.seconds}</span>
          </div>
        </div>

        {/* Action Controls & Currency Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Pay CTA for desktop */}
          <button
            onClick={onScrollToCheckout}
            className="hidden lg:flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1 rounded text-xs transition-colors shadow-sm cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
            <span>ادفع أونلاين ووفر 70%</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative inline-block">
            <select
              aria-label="اختر العملة"
              value={currentCurrency.code}
              onChange={(e) => onCurrencyChange(CURRENCIES[e.target.value as keyof typeof CURRENCIES])}
              className="bg-black/30 hover:bg-black/45 text-white text-xs font-semibold px-2 py-1 rounded border border-white/20 focus:outline-none focus:ring-1 focus:ring-amber-300 cursor-pointer"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                  {c.flag} {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            aria-label="عرض سلة المشتريات"
            className="relative flex items-center gap-1.5 bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded text-white text-xs font-bold transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">السلة</span>
            {cartCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[11px] font-black rounded-full h-4.5 w-4.5 flex items-center justify-center -mr-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
