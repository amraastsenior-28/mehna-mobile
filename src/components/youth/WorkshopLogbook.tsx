import React, { useState } from 'react';
import type { Language } from '../Navbar';
import {
  Award,
  CheckCircle2,
  Clock,
  UserCheck,
  BookOpen,
  Calendar,
  X
} from 'lucide-react';

export interface LogbookShift {
  id: string;
  weekNumber: number;
  titleAr: string;
  titleEn: string;
  date: string;
  hoursCompleted: number;
  skillsPracticedAr: string[];
  skillsPracticedEn: string[];
  craftsmanNotesAr: string;
  craftsmanNotesEn: string;
  status: 'verified' | 'pending';
  craftsmanName: string;
}

const INITIAL_LOGBOOK_SHIFTS: LogbookShift[] = [
  {
    id: 'shift-1',
    weekNumber: 1,
    titleAr: 'فحص ومعايرة محولات العكس الشمسية (Inverters)',
    titleEn: 'Solar Inverter Inspection & Calibration',
    date: '2026-11-05',
    hoursCompleted: 24,
    skillsPracticedAr: ['فحص جهد الخرج', 'اختبار دوائر الحماية', 'قياس الكفاءة اليومية'],
    skillsPracticedEn: ['Output voltage testing', 'Protection circuit check', 'Daily efficiency measurement'],
    craftsmanNotesAr: 'أداء ممتاز ودقة عالية في تتبع أعطال التوصيل.',
    craftsmanNotesEn: 'Excellent performance and high precision in fault tracing.',
    status: 'verified',
    craftsmanName: 'م. حسام الدين (تحالف بنبان)',
  },
  {
    id: 'shift-2',
    weekNumber: 2,
    titleAr: 'صيانة وقائية لألواح الخلايا الكهروضوئية',
    titleEn: 'Preventive Maintenance of PV Arrays',
    date: '2026-11-12',
    hoursCompleted: 28,
    skillsPracticedAr: ['إزالة الأتربة الحرارية', 'فحص الوصلات السلكية', 'قياس الحرارة بالأشعة'],
    skillsPracticedEn: ['Thermal dust cleaning', 'Wiring harness inspection', 'Infrared thermal scanning'],
    craftsmanNotesAr: 'التزم بإجراءات الأمان الصناعي بدقة تامة.',
    craftsmanNotesEn: 'Strictly adhered to industrial safety protocols.',
    status: 'verified',
    craftsmanName: 'م. حسام الدين (تحالف بنبان)',
  },
  {
    id: 'shift-3',
    weekNumber: 3,
    titleAr: 'مراقبة محطات التتبع الرقمية وتيليمتري المحطة',
    titleEn: 'Digital Tracking & Telemetry Station Monitoring',
    date: '2026-11-19',
    hoursCompleted: 25,
    skillsPracticedAr: ['قراءة بيانات الـ SCADA', 'تحليل تنبيهات الأعطال', 'تسجيل التقارير'],
    skillsPracticedEn: ['SCADA data reading', 'Fault alert analysis', 'Log report generation'],
    craftsmanNotesAr: 'قيد المراجعة النهائية والتوقيع الميداني.',
    craftsmanNotesEn: 'Pending final review and field sign-off.',
    status: 'pending',
    craftsmanName: 'م. حسام الدين (تحالف بنبان)',
  },
];

interface WorkshopLogbookProps {
  language: Language;
  isDark?: boolean;
  onClose?: () => void;
}

/**
 * Screen Feature: Dual-Learning Workshop Logbook ("سجل التدريب الميداني المزدوج")
 * Tracks practical workshop shifts, hours completed, skills practiced, and craftsman sign-offs
 * fulfilling the VET dual-system dual-learning mandate.
 */
