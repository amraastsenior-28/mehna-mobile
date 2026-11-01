import React, { useState, useEffect, useRef } from 'react';
import type { Language } from '../Navbar';
import { ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

interface OtpVerificationScreenProps {
  language: Language;
  phone: string;
  onBack: () => void;
  onVerifySuccess: () => void;
}

/**
 * Screen 4: One-Time Password (OTP) 6-Box Verification
 * Implements Section 6 of MEHNA UI Spec v2:
 * - 6 individual code input boxes with automatic focus shifting
 * - Resend timer with countdown
 * - Back button to correct phone number
 */
export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  language,
  phone,
  onBack,
  onVerifySuccess,
}) => {
  const isAr = language === 'ar';
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resending
  useEffect(() => {
    if (timerSeconds <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, '');
    if (!clean) {
      const nextDigits = [...digits];
      nextDigits[index] = '';
      setDigits(nextDigits);
      return;
    }

    const lastChar = clean[clean.length - 1];
    const nextDigits = [...digits];
    nextDigits[index] = lastChar;
    setDigits(nextDigits);

    // Shift to next box if available
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimerSeconds(60);
    setCanResend(false);
    setDigits(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleConfirm = () => {
    setIsVerifying(true);
    // Simulating quick instant OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      onVerifySuccess();
    }, 400);
  };

  const isComplete = digits.every((d) => d.length === 1);

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-6 overflow-y-auto selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      <div>
        {/* Back navigation */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={onBack}
            aria-label={isAr ? 'تعديل رقم الهاتف' : 'Edit phone number'}
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
            {isAr ? 'التحقق من الهاتف' : 'Phone Verification'}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--theme-primary)' }}>
          {isAr ? 'أدخل رمز التحقق' : 'Enter 6-Digit Code'}
        </h2>
        <p className="text-sm text-[var(--theme-text-muted)] mb-1">
          {isAr
            ? `أرسلنا رسالة نصية قصيرة تحتوي على رمز التأكيد إلى الرقم:`
            : `We sent a 6-digit verification code via SMS to:`}
        </p>
        <div className="flex items-center gap-2 mb-8" dir="ltr">
          <span className="font-mono font-bold text-base text-[var(--theme-text)]">{phone}</span>
          <button
            onClick={onBack}
            className="text-xs font-bold text-[var(--theme-accent)] underline cursor-pointer"
          >
            {isAr ? 'تغيير' : 'Edit'}
          </button>
        </div>

        {/* 6-box input (LTR layout for digits) */}
        <div className="flex justify-between items-center gap-2 max-w-sm mx-auto my-6" dir="ltr">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-12 h-14 text-center text-2xl font-black rounded-xl border font-mono outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all select-all"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: digit ? 'var(--theme-accent)' : 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            />
          ))}
        </div>

        {/* Resend Timer */}
        <div className="text-center my-6">
          {canResend ? (
            <button
              onClick={handleResend}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[var(--theme-accent)] cursor-pointer hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعادة إرسال رمز التحقق الآن' : 'Resend code now'}</span>
            </button>
          ) : (
            <p className="text-xs text-[var(--theme-text-muted)]">
              {isAr ? (
                <>إعادة إرسال الرمز خلال <span className="font-bold font-mono text-[var(--theme-text)]">{timerSeconds}</span> ثانية</>
              ) : (
                <>Resend code in <span className="font-bold font-mono text-[var(--theme-text)]">{timerSeconds}s</span></>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="pt-6 pb-2">
        <button
          onClick={handleConfirm}
          disabled={!isComplete || isVerifying}
          className={`w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-md ${
            !isComplete ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            backgroundColor: 'var(--theme-primary)',
            color: 'var(--theme-on-primary)',
          }}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>
            {isVerifying
              ? isAr
                ? 'جارِ التحقق...'
                : 'Verifying...'
              : isAr
              ? 'تأكيد الرمز ومتابعة'
              : 'Confirm & Continue'}
          </span>
        </button>
      </div>
    </div>
  );
};
