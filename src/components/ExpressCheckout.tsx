import React, { useState } from 'react';
import {
  CreditCard,
  Wallet,
  Building2,
  Lock,
  ShieldCheck,
  Tag,
  Plus,
  Minus,
  Trash2,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Truck,
  Check,
  MapPin,
  Edit3,
  Calendar,
  Zap,
} from 'lucide-react';
import { CartItem, CurrencyConfig, OrderDetails } from '../types';
import { formatPrice } from '../data/currencies';
import { useCountdownTimer } from '../hooks/useCountdownTimer';
import { fireDualCannonConfetti } from '../utils/confetti';

interface ExpressCheckoutProps {
  cart: CartItem[];
  currency: CurrencyConfig;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
  onUpdateQuantity: (productId: number, newQty: number) => void;
  onRemoveItem: (productId: number) => void;
  onOrderComplete: (order: OrderDetails) => void;
  onScrollToCatalog: () => void;
}

export const ExpressCheckout: React.FC<ExpressCheckoutProps> = ({
  cart,
  currency,
  appliedCoupon,
  onApplyCoupon,
  onUpdateQuantity,
  onRemoveItem,
  onOrderComplete,
  onScrollToCatalog,
}) => {
  const timer = useCountdownTimer();

  // Wizard Stepper State: 1 = Shipping, 2 = Payment, 3 = Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields State
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('المملكة العربية السعودية');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'iban'>('card');
  const [couponInput, setCouponInput] = useState(appliedCoupon || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Payment details simulation state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Fast-Track Delivery State (Requested nominal fee: 15 SAR / ~4 USD)
  const [isFastTrack, setIsFastTrack] = useState(false);
  const FAST_TRACK_FEE_USD = 4; // Converted cleanly via currency.rate (4 * 3.75 = 15 SAR)
  const currentFastTrackFee = isFastTrack ? FAST_TRACK_FEE_USD : 0;

  // Dynamic Delivery Date Calculations
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toLocaleDateString('ar-SA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const standardDeliveryDate = new Date();
  standardDeliveryDate.setDate(standardDeliveryDate.getDate() + 3);
  const formattedStandardDate = standardDeliveryDate.toLocaleDateString('ar-SA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Calculations
  const subtotalOriginal = cart.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const subtotalDiscounted = cart.reduce(
    (sum, item) => sum + item.product.discountPrice * item.quantity,
    0
  );
  const generalSavings = subtotalOriginal - subtotalDiscounted;

  // Coupon discount (5% if ONLINE5)
  const isOnline5 = appliedCoupon.toUpperCase() === 'ONLINE5';
  const couponDiscountAmount = isOnline5 ? subtotalDiscounted * 0.05 : 0;
  const shippingCost = 0; // Free standard shipping
  const finalTotal = Math.max(0, subtotalDiscounted - couponDiscountAmount + shippingCost + currentFastTrackFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    onApplyCoupon(couponInput.trim().toUpperCase());
  };

  // Step 1 Validation -> Proceed to Step 2
  const handleProceedToPayment = () => {
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('سلة التسوق فارغة! الرجاء إضافة منتج واحد على الأقل للاستفادة من الخصم.');
      return;
    }

    if (!customerName.trim() || customerName.trim().length < 3) {
      setErrorMessage('الرجاء إدخال الاسم الكامل الثلاثي للعميل.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      setErrorMessage('الرجاء إدخال رقم جوال أو واتساب صحيح لاستلام الفاتورة وتتبع الشحنة.');
      return;
    }

    if (!city.trim()) {
      setErrorMessage('الرجاء كتابة المدينة أو المحافظة.');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage('الرجاء كتابة عنوان التوصيل بالتفصيل (اسم الشارع، رقم المبنى، المعلم القريب).');
      return;
    }

    setCurrentStep(2);
    // Smooth scroll back to form top for seamless experience
    const formEl = document.getElementById('checkout-wizard-container');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Step 2 Submission -> Process Payment & Step 3
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('سلة التسوق فارغة!');
      return;
    }

    setIsProcessing(true);

    // Simulate 256-bit SSL encrypted online payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3);

      const paymentMethodLabels: Record<string, string> = {
        card: 'بطاقة ائتمانية / مدى (Visa / Mastercard 3D Secure)',
        wallet: 'محفظة إلكترونية (Vodafone / STC Pay / Apple Pay)',
        iban: 'تحويل بنكي فوري معتمد (IBAN Direct Transfer)',
      };

      const orderPayload: OrderDetails = {
        orderId: `TEMO-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('ar-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'عميل Temo Store الموثق',
        country,
        city: city.trim(),
        address: address.trim(),
        paymentMethod: paymentMethodLabels[paymentMethod],
        items: [...cart],
        subtotal: subtotalOriginal,
        discount: generalSavings + couponDiscountAmount,
        couponCode: isOnline5 ? 'ONLINE5' : undefined,
        shipping: 0,
        fastTrackDelivery: isFastTrack,
        fastTrackFee: currentFastTrackFee,
        total: finalTotal,
        centuryGiftVoucherCode: `CENTURY-100-MATCH-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        centuryGiftVoucherValue: finalTotal,
        currency,
      };

      // Trigger celebratory dual cannon confetti explosion!
      fireDualCannonConfetti();
      onOrderComplete(orderPayload);
    }, 1200);
  };

  return (
    <section id="checkout-section" className="py-14 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            <Lock className="w-3.5 h-3.5" />
            <span>بوابة سداد مشفرة 256-Bit SSL</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            استمارة الشراء والسداد الإلكتروني السريع 🛒
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            أكمل خطوات الشراء في 3 خطوات بسيطة لتثبيت خصم الـ 4 ساعات واستلام فاتورتك الرقمية فوراً
          </p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* CHECKOUT PROGRESS INDICATOR STEPPER (Requested by User) */}
        {/* ---------------------------------------------------- */}
        <div className="max-w-3xl mx-auto mb-10 px-4">
          <div className="relative flex items-center justify-between">
            
            {/* Animated Connecting Progress Line Track */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1.5 bg-slate-800 rounded-full z-0 overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-amber-400 via-amber-300 to-emerald-400 transition-all duration-500 ease-out"
                style={{
                  width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
                }}
              />
            </div>

            {/* Step 1: Shipping */}
            <div className="relative z-10 flex flex-col items-center group">
              <button
                type="button"
                onClick={() => {
                  if (currentStep > 1) setCurrentStep(1);
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-lg cursor-pointer ${
                  currentStep > 1
                    ? 'bg-emerald-500 text-white shadow-emerald-500/25 hover:scale-105'
                    : currentStep === 1
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-110 shadow-amber-400/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {currentStep > 1 ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <div className="flex items-center gap-0.5">
                    <span>1</span>
                  </div>
                )}
              </button>
              <div className="mt-2 text-center">
                <span
                  className={`text-xs font-bold block ${
                    currentStep >= 1 ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  بيانات الشحن
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:block">العنوان ورقم التوصيل</span>
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="relative z-10 flex flex-col items-center group">
              <button
                type="button"
                onClick={() => {
                  if (customerName && phone && city && address) {
                    setCurrentStep(2);
                  }
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-lg ${
                  currentStep > 2
                    ? 'bg-emerald-500 text-white shadow-emerald-500/25 cursor-pointer hover:scale-105'
                    : currentStep === 2
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-110 shadow-amber-400/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed'
                }`}
              >
                {currentStep > 2 ? (
                  <Check className="w-5 h-5 stroke-[3]" />
                ) : (
                  <div className="flex items-center gap-0.5">
                    <span>2</span>
                  </div>
                )}
              </button>
              <div className="mt-2 text-center">
                <span
                  className={`text-xs font-bold block ${
                    currentStep >= 2 ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  طريقة السداد
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:block">مدى، فيزا، محفظة رقمية</span>
              </div>
            </div>

            {/* Step 3: Confirmation */}
            <div className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-lg ${
                  currentStep === 3
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-400/30 scale-110 shadow-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {currentStep === 3 ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <div className="flex items-center gap-0.5">
                    <span>3</span>
                  </div>
                )}
              </div>
              <div className="mt-2 text-center">
                <span
                  className={`text-xs font-bold block ${
                    currentStep === 3 ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  تأكيد واستلام
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:block">الفاتورة وضمان الـ 100%</span>
              </div>
            </div>

          </div>
        </div>

        {/* Checkout Wizard Grid */}
        <div id="checkout-wizard-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column: Multi-Step Interactive Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Urgency countdown bar inside form */}
            <div className="bg-red-950/40 border border-red-500/30 p-3.5 rounded-xl flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-red-300 font-bold">
                <Clock className="w-4 h-4 text-red-400" />
                خصم السداد أونلاين محجوز لك ومتبقي:
              </span>
              <span className="font-mono font-bold text-amber-400 text-sm tabular-nums bg-black/40 px-2 py-0.5 rounded border border-amber-400/20">
                {timer.hours}:{timer.minutes}:{timer.seconds}
              </span>
            </div>

            {errorMessage && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 text-xs p-3.5 rounded-xl font-bold animate-shake">
                {errorMessage}
              </div>
            )}

            {/* STEP 1: SHIPPING & CONTACT INFO */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <Truck className="w-5 h-5 text-amber-400" />
                    <span>المرحلة 1: بيانات الشحن والتوصيل للعنوان</span>
                  </h3>
                  <span className="text-xs text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20 font-bold">
                    خطوة 1 من 3
                  </span>
                </div>

                {/* Customer Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    👤 الاسم الكامل (الثلاثي): <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمد علي"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-800/80 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      📱 رقم الجوال أو الواتساب: <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="+966 5X XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-800/80 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors text-right"
                    />
                    <span className="text-[10px] text-amber-400/90 block mt-1">
                      * سنرسل الفاتورة ورابط تتبع الشحنة على هذا الرقم
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      ✉️ البريد الإلكتروني (اختياري):
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-800/80 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors text-right"
                    />
                  </div>
                </div>

                {/* Country & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      🌍 الدولة:
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-slate-800/80 text-white text-sm rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="المملكة العربية السعودية">🇸🇦 المملكة العربية السعودية</option>
                      <option value="جمهورية مصر العربية">🇪🇬 جمهورية مصر العربية</option>
                      <option value="المملكة الأردنية الهاشمية">🇯🇴 المملكة الأردنية الهاشمية</option>
                      <option value="الإمارات العربية المتحدة">🇦🇪 الإمارات العربية المتحدة</option>
                      <option value="دولة الكويت">🇰🇼 دولة الكويت</option>
                      <option value="سلطنة عمان">🇴🇲 سلطنة عمان</option>
                      <option value="دولة قطر">🇶🇦 دولة قطر</option>
                      <option value="دولة أخرى">🌐 دول أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      🏙️ المدينة / المنطقة: <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: الرياض / القاهرة / عمان"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-800/80 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    📍 عنوان التوصيل بالتفصيل: <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="اسم الشارع، رقم المبنى، المعلم القريب..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-800/80 text-white placeholder-slate-500 text-sm rounded-xl px-4 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors resize-none"
                  />
                </div>

                {/* Fast-Track Delivery Toggle Switch (Requested by User) */}
                <div
                  className={`p-4 rounded-2xl border transition-all duration-300 ${
                    isFastTrack
                      ? 'bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/60 border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                      : 'bg-slate-800/40 border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isFastTrack
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/30'
                            : 'bg-slate-800 text-amber-400 border-slate-700'
                        }`}
                      >
                        <Zap className={`w-5 h-5 ${isFastTrack ? 'fill-emerald-400 text-emerald-400' : 'text-amber-400'}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            خدمة الشحن فائق السرعة (Fast-Track Priority)
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              isFastTrack
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                            }`}
                          >
                            + {formatPrice(FAST_TRACK_FEE_USD, currency)} فقط
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                          معالجة فورية وتجهيز VIP ذو أولوية وشحن جوي مباشر مع أرامكس وسمسا إكسبريس.
                        </p>
                      </div>
                    </div>

                    {/* Accessible iOS-style Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isFastTrack}
                      onClick={() => setIsFastTrack((prev) => !prev)}
                      className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                        isFastTrack ? 'bg-emerald-500 shadow-md shadow-emerald-500/40' : 'bg-slate-700'
                      }`}
                    >
                      <span className="sr-only">تفعيل الشحن فائق السرعة</span>
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${
                          isFastTrack ? '-translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Real-time Dynamic Delivery Date Estimator Display */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                    <div className="flex items-center gap-2 flex-wrap text-slate-200">
                      <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-slate-300">موعد التسليم المتوقع:</span>
                      {isFastTrack ? (
                        <span className="font-black text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-lg border border-emerald-500/30 animate-pulse flex items-center gap-1">
                          <span>⚡ غداً صباحاً قبل الساعة 10:00 ص</span>
                          <span className="text-white">({formattedTomorrow})</span>
                        </span>
                      ) : (
                        <span className="font-bold text-slate-300">
                          خلال 2 إلى 3 أيام عمل ({formattedStandardDate}) - مجاناً
                        </span>
                      )}
                    </div>
                    {isFastTrack && (
                      <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>أولوية تسليم مؤكدة</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Wizard Next Button */}
                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <span>المتابعة إلى وسيلة السداد (خطوة 2 من 3)</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT METHOD & SUBMISSION */}
            {currentStep === 2 && (
              <form onSubmit={handleSubmitOrder} className="space-y-5 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-400" />
                    <span>المرحلة 2: اختيار وسيلة السداد الآمنة</span>
                  </h3>
                  <span className="text-xs text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-lg border border-amber-400/20 font-bold">
                    خطوة 2 من 3
                  </span>
                </div>

                {/* Shipping Details Quick Review Capsule */}
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-300 truncate">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      <strong>شحن إلى:</strong> {customerName} · {city}، {country} ({phone})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 shrink-0 text-[11px] bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>تعديل</span>
                  </button>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    💳 اختر طريقة السداد أونلاين:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Option 1: Card */}
                    <label
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mb-1 text-amber-400" />
                      <span className="text-xs font-bold">بطاقة بنكية / مدى</span>
                      <span className="text-[10px] text-slate-400">Visa / Mastercard</span>
                    </label>

                    {/* Option 2: Wallets */}
                    <label
                      onClick={() => setPaymentMethod('wallet')}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'wallet'
                          ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Wallet className="w-5 h-5 mb-1 text-amber-400" />
                      <span className="text-xs font-bold">محفظة إلكترونية</span>
                      <span className="text-[10px] text-slate-400">فودافون / STC / Apple</span>
                    </label>

                    {/* Option 3: Bank IBAN */}
                    <label
                      onClick={() => setPaymentMethod('iban')}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        paymentMethod === 'iban'
                          ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Building2 className="w-5 h-5 mb-1 text-amber-400" />
                      <span className="text-xs font-bold">تحويل بنكي IBAN</span>
                      <span className="text-[10px] text-slate-400">تحويل فوري معتمد</span>
                    </label>

                  </div>
                </div>

                {/* Simulated Payment Inputs for Realism */}
                {paymentMethod === 'card' && (
                  <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>بيانات البطاقة المشفرة (3D Secure)</span>
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• •••• رقم البطاقة"
                        dir="ltr"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-800 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2.5 border border-slate-700 font-mono text-center tracking-widest focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY تاريخ الانتهاء"
                        dir="ltr"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-slate-800 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2 border border-slate-700 font-mono text-center focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="password"
                        placeholder="CVV رمز الأمان"
                        dir="ltr"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-slate-800 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2 border border-slate-700 font-mono text-center focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}

                {/* Back & Submit Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="sm:w-1/3 flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-2xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>رجوع لبيانات الشحن</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl text-base font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-400/20 transition-all hover:scale-[1.01] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>جارٍ معالجة السداد وتأكيد الطلب...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-5 h-5 text-slate-900" />
                        <span>تأكيد الطلب والسداد النهائي ({formatPrice(finalTotal, currency)})</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>جميع المعاملات مشفرة 256-bit SSL ومحمية بضمان استرداد الأموال 14 يوماً.</span>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER CONFIRMED PREVIEW */}
            {currentStep === 3 && (
              <div className="space-y-5 text-center py-6 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-lg shadow-emerald-500/20 animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">تم تأكيد طلبك وسداد القيمة بنجاح! 🎉</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    تم إنشاء فاتورتك الرقمية المعتمدة وتخصيص قسيمة مكافأة القرن بنسبة 100%.
                  </p>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-emerald-500/30 text-xs text-slate-300 space-y-1">
                  <div><strong>اسم العميل:</strong> {customerName}</div>
                  <div><strong>رقم الجوال:</strong> {phone}</div>
                  <div><strong>عنوان الشحن:</strong> {address}، {city}</div>
                  <div className="text-amber-400 font-mono font-bold pt-1">
                    إجمالي المبلغ المسدد: {formatPrice(finalTotal, currency)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1);
                    onScrollToCatalog();
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer"
                >
                  تسوق المزيد من العروض
                </button>
              </div>
            )}

          </div>

          {/* Left Column: Order Summary & Cart Items Breakdown */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">ملخص المنتجات المختارة</h3>
              <span className="text-xs bg-slate-800 text-amber-400 font-bold px-2 py-0.5 rounded font-mono">
                {cart.length} أصناف
              </span>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-3">
                <p className="text-xs">سلتك فارغة حالياً. تصفح الكتالوج واختر ما يناسبك بخصم حتى 70%!</p>
                <button
                  type="button"
                  onClick={onScrollToCatalog}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                >
                  <span>تصفح كتالوج الـ 100 منتج</span>
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-slate-800/50 border border-slate-800"
                  >
                    {product.image && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-700/60 shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{product.name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-amber-400 font-mono font-bold">
                          {formatPrice(product.discountPrice, currency)}
                        </span>
                        <span className="line-through text-slate-500 font-mono text-[10px]">
                          {formatPrice(product.originalPrice, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                        title="إنقاص الكمية"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono text-white px-1">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                        title="زيادة الكمية"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(product.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Voucher Coupon Input */}
            <form onSubmit={handleApplyCoupon} className="pt-2">
              <label className="block text-[11px] font-bold text-slate-300 mb-1">
                كود الخصم الإضافي (جرب ONLINE5):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ادخل كود الخصم..."
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-slate-800 text-white placeholder-slate-500 text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-400 font-mono uppercase"
                />
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  تطبيق
                </button>
              </div>
              {isOnline5 && (
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1.5">
                  <CheckCircle className="w-3 h-3" />
                  <span>تم تطبيق كود ONLINE5 وخصم 5% إضافي فوراً!</span>
                </div>
              )}
            </form>

            {/* Totals Breakdown */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>السعر الأصلي للمنتجات:</span>
                <span className="font-mono tabular-nums">{formatPrice(subtotalOriginal, currency)}</span>
              </div>

              <div className="flex justify-between text-emerald-400 font-bold">
                <span>خصم الـ 4 ساعات للسداد أونلاين:</span>
                <span className="font-mono tabular-nums">- {formatPrice(generalSavings, currency)}</span>
              </div>

              {isOnline5 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>خصم كود السداد أونلاين (ONLINE5 - 5%):</span>
                  <span className="font-mono tabular-nums">- {formatPrice(couponDiscountAmount, currency)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span>الشحن والتأمين الشامل:</span>
                <span className="text-emerald-400 font-bold">مجاناً 100% 🚚</span>
              </div>

              {isFastTrack && (
                <div className="flex justify-between text-amber-400 font-bold bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20 animate-fade-in">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>رسوم الشحن السريع VIP (Fast-Track):</span>
                  </span>
                  <span className="font-mono tabular-nums">+ {formatPrice(FAST_TRACK_FEE_USD, currency)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-white">
                <span className="font-bold text-sm">المجموع النهائي للدفع:</span>
                <span className="text-2xl font-black font-mono text-amber-400 tabular-nums">
                  {formatPrice(finalTotal, currency)}
                </span>
              </div>

              <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-800/40 text-center text-[11px] text-emerald-300 font-semibold mt-2">
                🎉 إجمالي ما وفرته عبر السداد أونلاين: {formatPrice(generalSavings + couponDiscountAmount, currency)}!
              </div>

              {/* Century Offer 100% Value Match Live Banner */}
              <div className="bg-gradient-to-r from-amber-500/20 via-red-600/20 to-amber-500/20 border border-amber-500/50 p-3 rounded-2xl text-center space-y-1 mt-3 shadow-inner">
                <div className="flex items-center justify-center gap-1.5 text-amber-300 font-black text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>مكافأة عرض القرن (قسيمة مطابقة 100%)</span>
                </div>
                <p className="text-[11px] text-slate-200">
                  ستحصل فوراً مع هذا الطلب على قسيمة مشتريات إضافية مجانية بنفس القيمة:{' '}
                  <strong className="text-amber-400 font-mono font-black">{formatPrice(finalTotal, currency)}</strong>!
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
