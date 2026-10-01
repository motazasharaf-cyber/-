import React from 'react';
import { ShieldCheck, ArrowDown, Clock, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';
import { useCountdownTimer } from '../hooks/useCountdownTimer';

interface HeroSectionProps {
  onScrollToCheckout: () => void;
  onScrollToCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToCheckout,
  onScrollToCatalog,
}) => {
  const timer = useCountdownTimer();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-12 lg:py-20 border-b border-slate-800">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Right Column: Persuasion, Clock, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 via-rose-500/20 to-amber-500/20 border border-red-500/30 px-3.5 py-1.5 rounded-full text-red-300 text-xs sm:text-sm font-bold">
              <span className="flex h-2 w-2 rounded-full bg-red-400 animate-ping" />
              <span>🎯 عرضك الشخصي المباشر - ينتهي خلال 4 ساعات</span>
            </div>

            {/* Main Headline H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight text-balance">
              تسوق أكثر <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-red-500">100 منتج</span> طلباً لعام 2026 بخصم حتى <span className="underline decoration-amber-400 decoration-wavy">70%</span> عند الدفع أونلاين!
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              استفد من خصومات السداد الإلكتروني المباشر عبر الفيزا، المحافظ الرقمية، أو التحويل البنكي وحافظ على نسبة التوفير الأعلى مع ضمان استرداد الأموال خلال 14 يوماً.
            </p>

            {/* Interactive 4-Hour Countdown Clock Widget */}
            <div className="bg-slate-800/80 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl shadow-red-950/20 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
                  <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                  عداد الخصم الشخصي الخاص بك (ينتهي بعد 4 ساعات من دخولك الصفحة):
                </span>
                <span className="text-xs bg-red-500/20 text-red-300 px-2.5 py-0.5 rounded-full font-bold border border-red-500/30">
                  مؤقت فردي نشط
                </span>
              </div>

              {/* Digits Display */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 my-2 text-center">
                <div className="bg-slate-950/90 border border-slate-700 rounded-xl p-3 sm:p-4 shadow-inner">
                  <span className="block text-3xl sm:text-5xl font-black font-mono text-amber-400 tabular-nums">
                    {timer.hours}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-bold mt-1 block">ساعات</span>
                </div>
                <div className="bg-slate-950/90 border border-slate-700 rounded-xl p-3 sm:p-4 shadow-inner">
                  <span className="block text-3xl sm:text-5xl font-black font-mono text-amber-400 tabular-nums">
                    {timer.minutes}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-bold mt-1 block">دقيقة</span>
                </div>
                <div className="bg-slate-950/90 border border-slate-700 rounded-xl p-3 sm:p-4 shadow-inner">
                  <span className="block text-3xl sm:text-5xl font-black font-mono text-amber-400 tabular-nums">
                    {timer.seconds}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 font-bold mt-1 block">ثانية</span>
                </div>
              </div>

              {/* Warning note */}
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-amber-200/90 font-medium">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>⚠️ بمجرد انتهاء المؤقت، تعود الأسعار لنسبتها الأصلية بدون خصم أونلاين.</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onScrollToCheckout}
                className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-base px-6 py-4 rounded-xl shadow-lg shadow-amber-400/20 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-slate-900" />
                <span>احصل على خصم الـ 4 ساعات وادفع أونلاين الآن</span>
              </button>

              <button
                onClick={onScrollToCatalog}
                className="flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-base px-6 py-4 rounded-xl border border-slate-700 transition-all hover:border-slate-600 cursor-pointer"
              >
                <span>تصفح كتالوج الـ 100 منتج بالأسعار المخفضة</span>
                <ArrowDown className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Quick Proof Trust Line */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                شحن مجاني وتأمين شامل
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                فاتورة رقمية على الواتساب
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ضمان استرداد 14 يوماً
              </span>
            </div>

          </div>

          {/* Left Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800/50 group">
              <img
                src="/src/assets/images/hero_temo_showcase_1790839049983.jpg"
                alt="كتالوج متجر تيمو لأفضل 100 منتج 2026"
                className="w-full h-[380px] sm:h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Floating Highlight Badges */}
              <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-white" />
                خصم يتجدد فردياً (4 ساعات)
              </div>

              <div className="absolute bottom-4 right-4 left-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/80">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="font-bold text-white">الدفعة الحصرية لعام 2026</span>
                  <span className="text-emerald-400 font-bold">19,200+ طلب ناجح</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  كافة المنتجات معتمدة وتخضع لفحص الجودة قبل الشحن مع ضمان استرجاع مالي فوري.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
