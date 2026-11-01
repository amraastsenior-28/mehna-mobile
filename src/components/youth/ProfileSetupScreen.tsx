import React, { useState } from 'react';
import type { Language } from '../Navbar';
import { Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface ProfileSetupScreenProps {
  language: Language;
  onComplete: (data: { track: string; skills: string[]; location: string }) => void;
  onSkip: () => void;
}

/**
 * Screen 5: Guided Profile Setup (Checklist, 3 Steps Max, Skippable)
 * Implements Section 7 & 8 of MEHNA UI Spec v2:
 * - 3 guided actionable steps (Track -> Skills -> Location)
 * - Explicitly replaces empty profile section cards
 * - No AI-written text shortcuts
 * - Full skippability
 */
export const ProfileSetupScreen: React.FC<ProfileSetupScreenProps> = ({
  language,
  onComplete,
  onSkip,
}) => {
  const isAr = language === 'ar';
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Selections
  const [selectedTrack, setSelectedTrack] = useState<string>('الطاقة المتجددة');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'فحص وصيانة الألواح الكهروضوئية',
    'السلامة والصحة المهنية',
  ]);
  const [selectedLocation, setSelectedLocation] = useState<string>('مجمع بنبان للطاقة الشمسية');

  const tracks = [
    {
      id: 'الطاقة المتجددة',
      titleAr: 'تكنولوجيا الطاقة الشمسية والمتجددة',
      titleEn: 'Solar & Renewable Energy Tech',
      descAr: 'محطات بنبان، الشبكات الذكية، والتحويل الكهروضوئي',
      descEn: 'Benban plants, smart grids, and PV conversion',
    },
    {
      id: 'السياحة البيئية',
      titleAr: 'السياحة البيئية والضيافة المستدامة',
      titleEn: 'Eco-Tourism & Green Hospitality',
      descAr: 'النزل البيئية، الإرشاد الثقافي والجيولوجي بأسوان',
      descEn: 'Eco-lodges, cultural & geological guidance',
    },
    {
      id: 'الحرف التراثية',
      titleAr: 'الصناعات الإبداعية والتراث النوبي',
      titleEn: 'Creative Industries & Nubian Crafts',
      descAr: 'الخزف، الغزل التقليدي، وتطوير المنتجات النوبية',
      descEn: 'Ceramics, traditional weaving, Nubian craft design',
    },
    {
      id: 'الزراعة المستدامة',
      titleAr: 'الزراعة الذكية وتدوير المخلفات',
      titleEn: 'Smart Agri & Waste Upcycling',
      descAr: 'محاصيل أسوان، الري الحديث وتدوير مخلفات النخيل',
      descEn: 'Aswan crops, modern irrigation, date-palm upcycling',
    },
  ];

  const availableSkills = [
    'فحص وصيانة الألواح الكهروضوئية',
    'السلامة والصحة المهنية (HSE)',
    'تشغيل أجهزة القياس والفحص الكهروحراري',
    'الإرشاد البيئي والتواصل التفاعلي',
    'ضبط جودة المنتجات الحرفية والتعبئة',
    'إدارة شبكات الري بالتنقيط والحساسات',
  ];

  const locations = [
    { id: 'مجمع بنبان للطاقة الشمسية', titleAr: 'مجمع بنبان للطاقة الشمسية (دراو)', titleEn: 'Benban Solar Park (Daraw)' },
    { id: 'مدينة أسوان وجزر الشلال', titleAr: 'مدينة أسوان ومنطقة الشلال', titleEn: 'Aswan City & Shallal' },
    { id: 'كوم أمبو ونصر النوبة', titleAr: 'مركز كوم أمبو ونصر النوبة', titleEn: 'Kom Ombo & Nasr El Nuba' },
    { id: 'إدفو وغرب النيل', titleAr: 'مركز إدفو وغرب النيل', titleEn: 'Edfu & West Nile' },
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(3);
    else {
      onComplete({
        track: selectedTrack,
        skills: selectedSkills,
        location: selectedLocation,
      });
    }
  };

  const handleBack = () => {
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-between p-6 overflow-y-auto selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      <div>
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                aria-label={isAr ? 'الخطوة السابقة' : 'Previous step'}
                className="p-1.5 rounded-xl border transition-colors cursor-pointer"
                style={{
                  borderColor: 'var(--theme-border)',
                  backgroundColor: 'var(--theme-surface)',
                  color: 'var(--theme-text)',
                }}
              >
                {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </button>
            )}
            <span className="text-xs font-bold text-[var(--theme-accent)]">
              {isAr ? `خطوة ${currentStep} من 3` : `Step ${currentStep} of 3`}
            </span>
          </div>

          <button
            onClick={onSkip}
            className="text-xs font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-text)] transition-colors cursor-pointer"
          >
            {isAr ? 'تخطي الآن' : 'Skip for now'}
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[var(--theme-border)] mb-6 overflow-hidden">
          <div
            className="h-full bg-[var(--theme-accent)] transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        {/* Step 1: Select Certified Track */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--theme-primary)' }}>
              {isAr ? 'ما هو مسارك الفني المعتمد؟' : 'Choose Your VET Pathway'}
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)] mb-5">
              {isAr
                ? 'حدد تخصصك أو مجال دراستك في التعليم والتدريب المزدوج بأسوان.'
                : 'Select your certified specialization in Aswan Dual VET.'}
            </p>

            <div className="space-y-3">
              {tracks.map((t) => {
                const isSelected = selectedTrack === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrack(t.id)}
                    className="w-full text-start p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 shadow-xs"
                    style={{
                      backgroundColor: isSelected ? 'var(--theme-surface)' : 'var(--theme-surface)',
                      borderColor: isSelected ? 'var(--theme-accent)' : 'var(--theme-border)',
                      boxShadow: isSelected ? '0 0 0 1.5px var(--theme-accent)' : undefined,
                    }}
                  >
                    <div>
                      <h3 className="font-bold text-sm text-[var(--theme-text)] mb-0.5">
                        {isAr ? t.titleAr : t.titleEn}
                      </h3>
                      <p className="text-xs text-[var(--theme-text-muted)]">
                        {isAr ? t.descAr : t.descEn}
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                        isSelected
                          ? 'bg-[var(--theme-accent)] text-white border-transparent'
                          : 'border-[var(--theme-border)]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Practical Skills */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--theme-primary)' }}>
              {isAr ? 'مهاراتك العملية المكتسبة' : 'Your Practical Competencies'}
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)] mb-5">
              {isAr
                ? 'اختر المهارات التي تدربت عليها للمساعدة في رفع نسبة مطابقة الفرص.'
                : 'Select skills you acquired to boost your matching fit score.'}
            </p>

            <div className="space-y-2.5">
              {availableSkills.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className="w-full text-start p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs"
                    style={{
                      backgroundColor: 'var(--theme-surface)',
                      borderColor: isSelected ? 'var(--theme-accent)' : 'var(--theme-border)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles
                        className={`w-4 h-4 ${
                          isSelected ? 'text-[var(--theme-accent)]' : 'text-[var(--theme-text-muted)]'
                        }`}
                      />
                      <span className="text-xs font-bold text-[var(--theme-text)]">{skill}</span>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[var(--theme-accent)] text-white border-transparent'
                          : 'border-[var(--theme-border)]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Location Preference */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--theme-primary)' }}>
              {isAr ? 'نطاق العمل المفضّل بأسوان' : 'Preferred Working Zone'}
            </h2>
            <p className="text-sm text-[var(--theme-text-muted)] mb-5">
              {isAr
                ? 'أين تفضل الالتحاق بفرص التدريب العملي والميداني؟'
                : 'Where do you prefer attending on-site dual learning?'}
            </p>

            <div className="space-y-3">
              {locations.map((loc) => {
                const isSelected = selectedLocation === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className="w-full text-start p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs"
                    style={{
                      backgroundColor: 'var(--theme-surface)',
                      borderColor: isSelected ? 'var(--theme-accent)' : 'var(--theme-border)',
                      boxShadow: isSelected ? '0 0 0 1.5px var(--theme-accent)' : undefined,
                    }}
                  >
                    <span className="font-bold text-sm text-[var(--theme-text)]">
                      {isAr ? loc.titleAr : loc.titleEn}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[var(--theme-accent)] text-white border-transparent'
                          : 'border-[var(--theme-border)]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-6 pb-2">
        <button
          onClick={handleNext}
          className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer shadow-md"
          style={{
            backgroundColor: 'var(--theme-primary)',
            color: 'var(--theme-on-primary)',
          }}
        >
          <span>
            {currentStep === 3
              ? isAr
                ? 'إتمام التجهيز واستعراض الفرص'
                : 'Finish & View Opportunities'
              : isAr
              ? 'متابعة الخطوة التالية'
              : 'Next Step'}
          </span>
        </button>
      </div>
    </div>
  );
};
