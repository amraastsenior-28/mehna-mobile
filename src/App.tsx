import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import type { PortalTab, Language } from './components/Navbar';
import { LandingSection } from './components/LandingSection';
import { YouthPortal } from './components/YouthPortal';
import { EmployerConsole } from './components/EmployerConsole';
import { B2GDashboard } from './components/B2GDashboard';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { DEFAULT_MATCHING_WEIGHTS } from './utils/matchingEngine';
import type { MatchingWeights } from './utils/matchingEngine';

export function App() {
  const [activeTab, setActiveTab] = useState<PortalTab>('landing');
  const [language, setLanguage] = useState<Language>('ar');
  const [matchingWeights, setMatchingWeights] = useState<MatchingWeights>(DEFAULT_MATCHING_WEIGHTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Synchronize document direction and language attributes with current state
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={`min-h-screen flex flex-col ${isLoading ? 'bg-[#EBE3D3]' : 'bg-[#F4F0E6]'} text-[#0E3B33] font-arabic antialiased selection:bg-[#C4824A] selection:text-white`}>
      {/* Intro Desktop Loading Overlay */}
      {isLoading && (
        <LoadingScreen
          language={language}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Navigation Header */}
      <div
        aria-hidden={isLoading}
        hidden={isLoading}
        style={isLoading ? { display: 'none' } : undefined}
      >
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      {/* Main Body */}
      <main
        aria-hidden={isLoading}
        hidden={isLoading}
        style={isLoading ? { display: 'none' } : undefined}
        className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        {activeTab === 'landing' && (
          <LandingSection language={language} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'youth' && (
          <YouthPortal language={language} matchingWeights={matchingWeights} />
        )}

        {activeTab === 'employer' && (
          <EmployerConsole
            language={language}
            matchingWeights={matchingWeights}
            setMatchingWeights={setMatchingWeights}
          />
        )}

        {activeTab === 'b2g' && (
          <B2GDashboard language={language} />
        )}
      </main>

      {/* Persistent Footer */}
      <div
        aria-hidden={isLoading}
        hidden={isLoading}
        style={isLoading ? { display: 'none' } : undefined}
      >
        <Footer language={language} />
      </div>
    </div>
  );
}

export default App;
