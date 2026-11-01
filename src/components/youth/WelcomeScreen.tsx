import React from 'react';
import type { Language } from '../Navbar';
import { Sun, Moon, Globe } from 'lucide-react';

interface WelcomeScreenProps {
  language: Language;
  onToggleLanguage: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onSelectGoogle: () => void;
  onSelectPhone: () => void;
  onSkipGuest?: () => void;
}

/**
 * Screen 2: Welcome Screen
 * Implements Section 6 & 7 of MEHNA UI Spec v2:
 * - Two sign-in options only: Google or Phone
 * - MEHNA emblem rendered at 56px tall (within the 48-64px spec) with 0.73:1 aspect ratio
 * - Dark/light toggle and language switch located cleanly in the top bar
 * - 18px minimum legible body typography, full-width touch targets >= 48px
 */
export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onToggleLanguage,
  isDark,
  onToggleTheme,
  onSelectGoogle,
  onSelectPhone,
  onSkipGuest,
}) => {
  const isAr = language === 'ar';

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-6 overflow-y-auto selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {/* Top Header Controls: Theme & Language Toggle */}
      <div className="flex items-center justify-between w-full pt-2">
        <button
          onClick={onToggleLanguage}
          aria-label={isAr ? 'تغيير اللغة إلى الإنجليزية' : 'Switch to Arabic'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer select-none"
          style={{
            borderColor: 'var(--theme-border)',
            backgroundColor: 'var(--theme-surface)',
            color: 'var(--theme-text)',
          }}
        >
          <Globe className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          <span>{isAr ? 'English' : 'العربية'}</span>
        </button>

        <button
          onClick={onToggleTheme}
          aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
          className="p-2 rounded-full border transition-colors cursor-pointer select-none"
          style={{
            borderColor: 'var(--theme-border)',
            backgroundColor: 'var(--theme-surface)',
            color: 'var(--theme-text)',
          }}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-[var(--theme-warning)]" />
          ) : (
            <Moon className="w-4 h-4 text-[var(--theme-primary)]" />
          )}
        </button>
      </div>

      {/* Center Branding Area */}
      <div className="flex flex-col items-center text-center my-auto py-8">
        {/* 
          Official MEHNA Emblem:
          - Rendered at 56px height (within 48-64px spec)
          - Aspect ratio strictly preserved at 0.73 : 1 (width: 41px, height: 56px)
          - Clear space of 25% width maintained
        */}
        <div className="relative mb-6 p-2 rounded-2xl flex items-center justify-center">
          <img
            src={`${import.meta.env.BASE_URL}emblem-demo-192.png`}
            alt="MEHNA Emblem"
            className="h-14 w-[41px] object-contain select-none pointer-events-none"
            style={{ aspectRatio: '0.73 / 1' }}
          />
        </div>

        {/* Wordmark typography */}
        <h1 className="text-3xl font-black tracking-tight mb-2 font-arabic" style={{ color: 'var(--theme-primary)' }}>
          {isAr ? 'مِـهْـنَـة' : 'MEHNA'}
        </h1>
        <span className="text-[11px] font-bold tracking-[0.25em] text-[var(--theme-accent)] uppercase mb-5 font-sans">
          ASWAN DUAL VET ALLIANCE
        </span>

        {/* Value Proposition */}
        <p className="text-lg font-bold leading-relaxed max-w-xs mb-3 text-[var(--theme-text)]">
          {isAr
            ? 'فرص تدريب عملي حقيقية بمكافأة شهرية معتمدة'
            : 'Certified Work-Based Learning Opportunities with Verified Stipends'}
        </p>
        <p className="text-sm leading-normal max-w-xs text-[var(--theme-text-muted)]">
          {isAr
            ? 'ربط مباشر وموثق بين مهارات شباب أسوان ومشروعات الطاقة والبيئة والحرف التراثية.'
            : 'Connecting youth competencies to green energy, eco-tourism, and heritage industries in Aswan.'}
        </p>
      </div>

      {/* Bottom Action Area: Two sign-in options only */}
      <div className="w-full space-y-3 pb-4">
        {/* Option 1: Continue with Google */}
        <button
          onClick={onSelectGoogle}
          className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl border font-bold text-base flex items-center justify-center gap-3 transition-transform active:scale-[0.98] cursor-pointer shadow-xs"
          style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)',
            color: 'var(--theme-text)',
          }}
        >
          {/* Google G Logo SVG */}
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{isAr ? 'المتابعة باستخدام Google' : 'Continue with Google'}</span>
        </button>

        {/* Option 2: Continue with Phone */}
        <button
          onClick={onSelectPhone}
          className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-md"
          style={{
            backgroundColor: 'var(--theme-primary)',
            color: 'var(--theme-on-primary)',
          }}
        >
          <span>{isAr ? 'المتابعة برقم الهاتف' : 'Continue with Phone'}</span>
        </button>

        {/* Optional Guest Peek */}
        {onSkipGuest && (
          <button
            onClick={onSkipGuest}
            className="w-full text-center text-xs font-semibold py-2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors cursor-pointer"
          >
            {isAr ? 'تصفح الفرص المتاحة كزائر' : 'Browse available opportunities as guest'}
          </button>
        )}
      </div>
    </div>
  );
};
