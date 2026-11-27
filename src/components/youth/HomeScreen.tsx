import React, { useState, useEffect } from 'react';
import type { WBLOpportunity } from '../../data/mockData';
import type { Language } from '../Navbar';
import { Search, MapPin, Building2, Coins, Check, ShieldCheck, Truck, AlertCircle, SlidersHorizontal } from 'lucide-react';
import { StaggeredList } from './StaggeredList';
import { OpportunityListSkeleton } from './ShimmerSkeleton';
import type { MatchingWeights } from '../../utils/matchingEngine';
import { calculateSkillMatchScore } from '../../utils/matchingEngine';

interface HomeScreenProps {
  opportunities: WBLOpportunity[];
  language: Language;
  matchingWeights: MatchingWeights;
  onSelectOpportunity: (opp: WBLOpportunity) => void;
  onQuickApply: (opp: WBLOpportunity) => void;
  isDark: boolean;
  userTrack?: string;
}

/**
 * Screen 6: Home / Opportunities Screen
 * Implements Section 4, 5, 7, 8 of MEHNA UI Spec v2:
 * - Search field + horizontal filter chips
 * - Shimmer skeleton on initial load / filter transition
 * - Staggered list entrance for top 8 cards with 40ms stagger
 * - Stipend in large numerals always visible on each card (never confidential)
 * - Match score badge in accent token
 * - Strictly NO urgency tags or purple gradients
 */
