import React, { useState } from 'react';
import type { Language } from '../Navbar';
import { ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { checkIsUnder18 } from './types';

interface PhoneEntryScreenProps {
  language: Language;
  onBack: () => void;
  onSubmit: (data: { name: string; phone: string; dob: string; isUnder18: boolean }) => void;
  initialValues?: { name?: string; phone?: string; dob?: string };
}

/**
 * Screen 3: Phone Entry & Registration
 * Implements Section 6 of MEHNA UI Spec v2:
 * - Full name, phone (+20 prefilled), and date of birth (required fields only)
 * - Plain Arabic data consent declaration
 * - Automatic under-18 calculation for parental consent compliance
 * - Touch targets >= 48px and clear input validation
 */
export const PhoneEntryScreen: React.FC<PhoneEntryScreenProps> = ({
  language,
  onBack,
  onSubmit,
  initialValues,
}) => {
  const isAr = language === 'ar';
  const [fullName, setFullName] = useState(initialValues?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(initialValues?.phone || '');
  const [dob, setDob] = useState(initialValues?.dob || '2006-05-15');
  const [hasConsented, setHasConsented] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage(isAr ? 'يرجى إدخال الاسم بالكامل' : 'Please enter your full name');
      return;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
      setErrorMessage(isAr ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number');
      return;
    }

    if (!dob) {
      setErrorMessage(isAr ? 'يرجى تحديد تاريخ الميلاد' : 'Please enter your date of birth');
      return;
    }

    if (!hasConsented) {
      setErrorMessage(
        isAr
          ? 'يجب الموافقة على بيان جمع البيانات والمطابقة للمتابعة'
          : 'You must accept the data processing terms to continue'
      );
      return;
    }

    const under18 = checkIsUnder18(dob);
    onSubmit({
      name: fullName.trim(),
      phone: `+20 ${cleanPhone}`,
      dob,
      isUnder18: under18,
    });
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-6 overflow-y-auto selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {/* Top Header with Back Navigation */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={onBack}
            aria-label={isAr ? 'رجوع' : 'Back'}
            className="p-2 rounded-xl border transition-colors cursor-pointer"
            style={{
              borderColor: 'var(--theme-border)',
              backgroundColor: 'var(--theme-surface)',
              color: 'var(--theme-text)',
            }}
          >
            {isAr ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--theme-accent)]">
            {isAr ? 'إنشاء الحساب والتوثيق' : 'Account & Verification'}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--theme-primary)' }}>
          {isAr ? 'بيانات التسجيل الأساسية' : 'Enter Your Basic Details'}
        </h2>
        <p className="text-sm text-[var(--theme-text-muted)] mb-6">
          {isAr
            ? 'نطلب الاسم ورقم الهاتف وتاريخ الميلاد فقط لربطك بفرص تدريب أسوان المعتمدة.'
            : 'We only require your name, phone, and birth date to connect you with verified Aswan opportunities.'}
        </p>

        {/* Error banner */}
        {errorMessage && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[var(--theme-text)]">
              {isAr ? 'الاسم بالكامل (ثلاثي على الأقل)' : 'Full Name (at least 3 names)'}
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={isAr ? 'مثال: يوسف محمود علي' : 'e.g. Youssef Mahmoud Ali'}
              className="w-full min-h-[48px] px-4 rounded-xl border text-base font-medium outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            />
          </div>

          {/* Phone Number with Prefilled +20 */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[var(--theme-text)]">
              {isAr ? 'رقم الهاتف المحمول' : 'Mobile Phone Number'}
            </label>
            <div className="flex items-center gap-2" dir="ltr">
              <span
                className="min-h-[48px] px-3.5 flex items-center justify-center rounded-xl border text-sm font-bold shrink-0 select-none"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-accent-ink)',
                }}
              >
                +20
              </span>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="101 234 5678"
                className="w-full min-h-[48px] px-4 rounded-xl border text-base font-mono outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all text-start"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)',
                }}
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[var(--theme-text)]">
                {isAr ? 'تاريخ الميلاد' : 'Date of Birth'}
              </label>
              {dob && checkIsUnder18(dob) && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-[var(--theme-warning)]">
                  {isAr ? 'أقل من 18 عاماً (يتطلب إذن ولي الأمر)' : 'Under 18 (Parental Consent Required)'}
                </span>
              )}
            </div>
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl border text-base font-sans outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            />
          </div>

          {/* Consent Checkbox */}
          <div
            className="p-3.5 rounded-xl border flex items-start gap-3 mt-4"
            style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <input
              type="checkbox"
              id="consent-check"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded accent-[var(--theme-primary)] shrink-0 cursor-pointer"
            />
            <label
              htmlFor="consent-check"
              className="text-xs leading-relaxed text-[var(--theme-text-muted)] cursor-pointer select-none"
            >
              <span className="font-bold text-[var(--theme-text)] block mb-0.5">
                {isAr ? 'إقرار وموافقة على معالجة البيانات:' : 'Data Collection & Processing Consent:'}
              </span>
              {isAr
                ? 'أوافق على جمع البيانات الضرورية (الاسم، الهاتف، وتاريخ الميلاد) لغرض التوثيق وربط فرص التدريب والتشغيل بأسوان وفق اللوائح الوطنية المنظمة لبرامج التعليم والتدريب المزدوج.'
                : 'I consent to the collection of essential details (name, phone, and birth date) for the purpose of qualification verification and matching with Dual VET opportunities in Aswan.'}
            </label>
          </div>
        </form>
      </div>

      {/* Submit Button */}
      <div className="pt-6 pb-2">
        <button
          onClick={handleSubmit}
          className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-md"
          style={{
            backgroundColor: 'var(--theme-primary)',
            color: 'var(--theme-on-primary)',
          }}
        >
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>{isAr ? 'إرسال رمز التحقق (OTP)' : 'Send Verification Code (OTP)'}</span>
        </button>
      </div>
    </div>
  );
};
