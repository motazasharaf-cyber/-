import React, { useEffect } from 'react';
import {
  CheckCircle2,
  Printer,
  X,
  ShieldCheck,
  QrCode,
  Truck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { OrderDetails } from '../types';
import { formatPrice } from '../data/currencies';
import { fireDualCannonConfetti } from '../utils/confetti';

interface DigitalInvoiceModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const DigitalInvoiceModal: React.FC<DigitalInvoiceModalProps> = ({
  order,
  onClose,
}) => {
  useEffect(() => {
    if (order) {
      // Fire celebratory dual cannon confetti explosion!
      fireDualCannonConfetti();
    }
  }, [order]);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `مرحباً Temo Store 🛒\nأرغب في تأكيد واستلام الفاتورة الرقمية لطلبي:\nرقم الطلب: ${order.orderId}\nالاسم: ${order.customerName}\nالهاتف: ${order.phone}\nالإجمالي المدفوع: ${formatPrice(order.total, order.currency)}\nطريقة الدفع: ${order.paymentMethod}\nشكراً لكم!`
    );
    window.open(`https://api.whatsapp.com/send?phone=${order.phone.replace(/[^0-9]/g, '')}&text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative text-right my-8 max-h-[95vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق الفاتورة"
          className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700 print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-6 border-b border-slate-800 relative">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-black text-white">فاتورة سداد إلكتروني معتمدة</h3>
                <span className="text-xs text-emerald-400 font-bold">تم السداد أونلاين بنجاح 🟢 (مدفوع)</span>
              </div>
            </div>

            <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-slate-700 text-left">
              <span className="text-[10px] text-slate-400 block font-mono">رقم الطلب المرجعي:</span>
              <span className="text-sm font-black font-mono text-amber-400">{order.orderId}</span>
            </div>
          </div>

          <div className="text-xs text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
            <div>
              <span className="text-[10px] text-slate-400 block">التاريخ والوقت:</span>
              <span className="font-semibold text-white">{order.date}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">طريقة الدفع:</span>
              <span className="font-semibold text-white truncate block">{order.paymentMethod}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">حالة الشحن:</span>
              <span className="font-semibold text-amber-400 flex items-center gap-1">
                <Truck className="w-3 h-3" /> جاري التجهيز والشحن
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">ضمان الفاتورة:</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> استرداد 14 يوماً
              </span>
            </div>
          </div>
        </div>

        {/* Invoice Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          
          {/* Customer Details Box */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block">اسم المستلم:</span>
              <strong className="text-white text-sm">{order.customerName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">رقم الهاتف / الواتساب:</span>
              <strong className="text-white text-sm font-mono" dir="ltr">{order.phone}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">الدولة والمدينة:</span>
              <strong className="text-white">{order.country} - {order.city}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">عنوان التوصيل:</span>
              <strong className="text-white">{order.address}</strong>
            </div>
          </div>

          {/* Itemized Order Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 mb-2">تفاصيل المنتجات المشمولة بالعرض:</h4>
            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3">المنتج</th>
                    <th className="p-3 text-center">الكمية</th>
                    <th className="p-3 text-center">سعر العرض</th>
                    <th className="p-3 text-left">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="p-3">
                        <span className="font-bold text-white block">{item.product.name}</span>
                        <span className="text-[10px] text-amber-400">{item.product.categoryName}</span>
                      </td>
                      <td className="p-3 text-center font-mono font-bold">{item.quantity}</td>
                      <td className="p-3 text-center font-mono">{formatPrice(item.product.discountPrice, order.currency)}</td>
                      <td className="p-3 text-left font-mono font-bold text-amber-400">
                        {formatPrice(item.product.discountPrice * item.quantity, order.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Financial Totals */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>السعر الإجمالي الأصلي:</span>
              <span className="font-mono">{formatPrice(order.subtotal, order.currency)}</span>
            </div>
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>إجمالي الخصم المطبق (خصم 4 ساعات + كود ONLINE5):</span>
              <span className="font-mono">- {formatPrice(order.discount, order.currency)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>رسوم الشحن والتأمين:</span>
              <span className="text-emerald-400 font-bold">مجاناً (0.00)</span>
            </div>
            {order.fastTrackDelivery && (
              <div className="flex justify-between text-amber-400 font-bold bg-amber-400/10 px-2 py-1 rounded-md border border-amber-400/20">
                <span>رسوم الشحن فائق السرعة VIP (غداً قبل 10:00 ص):</span>
                <span className="font-mono">+ {formatPrice(order.fastTrackFee || 4, order.currency)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-white font-black text-base">
              <span>المبلغ المدفوع بالكامل:</span>
              <span className="text-xl font-mono text-amber-400">{formatPrice(order.total, order.currency)}</span>
            </div>
          </div>

          {/* Century Offer 100% Value Match Voucher Certificate */}
          {order.centuryGiftVoucherCode && (
            <div className="bg-gradient-to-r from-amber-500/20 via-red-600/20 to-amber-500/20 border-2 border-amber-500/60 rounded-2xl p-4 shadow-xl text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>شهادة هدية عرض القرن (مشتريات مطابقة 100% مجاناً)</span>
              </div>
              <p className="text-white font-bold text-sm">
                تم اعتماد قسيمة شراء إضافية فورية بحسابك بقيمة كامل طلبك:{' '}
                <span className="text-amber-400 font-mono font-black">{formatPrice(order.total, order.currency)}</span>
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="bg-slate-900 text-amber-300 font-mono font-black text-sm px-3.5 py-1.5 rounded-xl border border-amber-400/40 select-all tracking-wider">
                  {order.centuryGiftVoucherCode}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(order.centuryGiftVoucherCode!);
                    alert('تم نسخ كود قسيمة عرض القرن بنجاح!');
                  }}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 cursor-pointer transition-colors"
                >
                  نسخ الكود
                </button>
              </div>
              <p className="text-[10px] text-slate-400">
                صالحة لمدة 12 شهراً على كافة الماركات العالمية (Apple، Sony، Nike، Dyson، Anker).
              </p>
            </div>
          )}

          {/* QR Verification simulator & Trust notes */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg text-slate-950">
                <QrCode className="w-8 h-8" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">باركود التحقق الرقمي المشفر</span>
                <span className="text-[11px] text-slate-400">صالح لدى مندوب الشحن وبوابات الجمارك</span>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-700">
              SSL-256-VALID
            </span>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            onClick={handleSendWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-md"
          >
            <span>📱 إرسال الفاتورة وتتبع الشحنة عبر الواتساب</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة / حفظ PDF</span>
          </button>

          <button
            type="button"
            onClick={fireDualCannonConfetti}
            title="إطلاق احتفال الكونفيتي مجدداً"
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 transition-colors cursor-pointer shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>احتفال 🎉</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center justify-center py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer"
          >
            <span>متابعة التسوق</span>
          </button>
        </div>

      </div>
    </div>
  );
};
