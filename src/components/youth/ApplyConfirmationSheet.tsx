import React from 'react';
import type { WBLOpportunity } from '../../data/mockData';
import type { Language } from '../Navbar';
import { X, Building2, MapPin, Calendar, Coins, ShieldCheck, Check } from 'lucide-react';

interface ApplyConfirmationSheetProps {
  opportunity: WBLOpportunity;
  language: Language;
  onClose: () => void;
  onConfirm: () => void;
  isUnder18: boolean;
  hasParentalConsent: boolean;
  onRequestParentalConsent: () => void;
}

/**
 * Screen 8: Apply Confirmation Glass Sheet
 * Implements Section 7 of MEHNA UI Spec v2:
 * - Glass surface modal
 * - Displays employer, stipend in clear numerals, location, start date
 * - Mandatory plain Arabic consent line
 * - Under-18 verification guard
 */
export const ApplyConfirmationSheet: React.FC<ApplyConfirmationSheetProps> = ({
  opportunity,
  language,
  onClose,
  onConfirm,
  isUnder18,
  hasParentalConsent,
  onRequestParentalConsent,
}) => {
  const isAr = language === 'ar';

  const handleAction = () => {
    if (isUnder18 && !hasParentalConsent) {
      onRequestParentalConsent();
      return;
    }
    onConfirm();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-h-[85vh] rounded-t-3xl border-t p-6 overflow-y-auto shadow-2xl transition-transform"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
          color: 'var(--theme-text)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[var(--theme-border)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--theme-accent)]" />
            <h3 className="font-bold text-sm text-[var(--theme-text)]">
              {isAr ? 'تأكيد طلب الالتحاق بالتدريب العملي' : 'Confirm Dual VET Application'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            className="p-1 rounded-full hover:bg-[var(--theme-border)] cursor-pointer"
          >
            <X className="w-5 h-5 text-[var(--theme-text-muted)]" />
          </button>
        </div>

        {/* Opportunity Card Summary */}
        <div className="my-4 space-y-3">
          <div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent-ink)]">
              {isAr ? opportunity.sectorAr : opportunity.sectorEn}
            </span>
            <h4 className="font-black text-lg text-[var(--theme-text)] mt-1">
              {isAr ? opportunity.titleAr : opportunity.titleEn}
            </h4>
          </div>

          <div
            className="p-4 rounded-2xl border space-y-2.5 text-xs"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            {/* Employer */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>{isAr ? 'جهة العمل والشريك الميداني:' : 'Employer / Host:'}</span>
              </span>
              <span className="font-bold text-[var(--theme-text)]">
                {isAr ? opportunity.employerAr : opportunity.employerEn}
              </span>
            </div>

            {/* Stipend */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>{isAr ? 'المكافأة الشهرية المعتمدة:' : 'Monthly Stipend:'}</span>
              </span>
              <span className="font-black font-mono text-base text-[var(--theme-accent-ink)]">
                {opportunity.stipend.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>{isAr ? 'مقر التدريب العملي:' : 'Worksite:'}</span>
              </span>
              <span className="font-bold text-[var(--theme-text)]">
                {isAr ? opportunity.locationAr : opportunity.locationEn}
              </span>
            </div>

            {/* Start Date */}
            <div className="flex items-center justify-between">
              <span className="text-[var(--theme-text-muted)] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>{isAr ? 'تاريخ البدء المتوقع:' : 'Expected Start:'}</span>
              </span>
              <span className="font-bold text-[var(--theme-text)]">
                {isAr ? 'أول الشهر القادم' : '1st of Next Month'}
              </span>
            </div>
          </div>

          {/* Under 18 Warning if consent not yet done */}
          {isUnder18 && !hasParentalConsent && (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs">
              <span className="font-bold block mb-0.5">
                {isAr ? 'تنبيه: يلزم موافقة ولي الأمر قبل التأكيد النهائي' : 'Notice: Guardian consent required before final confirmation'}
              </span>
              {isAr
                ? 'بالضغط على الزر، سيتم نقلك لتأكيد رقم ولي الأمر وتوثيق الإذن الرسمي.'
                : 'Pressing confirm will guide you to verify your parent/guardian.'}
            </div>
          )}

          {/* Consent line */}
          <p className="text-[11px] leading-relaxed text-[var(--theme-text-muted)] p-2">
            {isAr
              ? 'بالضغط على تأكيد التقديم، أقر برغبتي في الالتحاق بالبرنامج والالتزام بمواعيد التدريب العملي، وتفويض المنظومة بمطابقة سجلي المهاري مع جهة العمل.'
              : 'By confirming, I agree to attend on-site training sessions and authorize MEHNA to share my certified skills portfolio with the employer.'}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleAction}
            className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-md"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'var(--theme-on-primary)',
            }}
          >
            <Check className="w-5 h-5 shrink-0 stroke-[3]" />
            <span>
              {isUnder18 && !hasParentalConsent
                ? isAr
                  ? 'متابعة موافقة ولي الأمر أولاً'
                  : 'Proceed to Guardian Consent'
                : isAr
                ? 'تأكيد التقديم النهائي'
                : 'Confirm Final Application'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
