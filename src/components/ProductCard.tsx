import React, { useMemo } from 'react';
import { Star, ShoppingBag, Eye, Zap, ShieldCheck, Scale, Heart } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatPrice } from '../data/currencies';

interface ProductCardProps {
  product: Product;
  currency: CurrencyConfig;
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  isItemInCart: boolean;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (product: Product) => void;
  isRecommended?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onQuickBuy,
  onOpenQuickView,
  isItemInCart,
  isCompared,
  onToggleCompare,
  isFavorite = false,
  onToggleFavorite,
  isRecommended = false,
}) => {
  // Category specific accent gradients for card visual fallback
  const getCategoryGradient = (catId: number) => {
    switch (catId) {
      case 1:
        return 'from-blue-900/60 via-slate-800 to-indigo-950/70';
      case 2:
        return 'from-rose-950/60 via-slate-800 to-pink-950/70';
      case 3:
        return 'from-amber-950/60 via-slate-800 to-orange-950/70';
      case 4:
        return 'from-teal-950/60 via-slate-800 to-emerald-950/70';
      case 5:
        return 'from-red-950/60 via-slate-800 to-rose-950/70';
      case 6:
        return 'from-purple-950/60 via-slate-800 to-violet-950/70';
      case 7:
        return 'from-orange-950/60 via-slate-800 to-amber-950/70';
      case 8:
        return 'from-cyan-950/60 via-slate-800 to-blue-950/70';
      case 9:
        return 'from-sky-950/60 via-slate-800 to-indigo-950/70';
      case 10:
        return 'from-emerald-950/60 via-slate-800 to-teal-950/70';
      default:
        return 'from-slate-800 via-slate-800 to-slate-900';
    }
  };

  // Live Stock Urgency Indicator based on product ID
  const urgencyBadge = useMemo(() => {
    const mod = product.id % 4;
    if (mod === 0) {
      return {
        text: 'متبقي 3 قطع فقط بالسعر المخفض!',
        style: 'text-rose-400 bg-rose-500/10 border-rose-500/25',
        dot: 'bg-rose-500',
      };
    }
    if (mod === 1) {
      return {
        text: 'ينفد بسرعة فائقة - طلبات متتالية!',
        style: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
        dot: 'bg-amber-400',
      };
    }
    if (mod === 2) {
      return {
        text: 'مطلوب بشدة - متبقي قطعتان فقط!',
        style: 'text-red-400 bg-red-500/10 border-red-500/25',
        dot: 'bg-red-500',
      };
    }
    return {
      text: 'عرض محدود - تم حجز 85% من المخزون!',
      style: 'text-orange-400 bg-orange-500/10 border-orange-500/25',
      dot: 'bg-orange-400',
    };
  }, [product.id]);

  return (
    <div className="group bg-slate-900/90 border border-slate-800 hover:border-amber-400 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:scale-[1.025] hover:shadow-2xl hover:shadow-amber-500/15">
      
      {/* Visual Area with Scale and Glow on Hover */}
      <div className={`relative h-48 w-full bg-gradient-to-br ${getCategoryGradient(product.categoryId)} flex items-center justify-center p-3 border-b border-slate-800/80 overflow-hidden`}>
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Wishlist Heart Button */}
        {onToggleFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product);
            }}
            aria-label={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            className={`absolute top-3 left-3 z-30 w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md backdrop-blur-sm ${
              isFavorite
                ? 'bg-rose-600 text-white scale-110 shadow-rose-600/40 ring-2 ring-rose-400'
                : 'bg-black/60 hover:bg-black/80 text-slate-300 hover:text-rose-400 border border-white/10'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform ${isFavorite ? 'fill-white scale-110' : ''}`} />
          </button>
        )}

        {/* Product Photographic Asset */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
          <div className="absolute bottom-2 right-2 text-right z-10">
            <span className="font-mono text-xs font-black text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
              #{product.id}
            </span>
          </div>
        </div>

        {/* Top Right Badges */}
        <div className="absolute top-3 right-3 z-20 flex flex-col items-start gap-1">
          <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
            <Zap className="w-3 h-3 fill-white" />
            خصم {product.discountPercent}%
          </span>
          {product.featured && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
              الأعلى طلباً
            </span>
          )}
        </div>

        {/* Quick View Trigger on Hover */}
        <button
          onClick={() => onOpenQuickView(product)}
          aria-label="نظرة سريعة للمنتج"
          className="absolute bottom-3 left-3 z-20 bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white p-2 rounded-lg backdrop-blur-sm border border-slate-700 transition-colors shadow-md opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Savings Ribbon (positioned next to heart button) */}
        <div className="absolute top-3 left-13 z-20 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
          وفر {formatPrice(product.savings, currency)}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Rating and Stock info */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal">({product.reviewsCount})</span>
            </div>

            <span className="text-[11px] text-rose-400/90 font-semibold bg-rose-500/10 px-2 py-0.5 rounded">
              متبقي {product.stockLeft} قطع
            </span>
          </div>

          {/* Brand & Compare Row with Recommended Badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-black font-mono text-amber-400 bg-amber-400/10 border border-amber-400/25 px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {product.brand || 'Temo Elite'}
              </span>

              {isRecommended && (
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs animate-fade-in">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>موصى به لك</span>
                </span>
              )}
            </div>

            {onToggleCompare && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(product);
                }}
                className={`text-[10px] font-bold flex items-center gap-1 px-2 py-0.5 rounded-md transition-all cursor-pointer border ${
                  isCompared
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-black shadow-sm'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                }`}
              >
                <Scale className="w-3 h-3" />
                <span>{isCompared ? 'تمت المقارنة ✓' : 'مقارنة'}</span>
              </button>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-white text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.6rem]">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Live Stock Urgency Indicator */}
          <div className={`mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${urgencyBadge.style}`}>
            <span className={`w-2 h-2 rounded-full ${urgencyBadge.dot} animate-ping shrink-0`} />
            <span className="truncate">{urgencyBadge.text}</span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">السعر بعد خصم أونلاين:</span>
              <span className="text-lg sm:text-xl font-black font-mono text-amber-400 tabular-nums">
                {formatPrice(product.discountPrice, currency)}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs text-slate-500 line-through font-mono tabular-nums block">
                {formatPrice(product.originalPrice, currency)}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 inline-block">
                توفير {formatPrice(product.savings, currency)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isItemInCart
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isItemInCart ? 'في السلة ✓' : 'أضف للسلة'}</span>
            </button>

            <button
              onClick={() => onQuickBuy(product)}
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
              <span>شراء فوري</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
