import React from 'react';
import { Heart, X, ShoppingBag, Trash2, ArrowLeft, Sparkles, Tag } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatPrice } from '../data/currencies';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: CurrencyConfig;
  onAddToCart: (product: Product) => void;
  onRemoveFavorite: (productId: number) => void;
  onClearWishlist: () => void;
  onOpenQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onAddToCart,
  onRemoveFavorite,
  onClearWishlist,
  onOpenQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden print:hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-white flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-1.5">
                  <span>منتجاتي المفضلة</span>
                  <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30 font-mono font-bold">
                    {wishlistProducts.length}
                  </span>
                </h3>
                <span className="text-[11px] text-slate-400">محفوظة بحسابك وجاهزة للشراء الفوري</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="إغلاق المفضلة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-800/80 mx-auto flex items-center justify-center text-slate-600 border border-slate-700">
                  <Heart className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">قائمة المفضلة فارغة حالياً</h4>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                    انقر على رمز القلب ❤️ بجانب أي منتج ترغب بحفظه لشرائه لاحقاً والاستفادة من خصم الـ 4 ساعات.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>تصفح الـ 100 منتج الآن</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-2xl flex gap-3 transition-colors relative group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => onOpenQuickView(product)}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0 cursor-pointer relative"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] font-mono text-amber-300 px-1 py-0.2 rounded">
                        #{product.id}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 font-mono">
                            {product.brand || 'Temo Elite'}
                          </span>
                          <button
                            onClick={() => onRemoveFavorite(product.id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                            title="إزالة من المفضلة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <h4
                          onClick={() => onOpenQuickView(product)}
                          className="font-bold text-white text-xs line-clamp-1 cursor-pointer hover:text-amber-400 transition-colors"
                        >
                          {product.name}
                        </h4>
                      </div>

                      {/* Pricing and Add to cart */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                        <div>
                          <span className="text-sm font-black font-mono text-amber-400 tabular-nums block">
                            {formatPrice(product.discountPrice, currency)}
                          </span>
                          <span className="text-[10px] text-slate-500 line-through font-mono">
                            {formatPrice(product.originalPrice, currency)}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            onAddToCart(product);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow transition-all cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>إضافة للسلة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3">
              <button
                onClick={onClearWishlist}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer py-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>إفراغ المفضلة</span>
              </button>

              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <span>متابعة التسوق</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
