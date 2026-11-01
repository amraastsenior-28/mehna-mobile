import React from 'react';
import type { Language } from '../Navbar';
import { CheckCircle2, Clock, FileCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface ApplicationSentModalProps {
  language: Language;
  onClose: () => void;
  onViewStipends: () => void;
}

/**
 * Screen 9: Application Sent (Three-Step Timeline)
 * Implements Section 7 of MEHNA UI Spec v2:
 * 1. Application Received & Verified (مكتمل)
 * 2. Employer Review & Site Scheduling (قيد المراجعة)
 * 3. Contract Signing & Stipend Activation (المرحلة القادمة)
 */
export const ApplicationSentModal: React.FC<ApplicationSentModalProps> = ({
  language,
  onClose,
  onViewStipends,
}) => {
  const isAr = language === 'ar';

  const timelineSteps = [
    {
      step: 1,
      titleAr: 'تم استلام وتوثيق الطلب',
      titleEn: 'Application Received & Verified',
      descAr: 'تم تسجيل بياناتك المهارية ونسبة المطابقة بنجاح.',
      descEn: 'Your competencies and fit score have been safely recorded.',
      status: 'completed',
    },
    {
      step: 2,
      titleAr: 'مراجعة جهة العمل والمشرف الميداني',
      titleEn: 'Employer & Field Supervisor Review',
      descAr: 'تقوم جهة العمل بفحص الجاهزية وتحديد موعد المقابلة الميدانية.',
      descEn: 'The host employer is reviewing your application for on-site placement.',
      status: 'active',
    },
    {
      step: 3,
      titleAr: 'توقيع العقد وتفعيل بطاقة المكافأة',
      titleEn: 'Contract Signing & Stipend Card Issuance',
      descAr: 'إصدار بطاقة ميزة الوطنية وتحويل الدفعة الأولى من المكافأة.',
      descEn: 'Issuing the national Meeza card and scheduling first stipend disbursement.',
      status: 'upcoming',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
    >
      <div
        className="w-full max-w-sm rounded-3xl border p-6 shadow-2xl space-y-5"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
          color: 'var(--theme-text)',
        }}
      >
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-[var(--theme-success)] flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-black" style={{ color: 'var(--theme-primary)' }}>
            {isAr ? 'تم إرسال طلبك بنجاح!' : 'Application Sent Successfully!'}
          </h3>
          <p className="text-xs text-[var(--theme-text-muted)]">
            {isAr
              ? 'طلبك الآن قيد المعالجة الرسمية وفق مراحل منظومة التدريب المزدوج بأسوان.'
              : 'Your application is progressing through official Aswan Dual VET milestones.'}
          </p>
        </div>

        {/* 3-Step Timeline (Spec Section 7) */}
        <div className="space-y-4 py-2">
          {timelineSteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div key={step.step} className="flex items-start gap-3 relative">
                {/* Connecting line */}
                {idx < timelineSteps.length - 1 && (
                  <div
                    className={`absolute ${isAr ? 'right-4' : 'left-4'} top-8 w-0.5 h-10 ${
                      isCompleted ? 'bg-[var(--theme-success)]' : 'bg-[var(--theme-border)]'
                    }`}
                  />
                )}

                {/* Step icon / badge */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 ${
                    isCompleted
                      ? 'bg-[var(--theme-success)] text-white'
                      : isActive
                      ? 'bg-[var(--theme-accent)] text-white animate-pulse'
                      : 'bg-[var(--theme-bg)] border border-[var(--theme-border)] text-[var(--theme-text-muted)]'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActive ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <FileCheck className="w-4 h-4" />
                  )}
                </div>

                {/* Step details */}
                <div className="flex-1">
                  <h4
                    className={`font-bold text-xs ${
                      isActive ? 'text-[var(--theme-accent-ink)]' : 'text-[var(--theme-text)]'
                    }`}
                  >
                    {isAr ? step.titleAr : step.titleEn}
                  </h4>
                  <p className="text-[11px] text-[var(--theme-text-muted)] mt-0.5 leading-snug">
                    {isAr ? step.descAr : step.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onViewStipends}
            className="w-full min-h-[48px] py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: 'var(--theme-on-primary)',
            }}
          >
            <span>{isAr ? 'متابعة مسار المكافآت الشهرية' : 'View My Stipend Schedule'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="w-full text-center text-xs font-bold py-2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] cursor-pointer"
          >
            {isAr ? 'العودة لتصفح الفرص' : 'Back to Opportunities'}
          </button>
        </div>
      </div>
    </div>
  );
};
