import React from 'react';
import { Gift, Sparkles, Flame, CheckCircle, ArrowLeft } from 'lucide-react';
import { CurrencyConfig } from '../types';
import { formatPrice } from '../data/currencies';

interface CenturyOfferBannerProps {
  currency: CurrencyConfig;
  onExploreCatalog: () => void;
}

export const CenturyOfferBanner: React.FC<CenturyOfferBannerProps> = ({
  currency,
  onExploreCatalog,
}) => {
  // Example demo values for calculation visualizer
  const sampleSpend = 100;
  const sampleReward = sampleSpend;

  return (
    <section className="relative overflow-hidden my-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Container with fire/gold luxury gradient */}
      <div className="relative rounded-3xl p-6 md:p-10 bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border-2 border-amber-500/50 shadow-2xl shadow-red-950/70 overflow-hidden">
        
        {/* Background glow & decorative orbs */}
        <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Right Column: Hero Pitch & Badge */}
          <div className="lg:col-span-7 text-right">
            
            {/* Top Flaming Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-xs md:text-sm shadow-lg mb-4 animate-pulse">
              <Flame className="w-4 h-4 fill-amber-200 text-amber-200" />
              <span>مفاجأة 2026 الكبرى • عرض القرن الاستثنائي</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              أي عملية شرائية الآن <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400">تحصل على مشتريات بنفس القيمة 100% مجاناً!</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              نقدم لكم أقوى حدث في التجارة الإلكترونية العربية: اشترِ أي منتج أو سلة من أحدث الماركات العالمية (Apple، Sony، Dyson، Nike، Anker، Philips)، وستمنحك منظومة السداد فوراً <span className="text-amber-400 font-bold">قسيمة شراء إضافية مطابقة تماماً لـ 100% من إجمالي طلبك</span> لاستخدامها مجاناً بالكامل!
            </p>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl p-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">
                  قسيمة فورية تظهر مباشرة في فاتورة السداد الرقمية
                </span>
              </div>
              <div className="flex items-center gap-2.5 bg-black/40 border border-white/10 rounded-xl p-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-slate-200">
                  صلاحية كاملة لمدة 12 شهراً على كافة الماركات
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onExploreCatalog}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>تسوق الماركات العالمية واستفد من عرض القرن</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Left Column: Visual Value Match Calculator Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/80 backdrop-blur-md border border-amber-500/40 rounded-2xl p-6 shadow-2xl text-center">
              
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-amber-500/30">
                <Gift className="w-7 h-7" />
              </div>

              <h3 className="text-base font-black text-white mb-2">
                محاكي مضاعفة القيمة الحصري (Match 100%)
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                مثال توضيحي مباشر بحساب عملتك النشطة ({currency.nameAr})
              </p>

              {/* Equivalence Visualizer */}
              <div className="space-y-3">
                
                {/* Spend Box */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-slate-400">قيمة مشترياتك اليوم</span>
                  <span className="text-base font-black font-mono text-white tabular-nums">
                    {formatPrice(sampleSpend, currency)}
                  </span>
                </div>

                {/* Match Indicator */}
                <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-400 py-1">
                  <span>+ هدية مجانية فورية 100% تطابق طلبك</span>
                </div>

                {/* Reward Voucher Box */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-red-600/20 border border-amber-500/60 shadow-inner">
                  <div className="text-right">
                    <span className="text-xs font-black text-amber-300 block">قسيمة شراء إضافية</span>
                    <span className="text-[10px] text-slate-300">تُصدر مجاناً وتُرسل لواتسابك</span>
                  </div>
                  <span className="text-lg font-black font-mono text-amber-400 tabular-nums">
                    {formatPrice(sampleReward, currency)}
                  </span>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-tight">
                * العرض سارٍ على جميع الـ 100 منتج والـ 10 أقسام عند إتمام السداد الإلكتروني المؤكد.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
