import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck } from 'lucide-react';

export const PaymentFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'كيف أضمن أمان بيانات بطاقتي الائتمانية ومعلوماتي البنكية؟',
      a: 'تتم كافة عمليات الدفع عبر بوابات مشفرة بأعلى بروتوكولات الأمان العالمية 256-bit SSL المعتمدة بنكياً، مع خاصية التحقق الثلاثي 3D Secure (رمز OTP عبر رسالة نصية من بنكك). متجر Temo لا يقوم بتخزين أي أرقام سرية أو بيانات بطاقات على خوادمه مطلقاً.',
    },
    {
      q: 'ماذا يحدث بمجرد انتهاء عداد الـ 4 ساعات الشخصي؟',
      a: 'مؤقت الـ 4 ساعات مرتبط بجلستك لحجز الخصومات الاستثنائية (50% إلى 70%). بمجرد انتهاء المؤقت، تعود أسعار الكتالوج إلى قيمتها الأصلية الكاملة بدون خصم السداد الإلكتروني. نوصي بإتمام السداد قبل نفاد الوقت لتثبيت التوفير.',
    },
    {
      q: 'كيف أستلم الفاتورة الرقمية ورقم تتبع الشحنة؟',
      a: 'فور إتمام السداد بنجاح، تظهر لك الفاتورة الرسمية المعتمدة برقم الطلب المرجعي ورمز الباركود، وتصلك نسخة كاملة فورية عبر تطبيق الواتساب والبريد الإلكتروني المسجل، مصحوبة برابط التتبع الحي لمندوب الشحن.',
    },
    {
      q: 'ما هي آلية وضمانات استرداد الأموال خلال 14 يوماً؟',
      a: 'نلتزم بسياسة استرجاع مالي عادلة ومباشرة 100%. إذا استلمت منتجاً غير مطابق للمواصفات أو به أي عيب مصنعي، يحق لك طلب استرداد المبلغ بالكامل خلال 14 يوماً دون أي رسوم إضافية، ويُعاد المبلغ إلى نفس وسيلة الدفع المستخدمة.',
    },
    {
      q: 'هل السداد عبر المحافظ الإلكترونية متاح في مصر والخليج؟',
      a: 'نعم بالتأكيد! ندعم المحافظ الرقمية المحلية الشائعة: في مصر (فودافون كاش، اتصالات كاش، أورنج كاش، إنستاباي InstaPay)، وفي السعودية ودول الخليج (STC Pay، مدى Mada، Apple Pay)، بالإضافة للتحويل البنكي المباشر برقم الآيبان IBAN.',
    },
    {
      q: 'هل الشحن مجاني ومؤمن عليه بالفعل؟',
      a: 'نعم، عملاء السداد أونلاين يتمتعون بشحن مجاني سريع 100% مع تغطية تأمينية كاملة ضد التلف أو الفقدان أثناء النقل حتى باب بيتك.',
    },
  ];

  return (
    <section id="faq-section" className="py-14 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>الأسئلة الشائعة وتفنيد الاعتراضات</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            الأسئلة الشائعة حول السداد الإلكتروني والضمانات ❓
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            كل ما تحتاج معرفته عن أمان الدفع، تفعيل خصومات الـ 4 ساعات، والشحن والتوصيل
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal border-t border-slate-800/60 bg-slate-950/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
