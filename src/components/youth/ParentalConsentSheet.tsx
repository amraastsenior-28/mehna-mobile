import React, { useState } from 'react';
import type { Language } from '../Navbar';
import { ShieldAlert, X, Send, CheckCircle2 } from 'lucide-react';

interface ParentalConsentSheetProps {
  language: Language;
  onClose: () => void;
  onConsentSuccess: (parentPhone: string, parentRelation: string) => void;
}

/**
 * Screen 13: Parental Consent Flow (Under-18 Candidate Protection)
 * Implements Section 6 & 7 of MEHNA UI Spec v2:
 * - Triggered automatically for any candidate under 18 years of age before applying
 * - Clear explanation of legal Dual VET training requirements in plain Arabic
 * - Parent contact collection and simulated verified authorization link
 */
export const ParentalConsentSheet: React.FC<ParentalConsentSheetProps> = ({
  language,
  onClose,
  onConsentSuccess,
}) => {
  const isAr = language === 'ar';
  const [parentPhone, setParentPhone] = useState('');
  const [parentRelation, setParentRelation] = useState<'father' | 'mother' | 'guardian'>('father');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = parentPhone.replace(/\D/g, '');
    if (clean.length < 9) {
      setError(isAr ? 'يرجى إدخال رقم هاتف صحيح لولي الأمر' : 'Please enter a valid phone number for the guardian');
      return;
    }

    setError(null);
    setIsSent(true);

    // Simulate approval process or instant link sending
    setTimeout(() => {
      onConsentSuccess(`+20 ${clean}`, parentRelation);
    }, 1200);
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
          <div className="flex items-center gap-2 text-amber-600">
            <ShieldAlert className="w-5 h-5 text-[var(--theme-warning)]" />
            <h3 className="font-bold text-sm text-[var(--theme-text)]">
              {isAr ? 'موافقة ولي الأمر (دون 18 عاماً)' : 'Parental Consent (Under 18)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[var(--theme-border)] cursor-pointer"
          >
            <X className="w-5 h-5 text-[var(--theme-text-muted)]" />
          </button>
        </div>

        {/* Content */}
        {!isSent ? (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div
              className="p-3.5 rounded-2xl border text-xs leading-relaxed"
              style={{
                backgroundColor: 'var(--theme-bg)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text-muted)',
              }}
            >
              <p className="font-bold text-[var(--theme-text)] mb-1">
                {isAr ? 'لماذا نطلب موافقة ولي الأمر؟' : 'Why do we require parental consent?'}
              </p>
              <p>
                {isAr
                  ? 'وفقاً لقانون الطفل واللوائح المنظمة لبرامج التعليم والتدريب المزدوج بجمهورية مصر العربية، يلزم الحصول على موافقة خطية أو إلكترونية موثقة من ولي أمر المتدرب قبل التعاقد وصرف المكافأة المالية الشهرية.'
                  : 'Under Egyptian Dual VET regulations, registered trainees under 18 years of age require verified guardian authorization before enrollment and stipend disbursement.'}
              </p>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold">
                {error}
              </div>
            )}

            {/* Relation selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--theme-text)]">
                {isAr ? 'صلة القرابة' : 'Guardian Relationship'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'father', ar: 'الأب', en: 'Father' },
                  { id: 'mother', ar: 'الأم', en: 'Mother' },
                  { id: 'guardian', ar: 'ولي أمر قانوني', en: 'Legal Guardian' },
                ].map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => setParentRelation(rel.id as any)}
                    className="py-2.5 px-2 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center"
                    style={{
                      backgroundColor: parentRelation === rel.id ? 'var(--theme-surface)' : 'var(--theme-bg)',
                      borderColor: parentRelation === rel.id ? 'var(--theme-accent)' : 'var(--theme-border)',
                      color: parentRelation === rel.id ? 'var(--theme-accent-ink)' : 'var(--theme-text-muted)',
                    }}
                  >
                    {isAr ? rel.ar : rel.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Parent Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[var(--theme-text)]">
                {isAr ? 'رقم هاتف ولي الأمر' : "Guardian's Mobile Number"}
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
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-md"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: 'var(--theme-on-primary)',
                }}
              >
                <Send className="w-5 h-5 shrink-0" />
                <span>{isAr ? 'إرسال رابط الموافقة لولي الأمر' : 'Send Approval Link to Guardian'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[var(--theme-success)] mx-auto animate-bounce" />
            <h4 className="text-base font-black text-[var(--theme-text)]">
              {isAr ? 'تم إرسال رابط الموافقة بنجاح' : 'Guardian Link Sent Successfully'}
            </h4>
            <p className="text-xs text-[var(--theme-text-muted)] max-w-xs mx-auto">
              {isAr
                ? 'أرسلنا رسالة SMS برابط التحقق الرقمي لولي الأمر. يمكنك الآن المتابعة وتأكيد طلب التقديم.'
                : 'A verified SMS verification link has been sent to your guardian. You can now proceed with your application.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
