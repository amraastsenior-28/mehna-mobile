import React, { useState } from 'react';
import type { WBLOpportunity, StipendEntry } from '../data/mockData';
import {
  YOUTH_PROFILE_DATA,
  INITIAL_WBL_OPPORTUNITIES,
  INITIAL_STIPENDS,
  STIPEND_CONFIG,
} from '../data/mockData';
import type { MatchingWeights } from '../utils/matchingEngine';
import { calculateSkillMatchScore } from '../utils/matchingEngine';
import type { Language } from './Navbar';
import {
  MapPin,
  Coins,
  Check,
  Sparkles,
  Briefcase,
  Wifi,
  Battery,
  Signal,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface YouthPortalProps {
  language: Language;
  matchingWeights: MatchingWeights;
}

export const YouthPortal: React.FC<YouthPortalProps> = ({ language, matchingWeights }) => {
  const isAr = language === 'ar';
  const [opportunities, setOpportunities] = useState<WBLOpportunity[]>(INITIAL_WBL_OPPORTUNITIES);
  const [stipends] = useState<StipendEntry[]>(INITIAL_STIPENDS);
  const [activeSubTab, setActiveSubTab] = useState<'opportunities' | 'stipends'>('opportunities');

  // Handle one-tap apply
  const handleApply = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, isApplied: !opp.isApplied } : opp))
    );
  };

  // Prepare radar chart data with generous outer padding so labels never clip
  const radarData = [
    {
      subject: isAr ? 'المعرفة (K)' : 'Knowledge (K)',
      value: YOUTH_PROFILE_DATA.ksao.knowledge,
      fullMark: 100,
    },
    {
      subject: isAr ? 'المهارات (S)' : 'Skills (S)',
      value: YOUTH_PROFILE_DATA.ksao.practicalSkills,
      fullMark: 100,
    },
    {
      subject: isAr ? 'القدرات (A)' : 'Abilities (A)',
      value: YOUTH_PROFILE_DATA.ksao.abilities,
      fullMark: 100,
    },
    {
      subject: isAr ? 'السياقية (O)' : 'Context (O)',
      value: YOUTH_PROFILE_DATA.ksao.contextual,
      fullMark: 100,
    },
  ];

  return (
    <div className="w-full flex justify-center items-center py-2 sm:py-6">
      {/* 
        Smartphone Component Frame with Hover and Press Animation
      */}
      <div
        className="w-full max-w-[395px] h-[780px] max-h-[86vh] max-[430px]:max-w-none max-[430px]:h-auto max-[430px]:max-h-none max-[430px]:rounded-none max-[430px]:p-0 max-[430px]:border-0 max-[430px]:shadow-none bg-[#111111] p-[10px] rounded-[48px] border-[2.5px] border-[#222825] flex flex-col phone-frame-motion"
      >
        {/* Inner Phone Screen Container */}
        <div className="relative w-full h-full bg-[#F4F0E6] rounded-[38px] max-[430px]:rounded-none overflow-hidden flex flex-col">
          
          {/* Status Bar with Dynamic Island (Western Numerals 9:41, Signal & Battery) */}
          <div
            className="w-full bg-[#0E3B33] text-white px-5 pt-3 pb-1.5 flex items-center justify-between z-30 select-none shrink-0 max-[430px]:hidden"
            dir="ltr"
          >
            {/* Clock in Western Numerals */}
            <span className="text-[12px] font-semibold tracking-tight font-sans text-white/95">
              9:41
            </span>

            {/* Subtle Dynamic Island */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800"></div>
            </div>

            {/* System Status Icons */}
            <div className="flex items-center gap-1.5 text-white/90">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Internally Scrollable Youth Portal Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Mobile Top App Header */}
            <div className="bg-[#0E3B33] text-white p-5 space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#C4824A] text-white flex items-center justify-center font-bold text-base shadow-md border-2 border-white/40 shrink-0">
                    {isAr ? 'ي' : 'Y'}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-tight">
                      {isAr ? YOUTH_PROFILE_DATA.nameAr : YOUTH_PROFILE_DATA.nameEn}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#F4F0E6]/80 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#C4824A] shrink-0" />
                      <span>{isAr ? YOUTH_PROFILE_DATA.locationAr : YOUTH_PROFILE_DATA.locationEn}</span>
                      <span>•</span>
                      <span>{YOUTH_PROFILE_DATA.age} {isAr ? 'سنة' : 'yrs'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-end shrink-0">
                  <span className="text-[9px] uppercase font-bold text-[#D99B68] block">
                    {isAr ? 'الملف الشخصي' : 'Profile'}
                  </span>
                  <span className="text-sm font-black text-white">{YOUTH_PROFILE_DATA.completionRate}%</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 text-[11px] text-[#F4F0E6]/90 border border-white/10">
                <span className="font-semibold text-[#D99B68] block mb-0.5">
                  {isAr ? 'المسار التدريبي المعتمد:' : 'Certified VET Pathway:'}
                </span>
                <span>{isAr ? YOUTH_PROFILE_DATA.trackAr : YOUTH_PROFILE_DATA.trackEn}</span>
              </div>
            </div>

            {/* Sub Navigation Bar inside phone */}
            <div className="sticky top-0 z-20 flex border-b border-[#0E3B33]/10 bg-[#F4F0E6]/95 backdrop-blur-sm shadow-xs">
              <button
                onClick={() => setActiveSubTab('opportunities')}
                className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeSubTab === 'opportunities'
                    ? 'border-[#C4824A] text-[#0E3B33] bg-white font-black'
                    : 'border-transparent text-[#0E3B33]/60 hover:text-[#0E3B33]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-[#C4824A]" />
                <span>{isAr ? 'فرص أسوان (6)' : 'Aswan WBL (6)'}</span>
              </button>
              <button
                onClick={() => setActiveSubTab('stipends')}
                className={`flex-1 py-2.5 text-xs font-bold text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  activeSubTab === 'stipends'
                    ? 'border-[#C4824A] text-[#0E3B33] bg-white font-black'
                    : 'border-transparent text-[#0E3B33]/60 hover:text-[#0E3B33]'
                }`}
              >
                <Coins className="w-3.5 h-3.5 text-[#C4824A]" />
                <span>{isAr ? 'المكافأة الشهرية' : 'Stipends'}</span>
              </button>
            </div>

            {/* Phone Scroll Content Body */}
            <div className="p-4 space-y-4">
              {/* KSAO Radar Chart Card with extra label padding (Step 4 Fix) */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C4824A]" />
                    <h4 className="font-bold text-xs text-[#0E3B33] font-arabic">
                      {isAr ? 'مخطط كفاءات KSAO (ديسلر)' : 'KSAO Competency Radar'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold text-[#C4824A] bg-[#F4F0E6] px-2 py-0.5 rounded-md border border-[#C4824A]/30">
                    {isAr ? 'تقييم موثق' : 'Verified'}
                  </span>
                </div>

                {/* Radar Chart with Calibrated Padding */}
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="58%" margin={{ top: 12, right: 28, bottom: 12, left: 28 }} data={radarData}>
                      <PolarGrid stroke="#0E3B33" strokeOpacity={0.15} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#0E3B33', fontSize: 9, fontWeight: 700 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Youssef KSAO"
                        dataKey="value"
                        stroke="#C4824A"
                        fill="#C4824A"
                        fillOpacity={0.45}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-[#0E3B33]/10 text-center text-[9px]">
                  <div className="bg-[#F4F0E6]/80 p-1 rounded-md">
                    <span className="block text-gray-500">{isAr ? 'معرفة' : 'Know.'}</span>
                    <span className="font-bold text-[#0E3B33]">{YOUTH_PROFILE_DATA.ksao.knowledge}%</span>
                  </div>
                  <div className="bg-[#F4F0E6]/80 p-1 rounded-md">
                    <span className="block text-gray-500">{isAr ? 'مهارات' : 'Skills'}</span>
                    <span className="font-bold text-[#0E3B33]">{YOUTH_PROFILE_DATA.ksao.practicalSkills}%</span>
                  </div>
                  <div className="bg-[#F4F0E6]/80 p-1 rounded-md">
                    <span className="block text-gray-500">{isAr ? 'قدرات' : 'Abil.'}</span>
                    <span className="font-bold text-[#0E3B33]">{YOUTH_PROFILE_DATA.ksao.abilities}%</span>
                  </div>
                  <div className="bg-[#F4F0E6]/80 p-1 rounded-md">
                    <span className="block text-gray-500">{isAr ? 'سياق' : 'Context'}</span>
                    <span className="font-bold text-[#0E3B33]">{YOUTH_PROFILE_DATA.ksao.contextual}%</span>
                  </div>
                </div>
              </div>

              {/* Sub-tab 1: Opportunities List */}
              {activeSubTab === 'opportunities' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <h4 className="font-bold text-[#0E3B33]">
                      {isAr ? 'الفرص المتوافقة معك بأسوان:' : 'Matched Opportunities:'}
                    </h4>
                    <span className="text-[10px] text-gray-500">
                      {isAr ? 'مرتبة بالتطابق' : 'By Fit Score'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {opportunities.map((opp) => {
                      const matchScore = calculateSkillMatchScore(opp.candidateKSAO, matchingWeights);

                      return (
                        <div
                          key={opp.id}
                          className={`p-3.5 rounded-2xl border transition-all shadow-card shadow-card-hover ${
                            opp.isApplied
                              ? 'bg-emerald-50/80 border-emerald-300'
                              : 'bg-white border-[#0E3B33]/10 hover:border-[#C4824A]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#0E3B33]/10 text-[#0E3B33]">
                                {isAr ? opp.sectorAr : opp.sectorEn}
                              </span>
                              <h5 className="font-bold text-xs text-[#0E3B33] leading-snug">
                                {isAr ? opp.titleAr : opp.titleEn}
                              </h5>
                              <p className="text-[11px] text-[#C4824A] font-semibold">
                                {isAr ? opp.employerAr : opp.employerEn}
                              </p>
                            </div>

                            {/* Match Score Badge */}
                            <div className="text-center p-1.5 rounded-xl bg-[#0E3B33] text-white min-w-[50px] shadow-sm shrink-0">
                              <span className="block text-sm font-black leading-none text-[#D99B68]">
                                {matchScore}%
                              </span>
                              <span className="text-[8px] uppercase font-bold text-white/80 block mt-0.5">
                                {isAr ? 'تطابق' : 'Fit'}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-gray-600 line-clamp-2 my-2">
                            {isAr ? opp.descriptionAr : opp.descriptionEn}
                          </p>

                          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-[#0E3B33]/5 gap-2">
                            <div className="space-y-0.5 min-w-0">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#C4824A] shrink-0" />
                                <span className="truncate max-w-[120px]">{isAr ? opp.locationAr : opp.locationEn}</span>
                              </div>
                              <div className="flex items-center gap-1.5 font-bold text-[#0E3B33]">
                                <Coins className="w-3 h-3 text-[#C4824A] shrink-0" />
                                <span>{opp.stipend} {isAr ? 'ج.م' : 'EGP'}</span>
                                {/* Step 4: Illustrative Data Badge */}
                                <span className="text-[8px] px-1.5 py-0.2 rounded bg-[#C4824A]/15 text-[#C4824A] font-medium whitespace-nowrap">
                                  {isAr ? STIPEND_CONFIG.illustrativeLabelAr : STIPEND_CONFIG.illustrativeLabelEn}
                                </span>
                              </div>
                            </div>

                            {/* Step 4: Wide, Non-wrapping Apply Button */}
                            <button
                              onClick={() => handleApply(opp.id)}
                              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer shrink-0 whitespace-nowrap min-w-[76px] ${
                                opp.isApplied
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  : 'bg-[#C4824A] text-white hover:bg-[#9F6231]'
                              }`}
                            >
                              {opp.isApplied ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>{isAr ? 'تم التقديم' : 'Applied'}</span>
                                </>
                              ) : (
                                <span>{isAr ? 'تقديم فوري' : 'Apply Now'}</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Stipend Tracker */}
              {activeSubTab === 'stipends' && (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0E3B33] to-[#185247] text-white space-y-1 shadow-card">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#D99B68] font-bold block">
                        {isAr ? 'إجمالي المبالغ المنصرفة الموثقة' : 'Verified Cumulative Earnings'}
                      </span>
                      {/* Step 4: Illustrative Badge */}
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/20 text-white font-medium">
                        {isAr ? STIPEND_CONFIG.illustrativeLabelAr : STIPEND_CONFIG.illustrativeLabelEn}
                      </span>
                    </div>
                    <div className="text-xl font-black">
                      {STIPEND_CONFIG.cumulativeVerifiedTotal.toLocaleString()} <span className="text-xs font-normal">{isAr ? 'ج.م' : 'EGP'}</span>
                    </div>
                    <p className="text-[10px] text-[#F4F0E6]/75">
                      {isAr
                        ? 'تصرف شهرياً عبر منظومة الدفع الوطنية (ميزة / البريد المصري).'
                        : 'Disbursed monthly via national Meeza / Egypt Post rails.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {stipends.map((stipend) => {
                      const isPaid = stipend.statusEn === 'Paid';
                      const isProcessing = stipend.statusEn === 'Processing';

                      return (
                        <div
                          key={stipend.id}
                          className="p-3 rounded-xl bg-white border border-[#0E3B33]/10 flex items-center justify-between shadow-card"
                        >
                          <div className="space-y-0.5">
                            <span className="font-bold text-xs text-[#0E3B33] block">
                              {isAr ? stipend.monthAr : stipend.monthEn}
                            </span>
                            <span className="text-[9px] text-gray-500 font-mono">
                              {stipend.referenceId}
                            </span>
                          </div>

                          <div className="text-end space-y-0.5">
                            <div className="flex items-center justify-end gap-1">
                              <span className="font-extrabold text-xs text-[#0E3B33] block">
                                {stipend.amount} {isAr ? 'ج.م' : 'EGP'}
                              </span>
                              <span className="text-[7.5px] px-1 py-0.2 rounded bg-[#C4824A]/15 text-[#C4824A] font-medium">
                                {isAr ? STIPEND_CONFIG.illustrativeLabelAr : 'Illustrative'}
                              </span>
                            </div>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                isPaid
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : isProcessing
                                  ? 'bg-amber-100 text-amber-800 animate-pulse'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {isAr ? stipend.statusAr : stipend.statusEn}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Home Indicator Bar on Phone */}
          <div className="w-full bg-[#F4F0E6] py-1.5 flex justify-center items-center shrink-0 border-t border-[#0E3B33]/5 max-[430px]:hidden">
            <div className="w-32 h-1 bg-neutral-400/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