export const WorkshopLogbook: React.FC<WorkshopLogbookProps> = ({ language, onClose }) => {
  const isAr = language === 'ar';
  const [shifts] = useState<LogbookShift[]>(INITIAL_LOGBOOK_SHIFTS);

  const totalHours = shifts.reduce((acc, s) => acc + s.hoursCompleted, 0);
  const verifiedShifts = shifts.filter(s => s.status === 'verified').length;

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#0D4A38]/15 text-[#0D4A38] dark:bg-white/10 dark:text-emerald-300">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-black" style={{ color: 'var(--theme-primary)' }}>
              {isAr ? 'سجل التدريب الميداني المزدوج' : 'Dual-Learning Workshop Logbook'}
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[var(--theme-border)] text-[var(--theme-text-muted)] cursor-pointer"
              aria-label={isAr ? 'إغلاق السجل' : 'Close Logbook'}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className="text-xs text-[var(--theme-text-muted)] mt-1">
          {isAr
            ? 'متابعة الساعات العملية الميدانية وتوقيعات الحرفيين والمشرفين المعتمدين.'
            : 'Track practical workshop hours, skill check-offs, and certified mentor verifications.'}
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="p-3.5 rounded-2xl border shadow-xs space-y-1"
          style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--theme-text-muted)]">
            <Clock className="w-4 h-4 text-[#C8963E]" />
            <span>{isAr ? 'إجمالي الساعات العملية' : 'Practical Hours'}</span>
          </div>
          <div className="flex items-baseline gap-1 font-mono font-black text-xl text-[var(--theme-text)]">
            <span>{totalHours}</span>
            <span className="text-xs font-sans text-[var(--theme-text-muted)]">{isAr ? 'ساعة' : 'hrs'}</span>
          </div>
        </div>

        <div
          className="p-3.5 rounded-2xl border shadow-xs space-y-1"
          style={{
            backgroundColor: 'var(--theme-surface)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--theme-text-muted)]">
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'الورش المعتمدة' : 'Verified Shifts'}</span>
          </div>
          <div className="flex items-baseline gap-1 font-mono font-black text-xl text-[var(--theme-text)]">
            <span>{verifiedShifts}</span>
            <span className="text-xs font-sans text-[var(--theme-text-muted)]">/ {shifts.length}</span>
          </div>
        </div>
      </div>

      {/* Shift Logs List */}
      <div className="space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-[var(--theme-text-muted)]">
          {isAr ? 'سجل الأسابيع والورش' : 'Weekly Workshop Shifts'}
        </h3>

        <div className="space-y-3">
          {shifts.map((shift) => {
            const isVerified = shift.status === 'verified';

            return (
              <div
                key={shift.id}
                className="p-4 rounded-2xl border shadow-xs space-y-3 transition-all"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: isVerified ? 'var(--theme-border)' : '#C8963E',
                }}
              >
                {/* Header: Week number & Status chip */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-black px-2.5 py-0.5 rounded-md bg-[#0D4A38]/10 text-[#0D4A38] dark:bg-white/10 dark:text-emerald-300">
                      {isAr ? `الأسبوع ${shift.weekNumber}` : `Week ${shift.weekNumber}`}
                    </span>
                    <span className="text-xs text-[var(--theme-text-muted)] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {shift.date}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isVerified
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                        : 'bg-[#C8963E]/20 text-[#C8963E] dark:text-[#E0B86A] border border-[#C8963E]/40'
                    }`}
                  >
                    {isVerified ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3 animate-pulse" />}
                    <span>{isAr ? (isVerified ? 'معتمد' : 'قيد المراجعة') : (isVerified ? 'Verified' : 'Pending')}</span>
                  </span>
                </div>

                {/* Title and Hours */}
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-[var(--theme-text)]">
                    {isAr ? shift.titleAr : shift.titleEn}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-text-muted)]">
                    <span>{shift.hoursCompleted} {isAr ? 'ساعة تدريبية' : 'training hours'}</span>
                    <span>•</span>
                    <span>{shift.craftsmanName}</span>
                  </div>
                </div>

                {/* Skills practiced */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-[var(--theme-text-muted)] block">
                    {isAr ? 'المهارات الممارسة:' : 'Skills Practiced:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(isAr ? shift.skillsPracticedAr : shift.skillsPracticedEn).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-[var(--theme-bg)] text-[var(--theme-text)] border border-[var(--theme-border)] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mentor Note */}
                <div className="p-2.5 rounded-xl bg-[#0D4A38]/5 dark:bg-white/5 border border-[var(--theme-border)] text-xs space-y-1">
                  <div className="flex items-center gap-1 font-bold text-[var(--theme-primary)]">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تقييم المشرف الميداني:' : 'Mentor Evaluation:'}</span>
                  </div>
                  <p className="text-[var(--theme-text-muted)] italic leading-relaxed">
                    "{isAr ? shift.craftsmanNotesAr : shift.craftsmanNotesEn}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
