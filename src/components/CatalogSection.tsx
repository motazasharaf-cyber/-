import React, { useState } from 'react';
import { Sparkles, Grid, LayoutList } from 'lucide-react';
import { Product, Category, CurrencyConfig } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface CatalogSectionProps {
  products: Product[];
  selectedCategoryId: number | 'all';
  searchQuery: string;
  currency: CurrencyConfig;
  cartProductIds: number[];
  compareProductIds: number[];
  wishlistProductIds?: number[];
  recommendedProductIds?: number[];
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  onSelectCategory: (id: number | 'all') => void;
  onToggleCompare: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedCategoryId,
  searchQuery,
  currency,
  cartProductIds,
  compareProductIds,
  wishlistProductIds = [],
  recommendedProductIds = [],
  onAddToCart,
  onQuickBuy,
  onOpenQuickView,
  onSelectCategory,
  onToggleCompare,
  onToggleFavorite,
}) => {
  const [viewMode, setViewMode] = useState<'grouped' | 'grid'>('grouped');

  // If user searched or filtered a specific category, show plain grid
  const showGrouped = selectedCategoryId === 'all' && searchQuery.trim() === '' && viewMode === 'grouped';

  return (
    <section id="catalog-section" className="py-12 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-slate-800/80 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>كتالوج المنتجات الرسمي لعام 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {selectedCategoryId === 'all'
                ? 'كافة المنتجات الـ 100 بالأسعار ونسب التوفير'
                : CATEGORIES.find((c) => c.id === selectedCategoryId)?.name || 'المنتجات المختارة'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              أسعار مخفضة بنسبة 50% إلى 70% حصرية للسداد أونلاين خلال نافذة الـ 4 ساعات
            </p>
          </div>

          {/* View toggle for 'all' mode */}
          {selectedCategoryId === 'all' && !searchQuery && (
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl self-stretch sm:self-auto justify-center">
              <button
                onClick={() => setViewMode('grouped')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'grouped' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>حسب الأقسام الـ 10</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>عرض شبكي متصل</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800 my-8">
            <p className="text-lg font-bold text-white mb-2">لم نعثر على منتجات مطابقة للبحث!</p>
            <p className="text-sm text-slate-400 mb-4">جرب البحث بكلمات أخرى أو عرض كافة الفئات.</p>
            <button
              onClick={() => onSelectCategory('all')}
              className="bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-black"
            >
              عرض كافة الـ 100 منتج
            </button>
          </div>
        )}

        {/* Mode A: Grouped by the 10 Categories */}
        {showGrouped ? (
          <div className="space-y-16 mt-10">
            {CATEGORIES.map((category: Category) => {
              const categoryProducts = products.filter((p) => p.categoryId === category.id);
              if (categoryProducts.length === 0) return null;

              return (
                <div key={category.id} className="scroll-mt-40" id={`cat-${category.id}`}>
                  
                  {/* Category Header Banner with Optional Generated Imagery */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 mb-6 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                    
                    {/* Background Banner Image if available */}
                    {category.bannerImage && (
                      <div className="absolute inset-0 z-0 opacity-20">
                        <img
                          src={category.bannerImage}
                          alt={category.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/90 to-slate-900/95" />
                      </div>
                    )}

                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 font-black text-sm flex items-center justify-center border border-amber-400/30">
                          {category.id}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {category.name}
                        </h3>
                        <span className="bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded shadow">
                          {category.discountRate}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
                        {category.description}
                      </p>
                    </div>

                    <div className="relative z-10 shrink-0">
                      <button
                        onClick={() => onSelectCategory(category.id)}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        تركيز العرض على هذا القسم ({categoryProducts.length} منتجات) ←
                      </button>
                    </div>
                  </div>

                  {/* Products Grid for this category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {categoryProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        currency={currency}
                        onAddToCart={onAddToCart}
                        onQuickBuy={onQuickBuy}
                        onOpenQuickView={onOpenQuickView}
                        isItemInCart={cartProductIds.includes(product.id)}
                        isCompared={compareProductIds.includes(product.id)}
                        onToggleCompare={onToggleCompare}
                        isFavorite={wishlistProductIds.includes(product.id)}
                        onToggleFavorite={onToggleFavorite}
                        isRecommended={recommendedProductIds.includes(product.id)}
                      />
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Mode B: Continuous Flat Grid (when filtered, searched, or grid mode selected) */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onAddToCart={onAddToCart}
                onQuickBuy={onQuickBuy}
                onOpenQuickView={onOpenQuickView}
                isItemInCart={cartProductIds.includes(product.id)}
                isCompared={compareProductIds.includes(product.id)}
                onToggleCompare={onToggleCompare}
                isFavorite={wishlistProductIds.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                isRecommended={recommendedProductIds.includes(product.id)}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
