import React, { useState } from 'react';
import {
  Smartphone,
  Sparkles,
  Shirt,
  Home,
  Dumbbell,
  Lamp,
  UtensilsCrossed,
  Car,
  Plane,
  HeartHandshake,
  Search,
  SlidersHorizontal,
  Flame,
  Mic,
  MicOff,
  Award,
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryNavProps {
  selectedCategoryId: number | 'all';
  onSelectCategory: (id: number | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalProductsCount: number;
  selectedBrand?: string;
  onSelectBrand?: (brand: string) => void;
}

const FEATURED_BRANDS = [
  'الكل',
  'Apple',
  'Sony',
  'Dyson',
  'Nike',
  'Anker',
  'Philips',
  'KitchenAid',
  'Baseus',
  'IKEA',
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategoryId,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalProductsCount,
  selectedBrand = 'الكل',
  onSelectBrand,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);

  const handleToggleVoiceSearch = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceToast('عذراً، متصفحك لا يدعم التعرف الصوتي المباشر.');
      setTimeout(() => setVoiceToast(null), 3500);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceToast('جاري الاستماع... تحدث باسم المنتج أو الماركة الآن');
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          onSearchChange(transcript);
          setVoiceToast(`تم البحث الصوتي: "${transcript}"`);
          setTimeout(() => setVoiceToast(null), 3000);
        }
        setIsListening(false);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = () => {
        setIsListening(false);
        setVoiceToast('تعذر التقاط الصوت، يرجى المحاولة والتحدث بوضوح.');
        setTimeout(() => setVoiceToast(null), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return Smartphone;
      case 'Sparkles':
        return Sparkles;
      case 'Shirt':
        return Shirt;
      case 'Home':
        return Home;
      case 'Dumbbell':
        return Dumbbell;
      case 'Lamp':
        return Lamp;
      case 'UtensilsCrossed':
        return UtensilsCrossed;
      case 'Car':
        return Car;
      case 'Plane':
        return Plane;
      case 'HeartHandshake':
        return HeartHandshake;
      default:
        return Sparkles;
    }
  };

  return (
    <div id="categories-section" className="py-5 bg-slate-900/95 sticky top-[105px] z-30 border-b border-slate-800 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-3">
        
        {/* Search & Sort Controls Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Live Search Input with Voice Recognition Mic */}
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="ابحث بين 100 منتج أو بالصوت أو الماركة..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-xs sm:text-sm rounded-xl pr-10 pl-16 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            
            {/* Action Buttons inside search bar (Clear + Mic) */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-[11px] text-slate-400 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
                  title="مسح البحث"
                >
                  مسح
                </button>
              )}

              {/* Microphone Voice Search Button */}
              <button
                type="button"
                onClick={handleToggleVoiceSearch}
                title={isListening ? 'إيقاف الاستماع' : 'البحث الصوتي (تحدث الآن)'}
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/50 scale-110'
                    : 'bg-slate-700/80 hover:bg-amber-400 hover:text-slate-950 text-slate-300'
                }`}
              >
                {isListening ? <Mic className="w-4 h-4 animate-bounce" /> : <Mic className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Counts & Sorter */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-slate-400 font-medium">
              المعروض: <strong className="text-amber-400 tabular-nums">{totalProductsCount}</strong> منتج أصلي
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-slate-800 text-white text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="featured">الأكثر طلباً والترشيحات</option>
                <option value="discount-desc">أعلى نسبة خصم وتوفير</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating-desc">الأعلى تقييماً من المشترين</option>
              </select>
            </div>
          </div>

        </div>

        {/* Voice Feedback Toast Bar if active */}
        {voiceToast && (
          <div className="p-2 px-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              {isListening && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
              <span>{voiceToast}</span>
            </div>
            {isListening && (
              <button
                onClick={() => setIsListening(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                إلغاء
              </button>
            )}
          </div>
        )}

        {/* Category Horizontal Scrolling Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          
          {/* All categories button */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
              selectedCategoryId === 'all'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-md shadow-red-600/20'
                : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700/80 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>كافة الأقسام (100 منتج)</span>
          </button>

          {/* 10 Specific Categories */}
          {CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.icon);
            const isSelected = selectedCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-800/70 text-slate-300 border-slate-700/70 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-400'}`} />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-red-500/20 text-red-300'
                }`}>
                  {cat.discountRate}
                </span>
              </button>
            );
          })}

        </div>

        {/* Global Brands Filter Strip */}
        {onSelectBrand && (
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 no-scrollbar text-xs border-t border-slate-800/60">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold shrink-0 text-[11px] pl-1">
              <Award className="w-3 h-3" />
              <span>أبرز الماركات العالمية:</span>
            </div>
            {FEATURED_BRANDS.map((brand) => (
              <button
                key={brand}
                onClick={() => onSelectBrand(brand)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                  selectedBrand === brand
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-700'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
