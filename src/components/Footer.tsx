import React from 'react';
import { ShieldCheck, Lock, Heart, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-base">
                T
              </div>
              <span className="text-lg font-black text-white">Temo Store | متجر تيمو</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md font-normal">
              منصة التسوق الإلكتروني الأولى لعام 2026 المتخصصة في تقديم أحدث 100 منتج تريند بأعلى نسب توفير (50% - 70%) مع نظام عداد السداد الإلكتروني الفردي وضمان استرجاع مالي كامل 14 يوماً.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>تشفير اتصالات آمن 256-bit SSL | متوافق مع معايير PCI-DSS المصرفية</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm">الضمانات والحماية</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>• ضمان استرداد الأموال خلال 14 يوماً</li>
              <li>• بوليصة التأمين الشامل على الشحنات</li>
              <li>• شهادة السداد الإلكتروني المشفر</li>
              <li>• الفواتير الرقمية المعتمدة فوراً</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-white text-sm">خدمة العملاء والتحقق</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              فريق الدعم الفني متواجد على مدار 24/7 عبر الواتساب لتأكيد الدفع ومتابعة الشحنات.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
                <Phone className="w-3.5 h-3.5" />
                <span>دعم الواتساب الفوري المعتمد</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright and Badges */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>
            جميع الحقوق محفوظة © 2026 - متجر Temo Store للدفع الإلكتروني أونلاين.
          </p>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              سجل تجاري إلكتروني معتمد
            </span>
            <span>·</span>
            <span>سياسة الخصوصية</span>
            <span>·</span>
            <span>شروط الشراء والاسترجاع</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
