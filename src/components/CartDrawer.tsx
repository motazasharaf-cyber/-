import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ShoppingBag, ArrowLeft, History, Sparkles } from 'lucide-react';
import { CartItem, CurrencyConfig, Product } from '../types';
import { formatPrice } from '../data/currencies';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: CurrencyConfig;
  onUpdateQuantity: (productId: number, newQty: number) => void;
  onRemoveItem: (productId: number) => void;
  onScrollToCheckout: () => void;
  recentlyViewedProducts?: Product[];
  onAddToCart?: (product: Product) => void;
  onOpenQuickView?: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onScrollToCheckout,
  recentlyViewedProducts = [],
  onAddToCart,
  onOpenQuickView,
}) => {
  if (!isOpen) return null;

  const totalOriginal = cart.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalDiscounted = cart.reduce(
    (sum, item) => sum + item.product.discountPrice * item.quantity,
    0
  );
  const totalSavings = totalOriginal - totalDiscounted;

  const handleProceed = () => {
    onClose();
    onScrollToCheckout();
  };

  // Filter out items already in the cart from recently viewed
  const cartIds = cart.map((i) => i.product.id);
  const uncartedRecentlyViewed = recentlyViewedProducts.filter((p) => !cartIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden print:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-r border-slate-800 text-right flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-white text-base">سلة مشتريات Temo Store</h3>
              <span className="text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded-full font-mono">
                {cart.length}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="إغلاق السلة"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="font-bold text-white text-sm">سلتك فارغة حتى الآن!</p>
                <p className="text-xs text-slate-400">تصفح الـ 100 منتج واستفد من خصم الـ 4 ساعات لسداد أونلاين.</p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
                >
                  تصفح المنتجات المخفضة
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="bg-slate-800/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3 group"
                  >
                    {/* Thumbnail */}
                    {product.image && (
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/60 shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-1.5 py-0.2 rounded font-mono">
                          {product.brand || 'Temo Elite'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">#{product.id}</span>
                      </div>
                      <h4 className="font-bold text-xs text-white truncate">{product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-black font-mono text-amber-400">
                          {formatPrice(product.discountPrice, currency)}
                        </span>
                        <span className="text-[10px] text-slate-500 line-through font-mono">
                          {formatPrice(product.originalPrice, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                        title="إنقاص الكمية"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-white px-1">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                        title="زيادة الكمية"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Recently Viewed (شاهدتها مؤخراً) Section */}
            {uncartedRecentlyViewed.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-amber-400" />
                    <span>منتجات شاهدتها مؤخراً:</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">حفظ تلقائي</span>
                </div>

                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
                  {uncartedRecentlyViewed.map((item) => (
                    <div
                      key={item.id}
                      className="w-32 shrink-0 bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-2 flex flex-col justify-between"
                    >
                      <div
                        onClick={() => onOpenQuickView?.(item)}
                        className="cursor-pointer group"
                      >
                        <div className="h-20 w-full rounded-lg overflow-hidden bg-slate-900 mb-1.5 border border-slate-800">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="text-[9px] font-bold text-amber-400 block truncate">
                          {item.brand || 'Temo'}
                        </span>
                        <h5 className="text-[11px] font-bold text-white truncate leading-tight">
                          {item.name}
                        </h5>
                        <span className="text-xs font-black font-mono text-amber-400 mt-1 block">
                          {formatPrice(item.discountPrice, currency)}
                        </span>
                      </div>

                      {onAddToCart && (
                        <button
                          onClick={() => onAddToCart(item)}
                          className="mt-2 w-full py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-[10px] font-bold border border-slate-700 hover:border-amber-400/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                          <span>أضف للسلة</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Summary & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>السعر الأصلي:</span>
                  <span className="font-mono">{formatPrice(totalOriginal, currency)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>وفرت بخصم الـ 4 ساعات:</span>
                  <span className="font-mono">- {formatPrice(totalSavings, currency)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>الشحن والتأمين:</span>
                  <span className="text-emerald-400 font-bold">مجاني 100% 🚚</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-white">
                  <span className="font-bold text-sm">المجموع المطلوب:</span>
                  <span className="text-xl font-black font-mono text-amber-400">
                    {formatPrice(totalDiscounted, currency)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceed}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-900" />
                <span>المتابعة إلى استمارة السداد أونلاين</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
