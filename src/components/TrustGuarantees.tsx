import React from 'react';
import { Lock, Truck, RefreshCw, FileText } from 'lucide-react';

export const TrustGuarantees: React.FC = () => {
  const guarantees = [
    {
      icon: Lock,
      title: 'دفع أونلاين آمن 100%',
      desc: 'تشفير 256-bit SSL لحماية كامل بياناتك المالية والشخصية بأعلى معايير الأمان المصرفي.',
      badge: 'تشفير بنكي معتمد',
    },
    {
      icon: Truck,
      title: 'شحن سريع ومؤمن',
      desc: 'شحن مباشر وتأمين شامل على طلبك حتى باب منزلك مع كود تتبع لحظي عبر الرسائل.',
      badge: 'تغطية وضمان التوصيل',
    },
    {
      icon: RefreshCw,
      title: 'ضمان استرداد الأموال (14 يوماً)',
      desc: 'استرداد مالي فوري في حال عدم الرضا أو وجود أي عيب مصنعي بكل سلاسة ويسر.',
      badge: 'استرداد بدون تعقيد',
    },
    {
      icon: FileText,
      title: 'فاتورة رقمية فورية',
      desc: 'استلام إيصال الفاتورة المعتمدة عبر الواتساب فوراً مع الرقم المرجعي للطلب وتأكيد الدفع.',
      badge: 'إيصال رسمي فوري',
    },
  ];

  return (
    <section className="py-10 bg-slate-900 border-b border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g, idx) => {
            const Icon = g.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700/70 hover:border-amber-400/50 rounded-xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/5"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-11 h-11 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                      {g.title}
                    </h3>
                    <span className="text-[11px] text-amber-300 font-semibold">
                      {g.badge}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {g.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
