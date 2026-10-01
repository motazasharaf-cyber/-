import React from 'react';
import { Scale, X, ArrowLeft, Trash2 } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';

interface FloatingCompareDockProps {
  products: Product[];
  currency: CurrencyConfig;
  onOpenCompare: () => void;
  onRemoveProduct: (id: number) => void;
  onClearAll: () => void;
}

export const FloatingCompareDock: React.FC<FloatingCompareDockProps> = ({
  products,
  currency,
  onOpenCompare,
  onRemoveProduct,
  onClearAll,
}) => {
  if (products.length === 0) return null;

  return (
    <aside aria-label="شريط مقارنة المنتجات" className="fixed bottom-6 right-6 z-40 max-w-md w-[calc(100vw-3rem)] sm:w-auto animate-slide-up print:hidden">
      <div className="bg-slate-900/95 border-2 border-amber-500/60 rounded-2xl p-3 shadow-2xl shadow-black/80 backdrop-blur-md flex flex-col sm:flex-row items-center gap-3">
        
        {/* Info & Counter */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">قائمة المقارنة</span>
              <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full">
                {products.length}/3
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block">
              {products.length === 1 ? 'اختر منتجاً آخر للمقارنة' : 'جاهز للمقارنة جنباً لجنب'}
            </span>
          </div>
        </div>

        {/* Selected Product Thumbnails */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {products.map((p) => (
            <div
              key={p.id}
              className="relative group w-10 h-10 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shrink-0"
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-slate-400">
                  #{p.id}
                </div>
              )}
              {/* Quick remove cross */}
              <button
                onClick={() => onRemoveProduct(p.id)}
                className="absolute inset-0 bg-red-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="إزالة"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onClearAll}
            title="مسح الكل"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCompare}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>قارن الآن</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
