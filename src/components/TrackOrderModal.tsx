import React, { useState } from 'react';
import {
  Package,
  Search,
  X,
  CheckCircle2,
  Truck,
  Clock,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Phone,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { OrderDetails } from '../types';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrder?: OrderDetails | null;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({
  isOpen,
  onClose,
  recentOrder,
}) => {
  const [searchCode, setSearchCode] = useState(recentOrder?.orderId || '');
  const [trackedOrder, setTrackedOrder] = useState<any>(
    recentOrder
      ? {
          orderId: recentOrder.orderId,
          customerName: recentOrder.customerName,
          city: recentOrder.city,
          address: recentOrder.address,
          statusStep: 3, // In transit
          trackingNumber: `SA-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
          courier: 'أرامكس إكسبريس للشحن السريع (Aramex Priority)',
          estimatedDelivery: 'خلال 24 إلى 48 ساعة كحد أقصى',
          lastUpdate: 'وصلت الشحنة إلى مركز التوزيع الإقليمي وجاري تجهيز التوصيل للعنوان',
        }
      : null
  );
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const query = searchCode.trim().toUpperCase();

    if (!query) {
      setErrorMsg('الرجاء إدخال رقم الطلب أو رقم الشحنة للبحث.');
      return;
    }

    // If query matches recent order or any valid pattern
    setTrackedOrder({
      orderId: query.startsWith('TEMO') ? query : `TEMO-2026-${query}`,
      customerName: recentOrder?.customerName || 'العميل المميز',
      city: recentOrder?.city || 'الرياض / القاهرة',
      address: recentOrder?.address || 'العنوان المسجل في الفاتورة الرسمية',
      statusStep: 3, // In Transit
      trackingNumber: `SA-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courier: 'أرامكس / سمسا للشحن الجوي السريع',
      estimatedDelivery: 'خلال 24 إلى 48 ساعة فقط',
      lastUpdate: 'الشحنة قيد النقل السريع - مؤمنة بالكامل 100% مع ضمان الاستبدال',
    });
  };

  const handleUseDemo = () => {
    const demoId = `TEMO-2026-894120`;
    setSearchCode(demoId);
    setTrackedOrder({
      orderId: demoId,
      customerName: 'محمد أحمد الشريف',
      city: 'الرياض - حي الياسمين',
      address: 'شارع أنس بن مالك، مبنى 14',
      statusStep: 3,
      trackingNumber: 'SA-EXP-98241088',
      courier: 'أرامكس إكسبريس (Aramex Priority 24H)',
      estimatedDelivery: 'غداً قبل الساعة 4:00 مساءً',
      lastUpdate: 'خرجت الشحنة من مستودعات Temo وجاري التوصيل لباب المنزل',
    });
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in print:hidden">
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-right">
        
        {/* Header */}
        <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">تتبع حالة شحنتك المباشرة</h3>
              <p className="text-xs text-slate-400">تتبع مسار شحنتك خطوة بخطوة مع شركاء الشحن المعتمدين</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Search Box */}
          <form onSubmit={handleTrackSubmit} className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">
              ادخل رقم الطلب (مثال: TEMO-2026-XXXXXX):
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="رقم الطلب أو الهاتف..."
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-full bg-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm rounded-xl pr-10 pl-3 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 font-mono uppercase"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-md"
              >
                تتبع الآن
              </button>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}

            {!trackedOrder && (
              <div className="pt-2 flex items-center gap-2">
                <span className="text-xs text-slate-400">لا تملك رقم طلب حالي؟</span>
                <button
                  type="button"
                  onClick={handleUseDemo}
                  className="text-xs text-amber-400 hover:underline font-bold cursor-pointer"
                >
                  اضغط هنا لتجربة تتبع شحنة حية تجريبية
                </button>
              </div>
            )}
          </form>

          {/* Tracking Details & 4-Stage Visual Timeline */}
          {trackedOrder && (
            <div className="space-y-6 pt-2 border-t border-slate-800">
              
              {/* Order Info Card */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">رقم الطلب المعتمد:</span>
                  <strong className="text-amber-400 font-mono text-sm block">{trackedOrder.orderId}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">رقم بوليصة الشحن (AWB):</span>
                  <strong className="text-white font-mono text-sm block">{trackedOrder.trackingNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">شركة الشحن والتوصيل:</span>
                  <strong className="text-slate-200 block">{trackedOrder.courier}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">الموعد التقديري للوصول:</span>
                  <strong className="text-emerald-400 block font-bold">{trackedOrder.estimatedDelivery}</strong>
                </div>
              </div>

              {/* 4-Step Interactive Visual Timeline */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 mb-4">مسار شحنتك المباشر:</h4>
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute top-5 right-6 left-6 h-1 bg-slate-800 -z-0">
                    <div className="h-full bg-gradient-to-l from-emerald-500 via-amber-400 to-amber-500 w-[75%]" />
                  </div>

                  {/* 4 Stages Grid */}
                  <div className="grid grid-cols-4 gap-2 text-center relative z-10">
                    
                    {/* Stage 1 */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-2">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-white leading-tight">تأكيد الطلب والسداد</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">مكتمل أونلاين</span>
                    </div>

                    {/* Stage 2 */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-2">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-white leading-tight">التجهيز وضبط الجودة</span>
                      <span className="text-[9px] text-slate-400 mt-0.5">تم الفحص 100%</span>
                    </div>

                    {/* Stage 3 - Active */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/50 mb-2 animate-bounce">
                        <Truck className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-black text-amber-400 leading-tight">الشحن السريع</span>
                      <span className="text-[9px] text-amber-300 font-bold mt-0.5">في الطريق للعنوان</span>
                    </div>

                    {/* Stage 4 */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center mb-2 border border-slate-700">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-400 leading-tight">التسليم باليد</span>
                      <span className="text-[9px] text-slate-500 mt-0.5">الخطوة القادمة</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Status Update Banner */}
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>آخر تحديث:</strong> {trackedOrder.lastUpdate}
                </p>
              </div>

              {/* Support CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `مرحباً خدمة عملاء Temo Store، أرغب بالاستفسار عن شحنتي رقم: ${trackedOrder.orderId}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>تواصل مع مندوب الشحن عبر الواتساب</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  إغلاق
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