export const HomeScreen: React.FC<HomeScreenProps> = ({
  opportunities,
  language,
  matchingWeights,
  onSelectOpportunity,
  onQuickApply,
  isDark,
}) => {
  const isAr = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Interactive collapsible brand header state (Entry 014 - Step 3)
  const [isBrandHeaderVisible, setIsBrandHeaderVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // Trigger simulated loading skeleton on mount or sector change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedSector]);

  // Handle scroll to smoothly collapse/expand the top brand board
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY > 45 && currentScrollY > lastScrollY) {
      // User is actively scrolling down into content -> collapse brand board
      setIsBrandHeaderVisible(false);
    } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 15) {
      // User is scrolling up or at the very top -> restore brand board
      setIsBrandHeaderVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  const sectors = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All Sectors' },
    { id: 'طاقة متجددة', labelAr: 'طاقة متجددة', labelEn: 'Clean Energy' },
    { id: 'سياحة بيئية', labelAr: 'سياحة بيئية', labelEn: 'Eco-Tourism' },
    { id: 'حرف تراثية', labelAr: 'حرف تراثية', labelEn: 'Crafts' },
    { id: 'زراعة مستدامة', labelAr: 'زراعة مستدامة', labelEn: 'Smart Agri' },
  ];

  // Filter opportunities by search query and category
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSector =
      selectedSector === 'all' ||
      opp.sectorAr.includes(selectedSector) ||
      opp.sectorEn.toLowerCase().includes(selectedSector.toLowerCase());

    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesSector;

    const matchesSearch =
      opp.titleAr.toLowerCase().includes(query) ||
      opp.titleEn.toLowerCase().includes(query) ||
      opp.employerAr.toLowerCase().includes(query) ||
      opp.employerEn.toLowerCase().includes(query) ||
      opp.locationAr.toLowerCase().includes(query) ||
      opp.locationEn.toLowerCase().includes(query);

    return matchesSector && matchesSearch;
  });

  return (
    <div
      onScroll={handleScroll}
      className="w-full h-full flex flex-col overflow-y-auto selection:bg-[#C4824A] selection:text-white"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
      }}
    >
      {/* Sticky Search & Brand Header */}
      <div
        className="sticky top-0 z-30 px-4 pt-3 pb-2 border-b transition-colors mehna-glass-bar"
        style={{
          borderColor: 'var(--theme-border)',
        }}
      >
        {/* Interactive Collapsible Brand Board (Entry 014 - Step 3) */}
        <div
          className={`mehna-brand-header transition-all duration-300 ease-out overflow-hidden ${
            isBrandHeaderVisible ? 'max-h-24 opacity-100 mb-2.5' : 'max-h-0 opacity-0 mb-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2.5">
              <img
                src={`${import.meta.env.BASE_URL}brand/mehna-emblem.webp`}
                alt="MEHNA Emblem"
                className="w-8 h-8 rounded-xl object-contain border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-xs"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <div className="flex items-center gap-1.5">
                  {isAr ? (
                    <img
                      src={`${import.meta.env.BASE_URL}brand/mehna-wordmark-gold.webp`}
                      alt="مهنة"
                      className="h-5 w-auto object-contain"
                    />
                  ) : (
                    <span className="font-brand font-black text-lg tracking-wider text-[var(--theme-primary)] dark:text-[var(--theme-accent)]">
                      MEHNA
                    </span>
                  )}
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-[var(--theme-accent)]/15 text-[var(--theme-accent-ink)] border border-[var(--theme-accent)]/20">
                    {isAr ? 'أسوان' : 'Aswan'}
                  </span>
                </div>
                <p className="text-[10px] font-medium text-[var(--theme-text-muted)] line-clamp-1">
                  {isAr
                    ? 'ربط التعليم الفني بسوق العمل الحقيقي'
                    : 'Dual VET & Real Market Gateway'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] dark:text-[var(--theme-accent)] border border-[var(--theme-border)]">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              <span>{isAr ? 'منظومة معتمدة' : 'Accredited'}</span>
            </div>
          </div>
        </div>

        {/* Search input with 48px ergonomic touch height */}
        <div className="relative mb-2.5">
          <Search className="w-5 h-5 absolute top-1/2 -translate-y-1/2 start-3.5 text-[var(--theme-text-muted)] pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isAr
                ? 'ابحث بالمهنة، جهة العمل، أو الموقع بأسوان...'
                : 'Search opportunities, employers, or locations...'
            }
            className="w-full min-h-[46px] ps-11 pe-4 rounded-2xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all"
            style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)',
              color: 'var(--theme-text)',
            }}
          />
        </div>

        {/* Filter Chips Row (Top Quick View) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          {sectors.map((sec) => {
            const isSelected = selectedSector === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(sec.id)}
                className="px-3.5 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0"
                style={{
                  backgroundColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-surface)',
                  borderColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-border)',
                  color: isSelected ? 'var(--theme-on-primary)' : 'var(--theme-text-muted)',
                }}
              >
                {isAr ? sec.labelAr : sec.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Opportunities Feed */}
      <div className="flex-1 p-4 space-y-3.5 pb-24">
        {/* Feed Header */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[var(--theme-text)]">
            {isAr
              ? `فرص التدريب المتاحة بأسوان (${filteredOpportunities.length})`
              : `Available Opportunities (${filteredOpportunities.length})`}
          </span>
          <span className="text-[11px] text-[var(--theme-text-muted)]">
            {isAr ? 'مرتبة بنسبة التطابق المهاري' : 'Ranked by Fit Score'}
          </span>
        </div>

        {/* Loading Shimmer State */}
        {isLoading ? (
          <OpportunityListSkeleton count={3} isDark={isDark} />
        ) : filteredOpportunities.length === 0 ? (
          /* Empty Search State */
          <div className="py-16 text-center space-y-2">
            <p className="text-base font-bold text-[var(--theme-text)]">
              {isAr ? 'لم نعثر على فرص مطابقة لهذا البحث' : 'No matching opportunities found'}
            </p>
            <p className="text-xs text-[var(--theme-text-muted)]">
              {isAr ? 'جرب البحث بكلمات أخرى أو اختر قطاع مختلف' : 'Try searching with different keywords'}
            </p>
          </div>
        ) : (
          /* Staggered Opportunity Cards (Spec Section 5) */
          <StaggeredList
            animationKey={`${selectedSector}-${searchQuery}`}
            className="space-y-3.5"
          >
            {filteredOpportunities.map((opp) => {
              const matchScore = calculateSkillMatchScore(opp.candidateKSAO, matchingWeights);

              return (
                <div
                  key={opp.id}
                  onClick={() => onSelectOpportunity(opp)}
                  className="p-4 rounded-2xl border transition-all cursor-pointer shadow-card shadow-card-hover group"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: opp.isApplied ? 'var(--theme-success)' : 'var(--theme-border)',
                  }}
                >
                  {/* Top Card Row */}
                  <div className="flex items-start justify-between gap-2.5 mb-2">
                    <div className="space-y-1 flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--theme-accent)]/15 text-[var(--theme-accent-ink)]">
                        {isAr ? opp.sectorAr : opp.sectorEn}
                      </span>
                      <h3 className="font-black text-base leading-snug text-[var(--theme-text)] group-hover:text-[var(--theme-accent)] transition-colors">
                        {isAr ? opp.titleAr : opp.titleEn}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--theme-text-muted)]">
                        <Building2 className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                        <span className="font-semibold">{isAr ? opp.employerAr : opp.employerEn}</span>
                      </div>
                      {/* Employer Verification & Safety Badges */}
                      <div className="flex items-center gap-1.5 mt-1">
                        {opp.isVerifiedWBLPartner && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3" />
                            {isAr ? 'شريك معتمد' : 'Verified Partner'}
                          </span>
                        )}
                        {opp.employerVerificationStatus === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                            <AlertCircle className="w-3 h-3" />
                            {isAr ? 'قيد التحقق' : 'Pending Verification'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Match Score Badge (Accent Token) */}
                    <div
                      className="text-center p-2 rounded-xl min-w-[54px] shrink-0 border"
                      style={{
                        backgroundColor: 'var(--theme-bg)',
                        borderColor: 'var(--theme-border)',
                      }}
                    >
                      <span className="block text-base font-black leading-none text-[var(--theme-accent)] font-mono">
                        {matchScore}%
                      </span>
                      <span className="text-[9px] uppercase font-bold text-[var(--theme-text-muted)] block mt-0.5">
                        {isAr ? 'تطابق' : 'Fit'}
                      </span>
                    </div>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs leading-relaxed text-[var(--theme-text-muted)] line-clamp-2 my-2.5">
                    {isAr ? opp.descriptionAr : opp.descriptionEn}
                  </p>

                  {/* Card Meta Row: Location & Large Stipend Numerals (Spec Section 7) */}
                  <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1 text-xs text-[var(--theme-text-muted)]">
                        <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" />
                        <span className="truncate">{isAr ? opp.locationAr : opp.locationEn}</span>
                      </div>

                      {/* Prominent Stipend Numerals with Transportation Allowance */}
                      <div className="flex items-baseline gap-1 text-[var(--theme-text)]">
                        <Coins className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0 self-center" />
                        <span className="font-mono font-black text-base text-[var(--theme-accent-ink)]">
                          {opp.stipend.toLocaleString()}
                        </span>
                        <span className="text-[11px] font-bold text-[var(--theme-text-muted)]">
                          {isAr ? 'ج.م / شهرياً' : 'EGP/mo'}
                        </span>
                      </div>
                      {opp.transportationAllowance && opp.transportationAllowance > 0 && (
                        <div className="flex items-baseline gap-1 text-[var(--theme-text)]">
                          <Truck className="w-3.5 h-3.5 text-sky-500 shrink-0 self-center" />
                          <span className="font-mono font-bold text-base text-sky-600 dark:text-sky-400">
                            +{opp.transportationAllowance.toLocaleString()}
                          </span>
                          <span className="text-[11px] font-bold text-[var(--theme-text-muted)]">
                            {isAr ? 'ج.م مواصلات' : 'EGP transport'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Apply Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickApply(opp);
                      }}
                      className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-sm ${
                        opp.isApplied
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'hover:opacity-90 active:scale-95'
                      }`}
                      style={
                        !opp.isApplied
                          ? {
                              backgroundColor: 'var(--theme-primary)',
                              color: 'var(--theme-on-primary)',
                            }
                          : undefined
                      }
                    >
                      {opp.isApplied ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>{isAr ? 'تم التقديم' : 'Applied'}</span>
                        </>
                      ) : (
                        <span>{isAr ? 'قدّم دلوقتي' : 'Apply Now'}</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </StaggeredList>
        )}
      </div>

      {/* Floating Bottom-Anchored Thumb Filter Tray (Entry 014 - Step 6 Suggestion C) */}
      <div className="fixed bottom-20 inset-x-0 z-30 hidden justify-center pointer-events-none px-3">
        <div
          className="pointer-events-auto shadow-card-hover rounded-2xl border p-1.5 backdrop-blur-md transition-all mehna-glass-bar flex items-center gap-1.5 max-w-sm w-full"
          style={{
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center gap-1 px-1.5 text-xs font-bold text-[var(--theme-accent-ink)] shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span className="text-[10px] hidden sm:inline">{isAr ? 'القطاع:' : 'Sector:'}</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 px-0.5 flex-1">
            {sectors.map((sec) => {
              const isSelected = selectedSector === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSector(sec.id)}
                  className="px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95"
                  style={{
                    backgroundColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-surface)',
                    borderColor: isSelected ? 'var(--theme-primary)' : 'var(--theme-border)',
                    color: isSelected ? 'var(--theme-on-primary)' : 'var(--theme-text-muted)',
                  }}
                >
                  {isAr ? sec.labelAr : sec.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
