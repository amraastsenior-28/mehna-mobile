import React, { useState, useEffect } from 'react';
import type { WBLOpportunity } from '../data/mockData';
import { INITIAL_WBL_OPPORTUNITIES } from '../data/mockData';
import type { MatchingWeights } from '../utils/matchingEngine';
import type { Language } from './Navbar';
import { Wifi, Battery, Signal } from 'lucide-react';

import type { YouthAppTheme, YouthUserProfile } from './youth/types';
import { WelcomeScreen } from './youth/WelcomeScreen';
import { PhoneEntryScreen } from './youth/PhoneEntryScreen';
import { OtpVerificationScreen } from './youth/OtpVerificationScreen';
import { ProfileSetupScreen } from './youth/ProfileSetupScreen';
import { HomeScreen } from './youth/HomeScreen';
import { OpportunityDetailModal } from './youth/OpportunityDetailModal';
import { ApplyConfirmationSheet } from './youth/ApplyConfirmationSheet';
import { ParentalConsentSheet } from './youth/ParentalConsentSheet';
import { ApplicationSentModal } from './youth/ApplicationSentModal';
import { StipendsScreen } from './youth/StipendsScreen';
import { ProfileScreen } from './youth/ProfileScreen';
import { SettingsScreen } from './youth/SettingsScreen';
import { GlassBottomNav } from './youth/GlassBottomNav';
import type { YouthNavTab } from './youth/GlassBottomNav';
import { calculateSkillMatchScore } from '../utils/matchingEngine';

interface YouthPortalProps {
  language: Language;
  matchingWeights: MatchingWeights;
}

/**
 * MEHNA Youth Portal & Mobile Application Shell (v2)
 * Strictly conforms to MEHNA_UI_Spec.md:
 * - Color tokens for Light and Dark modes
 * - Glass bottom navigation with 220ms cross-fade and 8px slide transition
 * - Shimmer skeleton matching real card anatomy
 * - Staggered list entrance (first 8 items, 40ms stagger, 280ms duration)
 * - Required auth options: Google or Phone (Name, Phone +20, Date of Birth)
 * - Under-18 verification and Parental Consent flow
 * - 0 AI-written text buttons, 0 purple/blue gradients, 0 confidential stipends
 */
