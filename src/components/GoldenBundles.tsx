import React, { useState } from 'react';
import { Gift, Truck, Tag, Check, Copy, Sparkles, ArrowRight } from 'lucide-react';

interface GoldenBundlesProps {
  onApplyCoupon: (code: string) => void;
  onScrollToCheckout: () => void;
}

export const GoldenBundles: React.FC<GoldenBundlesProps> = ({
  onApplyCoupon,
  onScrollToCheckout,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    onApplyCoupon('ONLINE5');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="bundles-section" className="py-14 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Sparkles className="w-4 h-4" />
            <span>عروض السداد الإلكتروني المزدوجة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            باقات Temo الذهبية عند الدفع أونلاين 🎁
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            ضاعف توفيرك واستمتع بمزايا حصرية إضافية تمنح للمشترين عبر الدفع الإلكتروني المباشر فقط
          </p>
        </div>

        {/* 3 Golden Bundles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bundle 1 */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 rounded-2xl p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
              الباقة الأولى
            </span>
            <h3 className="text-lg font-black text-white mt-2 mb-2">
              اشترِ منتجين واحصل على الثالث (مجاناً 100%)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal mb-5">
              عند اختيارك لأي منتجين من كتالوج الـ 100 منتج وسداد قيمتهما أونلاين، يُضاف المنتج الثالث ذو السعر الأقل مجاناً كهدية شكر من Temo Store.
            </p>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-amber-300 font-semibold flex items-center gap-1.5">
              <span>✓ يُطبق تلقائياً في السلة عند السداد الإلكتروني</span>
            </div>
          </div>

          {/* Bundle 2 */}
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-amber-500/5">
            <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded">
              الأكثر شعبية
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
              الباقة الثانية
            </span>
            <h3 className="text-lg font-black text-white mt-2 mb-2">
              شحن سريع ومؤمن مجاناً 100%
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal mb-5">
              توفير رسوم الشحن والتأمين بالكامل عند السداد عبر البطاقة البنكية أو المحفظة الإلكترونية. توصيل آمن حتى باب المنزل مع بوليصة تأمين تغطي 100% من الشحنة.
            </p>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
              <span>✓ شحن مجاني مفعل لجميع الطلبات المسددة أونلاين</span>
            </div>
          </div>

          {/* Bundle 3 */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-400/50 rounded-2xl p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Tag className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              الباقة الثالثة
            </span>
            <h3 className="text-lg font-black text-white mt-2 mb-2">
              خصم إضافي 5% فوراً بكود ONLINE5
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
              احصل على خصم فوري إضافي 5% يُحسم مباشرة من إجمالي الفاتورة عند الدفع بالفيزا أو المحافظ الرقمية أو التحويل البنكي.
            </p>
            
            {/* Copy Button Box */}
            <div className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-700">
              <span className="font-mono font-black text-amber-400 text-sm tracking-widest px-2">
                ONLINE5
              </span>
              <button
                onClick={handleCopyCode}
                className="mr-auto flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'تم النسخ والتفعيل!' : 'نسخ وتطبيق الكود'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Interactive Bottom Bar */}
        <div className="mt-8 text-center">
          <button
            onClick={onScrollToCheckout}
            className="inline-flex items-center gap-2 text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <span>استفد من باقات الدفع أونلاين وأتمم طلبك الآن</span>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

      </div>
    </section>
  );
};
