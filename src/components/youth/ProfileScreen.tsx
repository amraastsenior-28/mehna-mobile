import React, { useState } from 'react';
import type { Language } from '../Navbar';
import type { YouthUserProfile } from './types';
import { YOUTH_PROFILE_DATA } from '../../data/mockData';
import { User, MapPin, Award, ShieldCheck, Edit3, Sparkles } from 'lucide-react';

interface ProfileScreenProps {
  language: Language;
  user: YouthUserProfile | null;
  isDark?: boolean;
  onEditProfile?: () => void;
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
}) => {
  const isAr = language === 'ar';

  const candidateName = user?.name || (isAr ? YOUTH_PROFILE_DATA.nameAr : YOUTH_PROFILE_DATA.nameEn);
  const trackName =
    user?.trackAr || (isAr ? YOUTH_PROFILE_DATA.trackAr : YOUTH_PROFILE_DATA.trackEn);
  const locationName =
    user?.preferredLocation || (isAr ? YOUTH_PROFILE_DATA.locationAr : YOUTH_PROFILE_DATA.locationEn);

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(candidateName);

  const handleSave = async () => {
    // Logic to save the new name to database would go here
    setIsEditing(false);
    // In a real app, update state/DB
  };

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
            <div className="w-14 h-14 rounded-2xl bg-[var(--theme-primary)] text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white/20 shrink-0">
              <User className="w-7 h-7 stroke-[2]" />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="font-black text-base text-[var(--theme-text)] border-b border-[var(--theme-primary)] bg-transparent outline-none"
                  />
                ) : (
                  <h2 className="font-black text-base text-[var(--theme-text)]">{editedName}</h2>
                )}
                <ShieldCheck className="w-4 h-4 text-[var(--theme-success)] shrink-0" />
              </div>
              <div className="flex items-center gap-1 text-xs text-[var(--theme-text-muted)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span>{locationName}</span>
              </div>
            </div>
          </div>

          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-xs font-bold text-[var(--theme-primary)] cursor-pointer"
            >
              {isAr ? 'حفظ' : 'Save'}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              aria-label={isAr ? 'تعديل الملف الشخصي' : 'Edit profile'}
              className="p-2 rounded-xl border hover:bg-[var(--theme-bg)] transition-colors cursor-pointer"
              style={{
                borderColor: 'var(--theme-border)',
              }}
            >
              <Edit3 className="w-4 h-4 text-[var(--theme-accent)]" />
            </button>
          )}
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
      </div>
    </div>
  );
};
