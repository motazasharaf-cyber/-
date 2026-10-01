import React from 'react';
import { ShoppingBag, ShieldCheck, Heart, Package } from 'lucide-react';
import { CurrencyConfig } from '../types';

interface HeaderProps {
  currentCurrency: CurrencyConfig;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (id: string) => void;
  favoritesCount?: number;
  onOpenFavorites?: () => void;
  onOpenTrackOrder?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onScrollToSection,
  favoritesCount = 0,
  onOpenFavorites,
  onOpenTrackOrder,
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-[41px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text wordmark in display face */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-right group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
              T
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Temo Store
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">2026</span>
              </span>
              <span className="text-[11px] block text-slate-400 font-medium">متجر تيمو للدفع الإلكتروني</span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-slate-300">
          <button
            onClick={() => onScrollToSection('catalog-section')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            كتالوج الـ 100 منتج
          </button>
          <button
            onClick={() => onScrollToSection('categories-section')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            أقسام المتجر (10 فئات)
          </button>
          <button
            onClick={() => onScrollToSection('bundles-section')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            العروض المزدوجة 🎁
          </button>
          <button
            onClick={() => onScrollToSection('reviews-section')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            تقييمات العملاء
          </button>
          {onOpenTrackOrder && (
            <button
              onClick={onOpenTrackOrder}
              className="hover:text-amber-400 text-amber-400/90 flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>تتبع طلبك</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Actions (Favorites, Track, Cart, Express Buy) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Track Order Icon Button (Mobile & Desktop) */}
          {onOpenTrackOrder && (
            <button
              onClick={onOpenTrackOrder}
              title="تتبع مسار شحنتك"
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-colors cursor-pointer"
            >
              <Package className="w-4 h-4" />
            </button>
          )}

          {/* My Favorites (المفضلة) Heart Button */}
          {onOpenFavorites && (
            <button
              onClick={onOpenFavorites}
              title="قائمة المفضلة الخاصة بي"
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-xl border border-slate-700 transition-colors cursor-pointer relative group"
            >
              <Heart
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                }`}
              />
              <span className="text-xs font-bold hidden sm:inline">المفضلة</span>
              {favoritesCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black rounded-full h-5 min-w-5 px-1 flex items-center justify-center font-mono animate-fade-in shadow-sm">
                  {favoritesCount}
                </span>
              )}
            </button>
          )}

          {/* Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="حقيبة التسوق"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-2 rounded-xl border border-slate-700 transition-colors cursor-pointer relative"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold hidden sm:inline">السلة</span>
            {cartCount > 0 && (
              <span className="bg-red-600 text-white text-[11px] font-black rounded-full h-5 min-w-5 px-1 flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* Quick Buy CTA */}
          <button
            onClick={() => onScrollToSection('checkout-section')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-slate-900" />
            <span>استمارة الشراء</span>
          </button>
        </div>

      </div>
    </header>
  );
};
