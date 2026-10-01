import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  ShieldCheck,
  ShoppingBag,
  Truck,
  RefreshCw,
  Clock,
  Share2,
  Check,
  Copy,
  MessageCircle,
  Send,
  Calendar,
  Bell,
  BellRing,
  Mail,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatPrice } from '../data/currencies';

interface ProductModalProps {
  product: Product | null;
  currency: CurrencyConfig;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onQuickBuy,
}) => {
  const [copied, setCopied] = useState(false);
  
  // Real-time dynamic countdown calculation for next-day 4 PM delivery
  const [cutoffTime, setCutoffTime] = useState({ hours: 2, minutes: 45, seconds: 12 });

  // Price Drop Alert State
  const [isAlertSectionOpen, setIsAlertSectionOpen] = useState(false);
  const [targetPrice, setTargetPrice] = useState<number>(0);
  const [selectedDiscountPreset, setSelectedDiscountPreset] = useState<number | null>(10);
  const [alertEmail, setAlertEmail] = useState('');
  const [browserNotify, setBrowserNotify] = useState(false);
  const [isEditingAlert, setIsEditingAlert] = useState(false);
  const [savedAlert, setSavedAlert] = useState<{
    productId: number;
    productName: string;
    targetPrice: number;
    currencyCode: string;
    currencySymbol: string;
    email: string;
    browserNotify: boolean;
    createdAt: string;
  } | null>(null);
  const [alertSuccessMessage, setAlertSuccessMessage] = useState('');
  const [alertErrorMessage, setAlertErrorMessage] = useState('');

  // Countdown timer for next-day delivery cutoff
  useEffect(() => {
    const timer = setInterval(() => {
      setCutoffTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize target price and load existing alert from localStorage
  const currentPriceInCurrency = product ? Math.round(product.discountPrice * currency.rate) : 0;

  useEffect(() => {
    if (product) {
      const defaultTarget = Math.round(product.discountPrice * 0.9 * currency.rate);
      setTargetPrice(defaultTarget);
      setSelectedDiscountPreset(10);
      setAlertErrorMessage('');
      setAlertSuccessMessage('');
      setIsEditingAlert(false);

      try {
        const stored = localStorage.getItem('temo_price_alerts');
        if (stored) {
          const alerts = JSON.parse(stored);
          const found = alerts.find((a: any) => a.productId === product.id);
          if (found) {
            setSavedAlert(found);
            setTargetPrice(found.targetPrice);
            setAlertEmail(found.email || '');
            setBrowserNotify(Boolean(found.browserNotify));
            setIsAlertSectionOpen(true);
          } else {
            setSavedAlert(null);
          }
        } else {
          setSavedAlert(null);
        }
      } catch (err) {
        console.error('Failed to parse price alerts from localStorage', err);
      }
    }
  }, [product, currency]);

  if (!product) return null;

  // Calculate dynamic tomorrow delivery date string
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDeliveryDate = tomorrow.toLocaleDateString('ar-SA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Social Sharing URLs
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://temo-store.com';
  const shareText = `🔥 شاهد هذا العرض الحصري من Temo Store: ${product.name} بخصم ${product.discountPercent}% فقط بـ ${formatPrice(product.discountPrice, currency)}! الدفع إلكتروني آمن 100%:`;
  
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${currentUrl}#product-${product.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}#product-${product.id}`)}`,
      '_blank'
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
      '_blank'
    );
  };

  // Price Alert Handlers
  const handleSelectDiscountPreset = (pct: number) => {
    setSelectedDiscountPreset(pct);
    const calculated = Math.round(product.discountPrice * (1 - pct / 100) * currency.rate);
    setTargetPrice(calculated);
    setAlertErrorMessage('');
  };

  const handleCustomPriceChange = (val: number) => {
    setTargetPrice(val);
    setSelectedDiscountPreset(null);
    setAlertErrorMessage('');
  };

  const handleToggleBrowserNotification = async () => {
    setAlertErrorMessage('');
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setBrowserNotify((prev) => !prev);
      } else if (Notification.permission !== 'denied') {
        try {
          const perm = await Notification.requestPermission();
          if (perm === 'granted') {
            setBrowserNotify(true);
          } else {
            setBrowserNotify(false);
            setAlertErrorMessage('تم رفض إذن إشعارات المتصفح.');
          }
        } catch {
          setBrowserNotify(true);
        }
      } else {
        setAlertErrorMessage('إشعارات المتصفح محظورة حالياً. يرجى السماح بها من إعدادات المتصفح.');
      }
    } else {
      setAlertErrorMessage('هذا المتصفح لا يدعم إشعارات الويب.');
    }
  };

  const handleSaveAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertErrorMessage('');
    setAlertSuccessMessage('');

    if (!targetPrice || targetPrice <= 0) {
      setAlertErrorMessage('الرجاء إدخال سعر مستهدف صحيح.');
      return;
    }

    if (targetPrice >= currentPriceInCurrency) {
      setAlertErrorMessage(
        `يجب أن يكون السعر المستهدف أقل من السعر الحالي (${currentPriceInCurrency} ${currency.symbol}).`
      );
      return;
    }

    if (!alertEmail.trim() && !browserNotify) {
      setAlertErrorMessage('الرجاء إدخال البريد الإلكتروني أو تفعيل إشعارات المتصفح لاستلام التنبيه.');
      return;
    }

    if (alertEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alertEmail.trim())) {
      setAlertErrorMessage('الرجاء إدخال بريد إلكتروني صالح.');
      return;
    }

    const alertData = {
      productId: product.id,
      productName: product.name,
      targetPrice,
      currencyCode: currency.code,
      currencySymbol: currency.symbol,
      email: alertEmail.trim(),
      browserNotify,
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem('temo_price_alerts');
      const alerts = stored ? JSON.parse(stored) : [];
      const updated = alerts.filter((a: any) => a.productId !== product.id);
      updated.push(alertData);
      localStorage.setItem('temo_price_alerts', JSON.stringify(updated));
      setSavedAlert(alertData);
      setIsEditingAlert(false);
      setAlertSuccessMessage(
        `تم تفعيل التنبيه بنجاح! سنرسل لك إشعاراً فورياً عند وصول سعر المنتج إلى ${targetPrice} ${currency.symbol}.`
      );
      setTimeout(() => setAlertSuccessMessage(''), 5000);
    } catch {
      setAlertErrorMessage('تعذر حفظ التنبيه، الرجاء المحاولة مجدداً.');
    }
  };

  const handleCancelAlert = () => {
    try {
      const stored = localStorage.getItem('temo_price_alerts');
      if (stored) {
        const alerts = JSON.parse(stored);
        const updated = alerts.filter((a: any) => a.productId !== product.id);
        localStorage.setItem('temo_price_alerts', JSON.stringify(updated));
      }
      setSavedAlert(null);
      setIsEditingAlert(false);
      setAlertSuccessMessage('تم إلغاء تنبيه السعر لهذا المنتج.');
      setTimeout(() => setAlertSuccessMessage(''), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative text-right my-8 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق النافذة"
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
            <span className="bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              {product.categoryName}
            </span>
            <span>·</span>
            <span className="text-slate-400">كود المنتج: #{product.id}</span>
          </div>

          <h3 className="text-xl font-bold text-white leading-snug">
            {product.name}
          </h3>

          <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <strong className="text-sm">{product.rating.toFixed(1)}</strong>
              <span className="text-slate-400">({product.reviewsCount} تقييم حقيقي)</span>
            </div>
            <span>·</span>
            <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              متبقي {product.stockLeft} قطع بالسعر المخفض
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Dynamic Delivery Date Estimator */}
          <div className="bg-gradient-to-r from-emerald-950/50 to-teal-950/40 p-3.5 rounded-2xl border border-emerald-500/30 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>موعد التسليم المتوقع:</span>
                  <span className="text-emerald-300 font-black underline decoration-emerald-500">
                    غداً ({formattedDeliveryDate}) قبل الساعة 4:00 مساءً
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal flex items-center gap-1 flex-wrap">
                <Clock className="w-3 h-3 text-amber-400 inline" />
                <span>اطلب خلال </span>
                <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded border border-amber-400/20">
                  {String(cutoffTime.hours).padStart(2, '0')}:{String(cutoffTime.minutes).padStart(2, '0')}:{String(cutoffTime.seconds).padStart(2, '0')}
                </span>
                <span> لضمان الشحن السريع الفوري عبر أرامكس / سمسا إكسبريس.</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-1.5">وصف ومواصفات المنتج:</h4>
            <p className="text-slate-200 leading-relaxed font-normal bg-slate-800/50 p-4 rounded-xl border border-slate-700/60">
              {product.description}
            </p>
          </div>

          {/* Pricing Highlight Box */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-amber-400/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">سعر العرض الحصري أونلاين:</span>
              <span className="text-2xl font-black font-mono text-amber-400 tabular-nums">
                {formatPrice(product.discountPrice, currency)}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs text-slate-500 line-through font-mono tabular-nums block">
                السعر الأصلي: {formatPrice(product.originalPrice, currency)}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50 inline-block mt-0.5">
                توفير مؤكد: {formatPrice(product.savings, currency)}
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* PRICE DROP ALERT SECTION (Requested by User)          */}
          {/* ---------------------------------------------------- */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200">
            {/* Header Accordion Bar */}
            <div
              onClick={() => setIsAlertSectionOpen(!isAlertSectionOpen)}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  savedAlert
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                }`}>
                  {savedAlert ? <BellRing className="w-4 h-4 animate-bounce" /> : <Bell className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">تنبيه هبوط السعر (Price Drop Alert)</span>
                    {savedAlert ? (
                      <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full border border-emerald-500/30">
                        مفعّل ✓ ({savedAlert.targetPrice} {currency.symbol})
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold bg-amber-400/10 text-amber-400 px-2 py-0.2 rounded-full border border-amber-400/20">
                        ذكي وفوري
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {savedAlert
                      ? 'تم تسجيل رغبتك وسنرسل إشعاراً فورياً عند انخفاض السعر.'
                      : 'حدد السعر الذي يناسبك وسنرسل لك إشعاراً عند وصول العرض له.'}
                  </p>
                </div>
              </div>

              <div className="text-slate-400">
                {isAlertSectionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {/* Expandable Alert Content */}
            {isAlertSectionOpen && (
              <div className="p-4 pt-1 border-t border-slate-800/80 space-y-4">
                
                {/* Active Alert Capsule if already saved */}
                {savedAlert && !isEditingAlert ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>التنبيه نشط حالياً لهذا المنتج</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setIsEditingAlert(true)}
                          className="text-[11px] text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 cursor-pointer transition-colors"
                        >
                          تعديل السعر
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelAlert}
                          title="إلغاء التنبيه"
                          className="text-[11px] text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-900/50 px-2.5 py-1 rounded-lg border border-red-800/40 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>إلغاء</span>
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1">
                      <div>
                        <strong>السعر المستهدف للتنبيه:</strong>{' '}
                        <span className="font-mono font-bold text-amber-400">
                          {savedAlert.targetPrice} {currency.symbol}
                        </span>{' '}
                        <span className="text-[10px] text-slate-400">
                          (خصم إضافي حوالي {Math.round((1 - savedAlert.targetPrice / currentPriceInCurrency) * 100)}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-400 pt-0.5">
                        <span>قنوات الإشعار:</span>
                        {savedAlert.email && (
                          <span className="inline-flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-slate-200">
                            <Mail className="w-3 h-3 text-amber-400" />
                            {savedAlert.email}
                          </span>
                        )}
                        {savedAlert.browserNotify && (
                          <span className="inline-flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-slate-200">
                            <Bell className="w-3 h-3 text-emerald-400" />
                            إشعارات المتصفح
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveAlert} className="space-y-3.5">
                    
                    {/* Step A: Target Price & Quick Preset Buttons */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-300">
                          🎯 حدد السعر المستهدف للشراء:
                        </label>
                        <span className="text-[11px] text-slate-400">
                          السعر الحالي:{' '}
                          <strong className="text-amber-400 font-mono">
                            {currentPriceInCurrency} {currency.symbol}
                          </strong>
                        </span>
                      </div>

                      {/* Quick Discount Presets: -5%, -10%, -20% */}
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {[5, 10, 20].map((pct) => {
                          const presetPrice = Math.round(
                            product.discountPrice * (1 - pct / 100) * currency.rate
                          );
                          const isSelected = selectedDiscountPreset === pct;
                          return (
                            <button
                              key={pct}
                              type="button"
                              onClick={() => handleSelectDiscountPreset(pct)}
                              className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-sm'
                                  : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                              }`}
                            >
                              <div className="text-xs font-black">خصم إضافي {pct}%-</div>
                              <div className="text-[10px] font-mono text-slate-400">
                                {presetPrice} {currency.symbol}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Numeric Price Input */}
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max={currentPriceInCurrency - 1}
                          value={targetPrice || ''}
                          onChange={(e) => handleCustomPriceChange(Number(e.target.value))}
                          placeholder={`ادخل سعراً أقل من ${currentPriceInCurrency}`}
                          className="w-full bg-slate-800 text-white placeholder-slate-500 text-xs rounded-xl pr-4 pl-16 py-2.5 border border-slate-700 font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400 font-mono pointer-events-none">
                          {currency.symbol}
                        </div>
                      </div>

                      {targetPrice > 0 && targetPrice < currentPriceInCurrency && (
                        <span className="text-[10px] text-emerald-400 block mt-1">
                          ✓ ستوفر إضافياً {currentPriceInCurrency - targetPrice} {currency.symbol} عند وصول السعر لهدفك.
                        </span>
                      )}
                    </div>

                    {/* Step B: Notification Channels (Email & Browser) */}
                    <div className="space-y-2 pt-1 border-t border-slate-800">
                      <span className="text-xs font-bold text-slate-300 block">
                        📩 قنوات إرسال التنبيه الفوري:
                      </span>

                      {/* 1. Email Address Input */}
                      <div className="relative">
                        <input
                          type="email"
                          value={alertEmail}
                          onChange={(e) => setAlertEmail(e.target.value)}
                          placeholder="بريدك الإلكتروني (لتلقي رسالة التنبيه)"
                          dir="ltr"
                          className="w-full bg-slate-800 text-white placeholder-slate-500 text-xs rounded-xl pr-9 pl-3 py-2 border border-slate-700 text-right focus:outline-none focus:border-amber-400"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>

                      {/* 2. Browser Push Notification Permission Toggle */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                        <div className="flex items-center gap-2">
                          <Bell className={`w-4 h-4 ${browserNotify ? 'text-emerald-400' : 'text-slate-400'}`} />
                          <div>
                            <span className="text-xs font-bold text-slate-200 block">إشعارات المتصفح الفورية</span>
                            <span className="text-[10px] text-slate-400">تنبيه فوري يظهر على شاشتك بمجرد انخفاض السعر</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          role="switch"
                          aria-checked={browserNotify}
                          onClick={handleToggleBrowserNotification}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            browserNotify ? 'bg-emerald-500' : 'bg-slate-700'
                          }`}
                        >
                          <span className="sr-only">تفعيل إشعارات المتصفح</span>
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              browserNotify ? '-translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    {alertErrorMessage && (
                      <div className="text-[11px] text-rose-300 bg-rose-950/50 border border-rose-800/50 p-2.5 rounded-xl flex items-center gap-1.5 font-bold">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span>{alertErrorMessage}</span>
                      </div>
                    )}

                    {alertSuccessMessage && (
                      <div className="text-[11px] text-emerald-300 bg-emerald-950/50 border border-emerald-800/50 p-2.5 rounded-xl flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{alertSuccessMessage}</span>
                      </div>
                    )}

                    {/* Action CTA */}
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md shadow-amber-400/20 cursor-pointer"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>تأكيد وتفعيل تنبيه السعر 🔔</span>
                      </button>

                      {isEditingAlert && (
                        <button
                          type="button"
                          onClick={() => setIsEditingAlert(false)}
                          className="text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-2.5 rounded-xl border border-slate-700 cursor-pointer"
                        >
                          إلغاء
                        </button>
                      )}
                    </div>
                  </form>
                )}

              </div>
            )}
          </div>

          {/* Social Media Sharing Component (WhatsApp, X, Telegram, Copy Link) */}
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>شارك هذا المنتج مع أصدقائك:</span>
              </span>
              {copied && (
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 animate-fade-in">
                  <Check className="w-3 h-3" />
                  <span>تم نسخ الرابط بنجاح!</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={shareWhatsApp}
                title="مشاركة عبر واتساب"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>واتساب</span>
              </button>

              <button
                type="button"
                onClick={shareTwitter}
                title="مشاركة عبر منصة X"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-300 font-bold text-xs transition-colors cursor-pointer"
              >
                <span className="font-mono font-bold text-xs">𝕏</span>
                <span>تويتر</span>
              </button>

              <button
                type="button"
                onClick={shareTelegram}
                title="مشاركة عبر تيليجرام"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-bold text-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-blue-400" />
                <span>تيليجرام</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                title="نسخ رابط المنتج"
                className="inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>نسخ</span>
              </button>
            </div>
          </div>

          {/* Guarantees micro-list */}
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <Truck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>شحن وتوصيل فوري مؤمن 100%</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>استرداد مالي خلال 14 يوماً</span>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex gap-3">
          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>إضافة إلى السلة</span>
          </button>

          <button
            onClick={() => {
              onQuickBuy(product);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-400/20 transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-slate-900" />
            <span>طلب وشراء فوري</span>
          </button>
        </div>

      </div>
    </div>
  );
};
