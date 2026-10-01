import React from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquareQuote } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const testimonials = [
    {
      name: 'عمر الشريف',
      location: 'القاهرة',
      flag: '🇪🇬',
      paymentMethod: 'سداد عبر اتصالات كاش',
      verifiedDate: 'منذ يومين',
      rating: 5,
      review:
        'دفعت عن طريق اتصالات كاش لأستفيد من خصم الـ 4 ساعات، استلمت الفاتورة والرقم المرجعي في الواتساب فوراً، والطلب وصلني خلال 24 ساعة بالضبط والجودة ممتازة جداً!',
    },
    {
      name: 'سارة العبدالله',
      location: 'عمان',
      flag: '🇯🇴',
      paymentMethod: 'تحويل بنكي IBAN بالدينار',
      verifiedDate: 'منذ 3 أيام',
      rating: 5,
      review:
        'حولت على حساب IBAN الدينار مباشرة وأرسلت الإيصال، التعامل ممتاز وسريع والدفع أونلاين وفّر لي أكثر من 60% من السعر الأصلي مقارنة بالسوق المحلي.',
    },
    {
      name: 'فهد الشمري',
      location: 'الرياض',
      flag: '🇸🇦',
      paymentMethod: 'سداد بالفيزا (Visa 3D Secure)',
      verifiedDate: 'أمس',
      rating: 5,
      review:
        'السداد بالفيزا كان آمن وسهل جداً، التغليف فخم وسرعة التوصيل خيالية، متجر Temo هو خياري الأول للتسوق لعام 2026!',
    },
  ];

  return (
    <section id="reviews-section" className="py-14 bg-slate-900 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>معاملات سداد أونلاين موثقة 100%</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            آراء العملاء وتقييمات الثقة في Temo Store ⭐
          </h2>

          {/* Rating Score Banner */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-lg font-black text-white tabular-nums">4.9 / 5</span>
            <span className="text-slate-400 text-xs">
              بناءً على أكثر من <strong className="text-amber-400 tabular-nums">19,200+</strong> معاملة سداد إلكتروني ناجحة
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-850 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 relative flex flex-col justify-between hover:border-amber-400/40 transition-colors shadow-lg"
            >
              <MessageSquareQuote className="w-8 h-8 text-amber-400/20 absolute top-4 left-4" />

              <div>
                {/* Rating stars & payment verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] text-emerald-300 font-bold bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    مشترٍ موثق أونلاين
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-200 leading-relaxed font-normal mb-5">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <span>{t.name}</span>
                    <span>{t.flag}</span>
                  </h4>
                  <span className="text-xs text-slate-400 block font-medium">
                    {t.location}
                  </span>
                </div>

                <div className="text-left">
                  <span className="text-[11px] text-amber-300 font-semibold block">
                    {t.paymentMethod}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {t.verifiedDate}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