export const YouthPortal: React.FC<YouthPortalProps> = ({
  language: parentLanguage,
  matchingWeights,
}) => {
  // App-level language and theme states
  const [language, setLanguage] = useState<Language>(parentLanguage);
  const [theme, setTheme] = useState<YouthAppTheme>('light');
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(false);

  // Sync system dark preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(media.matches);
    const listener = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  // Synchronize document attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Auth flow states: initialized in authenticated demo state so user can immediately view all screens,
  // with ability to sign out from Settings to test the complete registration and sign-in flow
  const [authStep, setAuthStep] = useState<
    'welcome' | 'phone_entry' | 'otp_verification' | 'profile_setup' | 'authenticated'
  >('authenticated');

  const [user, setUser] = useState<YouthUserProfile | null>({
    name: 'يوسف محمود علي',
    phone: '+20 101 234 5678',
    dob: '2006-05-15',
    isUnder18: false,
    parentConsentGiven: true,
    trackAr: 'تكنولوجيا الطاقة الشمسية والمتجددة',
    trackEn: 'Solar & Renewable Energy Tech',
    preferredLocation: 'مجمع بنبان للطاقة الشمسية',
  });

  const [pendingPhone, setPendingPhone] = useState<string>('+20 101 234 5678');

  // Navigation tab state with slide direction tracking
  const [activeTab, setActiveTab] = useState<YouthNavTab>('home');
  const [tabSlideOffset, setTabSlideOffset] = useState<number>(8);

  // Opportunities and Applications
  const [opportunities, setOpportunities] = useState<WBLOpportunity[]>(INITIAL_WBL_OPPORTUNITIES);
  const [selectedOpportunityForDetail, setSelectedOpportunityForDetail] = useState<WBLOpportunity | null>(null);
  const [selectedOpportunityForApply, setSelectedOpportunityForApply] = useState<WBLOpportunity | null>(null);
  const [showParentalConsent, setShowParentalConsent] = useState<boolean>(false);
  const [showApplicationSent, setShowApplicationSent] = useState<boolean>(false);

  const isAr = language === 'ar';

  // Handle Tab Switch with Directional Slide
  const handleTabChange = (nextTab: YouthNavTab) => {
    const tabOrder: YouthNavTab[] = ['home', 'stipends', 'profile', 'settings'];
    const prevIdx = tabOrder.indexOf(activeTab);
    const nextIdx = tabOrder.indexOf(nextTab);
    const directionMultiplier = isAr ? -1 : 1;
    setTabSlideOffset(nextIdx >= prevIdx ? 8 * directionMultiplier : -8 * directionMultiplier);
    setActiveTab(nextTab);
  };

  // Google Sign-In Flow
  const handleGoogleSignIn = () => {
    setUser({
      name: 'كريم أحمد حسن',
      email: 'karim.hassan@example.com',
      phone: '',
      dob: '',
      isUnder18: false,
      parentConsentGiven: false,
    });
    setAuthStep('phone_entry');
  };

  // Phone Entry Submit
  const handlePhoneSubmit = (data: { name: string; phone: string; dob: string; isUnder18: boolean }) => {
    setPendingPhone(data.phone);
    setUser((prev) => ({
      ...prev,
      name: data.name,
      phone: data.phone,
      dob: data.dob,
      isUnder18: data.isUnder18,
      parentConsentGiven: false,
    }));
    setAuthStep('otp_verification');
  };

  // OTP Verification Success
  const handleOtpSuccess = () => {
    setAuthStep('profile_setup');
  };

  // Profile Setup Complete
  const handleProfileComplete = (data: { track: string; skills: string[]; location: string }) => {
    setUser((prev) => ({
      ...prev!,
      trackAr: data.track,
      skills: data.skills,
      preferredLocation: data.location,
    }));
    setAuthStep('authenticated');
    setActiveTab('home');
  };

  // Confirm Application Submission
  const handleConfirmApplication = () => {
    if (!selectedOpportunityForApply) return;

    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === selectedOpportunityForApply.id ? { ...opp, isApplied: true } : opp
      )
    );
    setSelectedOpportunityForApply(null);
    setSelectedOpportunityForDetail(null);
    setShowApplicationSent(true);
  };

  // Parental Consent Granted
  const handleParentConsentSuccess = (parentPhone: string, _relation: string) => {
    setUser((prev) => (prev ? { ...prev, parentConsentGiven: true, parentPhone } : null));
    setShowParentalConsent(false);
    if (selectedOpportunityForApply) {
      handleConfirmApplication();
    }
  };

  // Sign out
  const handleSignOut = () => {
    setUser(null);
    setAuthStep('welcome');
    setActiveTab('home');
  };

  return (
    <div
      className="w-full flex justify-center items-center py-2 sm:py-6"
      style={{
        '--tab-slide-offset': `${tabSlideOffset}px`,
      } as React.CSSProperties}
    >
      {/* 
        Smartphone Frame on Desktop, Edge-to-edge Native View on Mobile
      */}
      <div className="w-full max-w-[395px] h-[780px] max-h-[86vh] md:max-w-[395px] md:h-[780px] md:max-h-[86vh] max-md:max-w-none max-md:h-screen max-md:max-h-none max-md:rounded-none max-md:p-0 max-md:border-0 max-md:shadow-none bg-[#111111] p-[10px] rounded-[48px] border-[2.5px] border-[#222825] flex flex-col phone-frame-motion">
        {/* Inner Phone Screen Container with Theme Tokens */}
        <div
          className="relative w-full h-full rounded-[38px] max-md:rounded-none overflow-hidden flex flex-col transition-colors duration-200"
          style={{
            backgroundColor: 'var(--theme-bg)',
            color: 'var(--theme-text)',
          }}
        >
          {/* Status Bar (Western Numerals 9:41, Signal & Battery) */}
          <div
            className="w-full px-5 pt-3 pb-1.5 flex items-center justify-between z-30 select-none shrink-0 max-md:hidden border-b transition-colors"
            style={{
              backgroundColor: isDark ? '#112B25' : '#0E3B33',
              color: '#FFFDF8',
              borderColor: isDark ? '#1F3D36' : 'transparent',
            }}
            dir="ltr"
          >
            <span className="text-[12px] font-semibold tracking-tight font-sans text-white/95">
              9:41
            </span>
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
            </div>
            <div className="flex items-center gap-1.5 text-white/90">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Main App Container */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* Screen Routing based on Auth Step */}
            {authStep === 'welcome' && (
              <WelcomeScreen
                language={language}
                onToggleLanguage={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                isDark={isDark}
                onToggleTheme={() => setTheme(isDark ? 'light' : 'dark')}
                onSelectGoogle={handleGoogleSignIn}
                onSelectPhone={() => setAuthStep('phone_entry')}
                onSkipGuest={() => {
                  setAuthStep('authenticated');
                  setActiveTab('home');
                }}
              />
            )}

            {authStep === 'phone_entry' && (
              <PhoneEntryScreen
                language={language}
                onBack={() => setAuthStep('welcome')}
                onSubmit={handlePhoneSubmit}
                initialValues={{ name: user?.name, phone: user?.phone, dob: user?.dob }}
              />
            )}

            {authStep === 'otp_verification' && (
              <OtpVerificationScreen
                language={language}
                phone={pendingPhone}
                onBack={() => setAuthStep('phone_entry')}
                onVerifySuccess={handleOtpSuccess}
              />
            )}

            {authStep === 'profile_setup' && (
              <ProfileSetupScreen
                language={language}
                onComplete={handleProfileComplete}
                onSkip={() => {
                  setAuthStep('authenticated');
                  setActiveTab('home');
                }}
              />
            )}

            {/* Authenticated Main Tabs with 220ms Cross-Fade & 8px Slide (Spec Section 3) */}
            {authStep === 'authenticated' && (
              <div className="flex-1 flex flex-col overflow-hidden relative">
                <div key={activeTab} className="flex-1 overflow-hidden tab-transition-active flex flex-col">
                  {activeTab === 'home' && (
                    <HomeScreen
                      opportunities={opportunities}
                      language={language}
                      matchingWeights={matchingWeights}
                      onSelectOpportunity={(opp) => setSelectedOpportunityForDetail(opp)}
                      onQuickApply={(opp) => setSelectedOpportunityForApply(opp)}
                      isDark={isDark}
                      userTrack={user?.trackAr}
                    />
                  )}

                  {activeTab === 'stipends' && (
                    <StipendsScreen language={language} isDark={isDark} />
                  )}

                  {activeTab === 'profile' && (
                    <ProfileScreen
                      language={language}
                      user={user}
                      isDark={isDark}
                      onEditProfile={() => setAuthStep('profile_setup')}
                    />
                  )}

                  {activeTab === 'settings' && (
                    <SettingsScreen
                      language={language}
                      onSetLanguage={setLanguage}
                      theme={theme}
                      onSetTheme={setTheme}
                      user={user}
                      onSignOut={handleSignOut}
                      isDark={isDark}
                    />
                  )}
                </div>

                {/* Glass Bottom Navigation Bar (Spec Section 3) */}
                <GlassBottomNav
                  activeTab={activeTab}
                  onChangeTab={handleTabChange}
                  language={language}
                  isDark={isDark}
                />
              </div>
            )}
          </div>

          {/* Bottom Home Indicator Bar on Desktop Phone Shell */}
          <div
            className="w-full py-1.5 flex justify-center items-center shrink-0 border-t max-md:hidden transition-colors"
            style={{
              backgroundColor: 'var(--theme-bg)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div className="w-32 h-1 bg-neutral-400/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Screen 7: Opportunity Detail Modal */}
      {selectedOpportunityForDetail && (
        <OpportunityDetailModal
          opportunity={selectedOpportunityForDetail}
          language={language}
          onClose={() => setSelectedOpportunityForDetail(null)}
          onApply={(opp) => {
            setSelectedOpportunityForApply(opp);
          }}
          isApplied={!!selectedOpportunityForDetail.isApplied}
          isDark={isDark}
          matchScore={calculateSkillMatchScore(
            selectedOpportunityForDetail.candidateKSAO,
            matchingWeights
          )}
        />
      )}

      {/* Screen 8: Apply Confirmation Glass Sheet */}
      {selectedOpportunityForApply && (
        <ApplyConfirmationSheet
          opportunity={selectedOpportunityForApply}
          language={language}
          onClose={() => setSelectedOpportunityForApply(null)}
          onConfirm={handleConfirmApplication}
          isUnder18={!!user?.isUnder18}
          hasParentalConsent={!!user?.parentConsentGiven}
          onRequestParentalConsent={() => setShowParentalConsent(true)}
        />
      )}

      {/* Screen 13: Parental Consent Modal (Under 18) */}
      {showParentalConsent && (
        <ParentalConsentSheet
          language={language}
          onClose={() => setShowParentalConsent(false)}
          onConsentSuccess={handleParentConsentSuccess}
        />
      )}

      {/* Screen 9: Application Sent (3-Step Timeline) */}
      {showApplicationSent && (
        <ApplicationSentModal
          language={language}
          onClose={() => setShowApplicationSent(false)}
          onViewStipends={() => {
            setShowApplicationSent(false);
            setActiveTab('stipends');
          }}
        />
      )}
    </div>
  );
};

export default YouthPortal;
