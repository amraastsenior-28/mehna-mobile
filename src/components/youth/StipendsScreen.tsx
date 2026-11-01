import React from 'react';
import type { Language } from '../Navbar';
import type { StipendEntry } from '../../data/mockData';
import { INITIAL_STIPENDS, STIPEND_CONFIG } from '../../data/mockData';
import { Coins, CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface StipendsScreenProps {
  language: Language;
  isDark: boolean;
  stipends?: StipendEntry[];
}

/**
 * Screen 10: My Stipends Screen
 * Implements Section 7 & 8 of MEHNA UI Spec v2:
 * - Prominent total verified earnings card
 * - Transparent monthly disbursement history
 * - Status chips conforming to tokens: success (Paid) and warning (Processing)
 * - Meeza / Egypt Post rails notification
 */
export const StipendsScreen: React.FC<StipendsScreenProps> = ({
  language,
  isDark,
  stipends = INITIAL_STIPENDS,
}) => {
  const isAr = language === 'ar';

  return (
    <div
      className="w-full h-full flex flex-col overflow-y-auto p-4 space-y-4 pb-20 selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {/* Title */}
      <div>
        <h2 className="text-xl font-black" style={{ color: 'var(--theme-primary)' }}>
          {isAr ? 'المكافأة الشهرية المعتمدة' : 'Verified Monthly Stipends'}
        </h2>
        <p className="text-xs text-[var(--theme-text-muted)]">
          {isAr
            ? 'سجل المستحقات والتحويلات المالية المباشرة عبر بطاقتك الوطنية.'
            : 'Track direct dual training disbursements via national payment rails.'}
        </p>
      </div>

      {/* Prominent Cumulative Card */}
      <div
        className="p-5 rounded-3xl border shadow-card relative overflow-hidden"
        style={{
          backgroundColor: isDark ? '#112B25' : '#0E3B33',
          borderColor: isDark ? '#1F3D36' : '#0E3B33',
          color: '#FFFDF8',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E0A86A]">
            <Coins className="w-4 h-4" />
            <span>{isAr ? 'إجمالي المبالغ المنصرفة الموثقة' : 'Cumulative Verified Earnings'}</span>
          </div>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/15 text-white font-medium">
            {isAr ? STIPEND_CONFIG.illustrativeLabelAr : STIPEND_CONFIG.illustrativeLabelEn}
          </span>
        </div>

        {/* Large Numerals */}
        <div className="flex items-baseline gap-2 my-1">
          <span className="text-3xl font-black font-mono tracking-tight text-white">
            {STIPEND_CONFIG.cumulativeVerifiedTotal.toLocaleString()}
          </span>
          <span className="text-sm font-bold text-white/80">{isAr ? 'ج.م' : 'EGP'}</span>
        </div>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 text-[11px] text-[#F4F0E6]/85">
          <CreditCard className="w-4 h-4 text-[#E0A86A] shrink-0" />
          <span>
            {isAr
              ? 'تصرف شهرياً عبر منظومة الدفع الوطنية (ميزة / البريد المصري).'
              : 'Disbursed directly via Meeza / Egypt Post rails.'}
          </span>
        </div>
      </div>

      {/* Monthly Breakdown List */}
      <div className="space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--theme-text-muted)]">
          {isAr ? 'سجل التحويلات الشهرية' : 'Monthly Disbursement History'}
        </h3>

        <div className="space-y-2.5">
          {stipends.map((stipend) => {
            const isPaid = stipend.statusEn === 'Paid';
            const isProcessing = stipend.statusEn === 'Processing';

            return (
              <div
                key={stipend.id}
                className="p-3.5 rounded-2xl border flex items-center justify-between shadow-xs transition-colors"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                }}
              >
                {/* Month & Reference */}
                <div className="space-y-1">
                  <span className="font-black text-sm text-[var(--theme-text)] block">
                    {isAr ? stipend.monthAr : stipend.monthEn}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--theme-text-muted)] font-mono">
                    <span>{stipend.referenceId}</span>
                  </div>
                </div>

                {/* Amount & Status Chip (Spec Section 2 Tokens) */}
                <div className="text-end space-y-1">
                  <div className="flex items-baseline justify-end gap-1 font-mono font-black text-sm text-[var(--theme-text)]">
                    <span>{stipend.amount.toLocaleString()}</span>
                    <span className="text-[10px] font-sans font-bold text-[var(--theme-text-muted)]">
                      {isAr ? 'ج.م' : 'EGP'}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isPaid
                        ? 'bg-emerald-500/15 text-[var(--theme-success)]'
                        : isProcessing
                        ? 'bg-amber-500/15 text-[var(--theme-warning)]'
                        : 'bg-neutral-500/15 text-[var(--theme-text-muted)]'
                    }`}
                  >
                    {isPaid ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : isProcessing ? (
                      <Clock className="w-3 h-3 animate-pulse" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    <span>{isAr ? stipend.statusAr : stipend.statusEn}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
