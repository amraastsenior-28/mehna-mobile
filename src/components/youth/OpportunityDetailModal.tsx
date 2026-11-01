import React from 'react';
import type { WBLOpportunity } from '../../data/mockData';
import type { Language } from '../Navbar';
import { X, MapPin, Building2, CheckCircle, ShieldCheck, Calendar, Sparkles } from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: WBLOpportunity;
  language: Language;
  onClose: () => void;
  onApply: (opp: WBLOpportunity) => void;
  isApplied: boolean;
  isDark: boolean;
  matchScore: number;
}

/**
 * Screen 7: Opportunity Detail Screen / Modal
 * Implements Section 7 of MEHNA UI Spec v2:
 * - Stipend in large prominent numerals (no confidential salaries)
 * - Verified employer line with official accreditation badge
 * - KSAO competency requirements checklist
 * - Sticky full-width "قدّم دلوقتي" button
 * - Clean glass or surface backdrop
 */
export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  language,
  onClose,
  onApply,
  isApplied,
  isDark,
  matchScore,
}) => {
  const isAr = language === 'ar';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-h-[90vh] rounded-t-3xl border-t flex flex-col overflow-hidden shadow-2xl transition-transform duration-200"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
          color: 'var(--theme-text)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Handle & Close Bar */}
        <div className="flex items-center justify-between p-4 pb-2 border-b border-[var(--theme-border)]">
          <div className="w-10 h-1 bg-[var(--theme-border)] rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2.5" />
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--theme-accent)]">
            <ShieldCheck className="w-4 h-4" />
            <span>{isAr ? 'فرصة تدريب موثقة ومعتمدة' : 'Verified Dual VET Opportunity'}</span>
          </div>
          <button
            onClick={onClose}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            className="p-1.5 rounded-full hover:bg-[var(--theme-border)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-[var(--theme-text-muted)]" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Top Hero Section: Large Stipend Numerals (Spec Section 7) */}
          <div
            className="p-4 rounded-2xl border"
            style={{
              backgroundColor: isDark ? 'rgba(31, 61, 54, 0.4)' : '#F7F3EA',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-xs font-bold text-[var(--theme-accent-ink)] uppercase">
                {isAr ? 'المكافأة الشهرية المعتمدة' : 'Certified Monthly Stipend'}
              </span>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--theme-primary)] text-white text-xs font-black">
                <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
                <span>{matchScore}% {isAr ? 'تطابق' : 'Fit'}</span>
              </div>
            </div>

            {/* Prominent Numerals */}
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black font-mono text-[var(--theme-text)]">
                {opportunity.stipend.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-[var(--theme-text-muted)]">
                {isAr ? 'ج.م / شهرياً' : 'EGP / month'}
              </span>
            </div>
            <p className="text-[11px] text-[var(--theme-text-muted)] mt-1">
              {isAr
                ? 'تصرف من صندوق دعم التدريب الوطني عبر بطاقات ميزة / البريد المصري.'
                : 'Disbursed via National Training Support Fund rails (Meeza / Egypt Post).'}
            </p>
          </div>

          {/* Title & Employer */}
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--theme-accent)]/15 text-[var(--theme-accent-ink)] mb-1.5">
              {isAr ? opportunity.sectorAr : opportunity.sectorEn}
            </span>
            <h2 className="text-xl font-black text-[var(--theme-text)] leading-snug mb-1">
              {isAr ? opportunity.titleAr : opportunity.titleEn}
            </h2>
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--theme-primary)]">
              <Building2 className="w-4 h-4 shrink-0" />
              <span>{isAr ? opportunity.employerAr : opportunity.employerEn}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-[var(--theme-success)] font-bold">
                {isAr ? 'شريك معتمد' : 'Verified Partner'}
              </span>
            </div>
          </div>

          {/* Meta Info: Location & Duration */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div
              className="p-3 rounded-xl border flex items-center gap-2"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
              }}
            >
              <MapPin className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
              <div>
                <span className="text-[10px] text-[var(--theme-text-muted)] block">
                  {isAr ? 'الموقع بأسوان' : 'Location'}
                </span>
                <span className="font-bold text-[var(--theme-text)]">
                  {isAr ? opportunity.locationAr : opportunity.locationEn}
                </span>
              </div>
            </div>

            <div
              className="p-3 rounded-xl border flex items-center gap-2"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
              }}
            >
              <Calendar className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
              <div>
                <span className="text-[10px] text-[var(--theme-text-muted)] block">
                  {isAr ? 'مدة التدريب العملي' : 'Duration'}
                </span>
                <span className="font-bold text-[var(--theme-text)]">
                  {isAr ? '6 أشهر (نظام مزدوج)' : '6 Months (Dual VET)'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-sm text-[var(--theme-text)] mb-1.5">
              {isAr ? 'وصف بيئة التدريب والمهام:' : 'Work Environment & Scope:'}
            </h3>
            <p className="text-xs leading-relaxed text-[var(--theme-text-muted)]">
              {isAr ? opportunity.descriptionAr : opportunity.descriptionEn}
            </p>
          </div>

          {/* KSAO Competencies Checklist (Spec Section 7) */}
          <div
            className="p-4 rounded-2xl border space-y-2.5"
            style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--theme-primary)] flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[var(--theme-accent)]" />
              <span>{isAr ? 'الكفاءات المطلوبة (إطار ديسلر KSAO):' : 'Required Competencies (KSAO Framework):'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-[var(--theme-bg)] flex items-center justify-between">
                <span className="text-[var(--theme-text-muted)]">{isAr ? 'المعرفة النظرية (K)' : 'Knowledge (K)'}</span>
                <span className="font-bold font-mono text-[var(--theme-primary)]">
                  {opportunity.candidateKSAO.knowledge}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--theme-bg)] flex items-center justify-between">
                <span className="text-[var(--theme-text-muted)]">{isAr ? 'المهارات العملية (S)' : 'Skills (S)'}</span>
                <span className="font-bold font-mono text-[var(--theme-primary)]">
                  {opportunity.candidateKSAO.practicalSkills}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--theme-bg)] flex items-center justify-between">
                <span className="text-[var(--theme-text-muted)]">{isAr ? 'القدرات التحليلية (A)' : 'Abilities (A)'}</span>
                <span className="font-bold font-mono text-[var(--theme-primary)]">
                  {opportunity.candidateKSAO.abilities}%
                </span>
              </div>
              <div className="p-2 rounded-lg bg-[var(--theme-bg)] flex items-center justify-between">
                <span className="text-[var(--theme-text-muted)]">{isAr ? 'السياق الميداني (O)' : 'Context (O)'}</span>
                <span className="font-bold font-mono text-[var(--theme-primary)]">
                  {opportunity.candidateKSAO.contextual}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div
          className="p-4 border-t mehna-glass-bar"
          style={{
            borderColor: 'var(--theme-border)',
            paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)',
          }}
        >
          <button
            onClick={() => onApply(opportunity)}
            disabled={isApplied}
            className={`w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-md ${
              isApplied ? 'bg-emerald-600 text-white cursor-default' : ''
            }`}
            style={
              !isApplied
                ? {
                    backgroundColor: 'var(--theme-primary)',
                    color: 'var(--theme-on-primary)',
                  }
                : undefined
            }
          >
            {isApplied ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{isAr ? 'تم إرسال طلبك بالفعل' : 'Application Submitted'}</span>
              </>
            ) : (
              <span>{isAr ? 'قدّم دلوقتي' : 'Apply Now'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
