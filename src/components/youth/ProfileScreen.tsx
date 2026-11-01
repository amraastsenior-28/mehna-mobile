import React from 'react';
import type { Language } from '../Navbar';
import type { YouthUserProfile } from './types';
import { YOUTH_PROFILE_DATA } from '../../data/mockData';
import { User, MapPin, Award, ShieldCheck, Edit3, Sparkles } from 'lucide-react';

interface ProfileScreenProps {
  language: Language;
  user: YouthUserProfile | null;
  isDark?: boolean;
  onEditProfile: () => void;
}

/**
 * Screen 11: Candidate Profile Screen
 * Implements Section 7 & 8 of MEHNA UI Spec v2:
 * - Candidate name, contact, verified Dual VET pathway
 * - KSAO 4-factor competency bars:
 *   1. المعرفة (Knowledge)
 *   2. المهارات العملية (Practical Skills)
 *   3. القدرات (Abilities)
 *   4. السياق الميداني (Context)
 * - NO empty section cards
 * - NO 'Only companies can see this section' label
 */
export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  language,
  user,
  onEditProfile,
}) => {
  const isAr = language === 'ar';

  const candidateName = user?.name || (isAr ? YOUTH_PROFILE_DATA.nameAr : YOUTH_PROFILE_DATA.nameEn);
  const trackName =
    user?.trackAr || (isAr ? YOUTH_PROFILE_DATA.trackAr : YOUTH_PROFILE_DATA.trackEn);
  const locationName =
    user?.preferredLocation || (isAr ? YOUTH_PROFILE_DATA.locationAr : YOUTH_PROFILE_DATA.locationEn);

  // KSAO Competency Breakdown (Dessler Framework)
  const ksaoFactors = [
    {
      id: 'knowledge',
      titleAr: 'المعرفة النظرية (Knowledge)',
      titleEn: 'Theoretical Knowledge (K)',
      value: YOUTH_PROFILE_DATA.ksao.knowledge,
      descAr: 'المفاهيم الهندسية، قوانين الدوائر الكهربائية ومعايير الألواح',
      descEn: 'Engineering concepts, electric circuit principles, and PV panel standards',
    },
    {
      id: 'practicalSkills',
      titleAr: 'المهارات العملية (Skills)',
      titleEn: 'Practical Skills (S)',
      value: YOUTH_PROFILE_DATA.ksao.practicalSkills,
      descAr: 'التركيب الميكانيكي، التوصيل، فحص العوازل والصيانة الدورية',
      descEn: 'Mechanical mounting, wiring, insulation testing, and routine maintenance',
    },
    {
      id: 'abilities',
      titleAr: 'القدرات التحليلية (Abilities)',
      titleEn: 'Analytical Abilities (A)',
      value: YOUTH_PROFILE_DATA.ksao.abilities,
      descAr: 'اكتشاف الأعطال وحل المشكلات الفنية تحت ضغط العمل',
      descEn: 'Fault detection and technical troubleshooting under active site conditions',
    },
    {
      id: 'contextual',
      titleAr: 'السياق الميداني (Context)',
      titleEn: 'Field Context (O)',
      value: YOUTH_PROFILE_DATA.ksao.contextual,
      descAr: 'التكيف مع طبيعة مناخ أسوان والالتزام الصارم بقواعد السلامة (HSE)',
      descEn: 'Adaptation to Aswan site climate and strict HSE safety compliance',
    },
  ];

  return (
    <div
      className="w-full h-full flex flex-col overflow-y-auto p-4 space-y-4 pb-20 selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {/* Profile Header Card */}
      <div
        className="p-5 rounded-3xl border shadow-card"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            {/* Avatar circle */}
            <div className="w-14 h-14 rounded-2xl bg-[var(--theme-primary)] text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white/20 shrink-0">
              <User className="w-7 h-7 stroke-[2]" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-base text-[var(--theme-text)]">{candidateName}</h2>
                <ShieldCheck className="w-4 h-4 text-[var(--theme-success)] shrink-0" />
              </div>
              <div className="flex items-center gap-1 text-xs text-[var(--theme-text-muted)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>{locationName}</span>
              </div>
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-[var(--theme-success)]">
                {user?.isUnder18
                  ? user?.parentConsentGiven
                    ? isAr
                      ? 'موافقة ولي الأمر معتمدة'
                      : 'Guardian Consent Verified'
                    : isAr
                    ? 'بانتظار موافقة ولي الأمر'
                    : 'Pending Guardian Consent'
                  : isAr
                  ? 'متدرب مستقل معتمد'
                  : 'Independent Candidate'}
              </span>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            aria-label={isAr ? 'تعديل الملف الشخصي' : 'Edit profile'}
            className="p-2 rounded-xl border hover:bg-[var(--theme-bg)] transition-colors cursor-pointer"
            style={{
              borderColor: 'var(--theme-border)',
            }}
          >
            <Edit3 className="w-4 h-4 text-[var(--theme-accent)]" />
          </button>
        </div>

        {/* Certified VET Pathway badge */}
        <div className="mt-4 pt-3 border-t border-[var(--theme-border)]">
          <span className="text-[10px] uppercase font-bold text-[var(--theme-accent-ink)] block mb-1">
            {isAr ? 'المسار التدريبي المعتمد بأسوان:' : 'Certified VET Pathway:'}
          </span>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--theme-text)]">
            <Award className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
            <span>{trackName}</span>
          </div>
        </div>
      </div>

      {/* KSAO Competency 4-Factor Bars (Spec Section 7) */}
      <div
        className="p-4 rounded-3xl border space-y-4 shadow-xs"
        style={{
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
            <h3 className="font-black text-sm text-[var(--theme-text)]">
              {isAr ? 'كفاءات KSAO الموثقة (معيار ديسلر)' : 'KSAO Competency Matrix (Dessler)'}
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--theme-bg)] text-[var(--theme-accent-ink)]">
            {isAr ? 'تقييم معتمد' : 'Verified'}
          </span>
        </div>

        {/* 4 Factor Bars */}
        <div className="space-y-4">
          {ksaoFactors.map((f) => (
            <div key={f.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--theme-text)]">{isAr ? f.titleAr : f.titleEn}</span>
                <span className="font-black font-mono text-[var(--theme-accent-ink)]">{f.value}%</span>
              </div>

              {/* Progress track */}
              <div className="w-full h-2 rounded-full bg-[var(--theme-bg)] border border-[var(--theme-border)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${f.value}%`,
                    backgroundColor: 'var(--theme-primary)',
                  }}
                />
              </div>

              <p className="text-[10px] text-[var(--theme-text-muted)] leading-tight">{isAr ? f.descAr : f.descEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
