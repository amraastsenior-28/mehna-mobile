import React from 'react';
import { BrandLogo } from './BrandLogo';
import { UserCheck, Building2, ShieldCheck, Home, Globe } from 'lucide-react';

export type PortalTab = 'landing' | 'youth' | 'employer' | 'b2g';
export type Language = 'ar' | 'en';

interface NavbarProps {
  activeTab: PortalTab;
  setActiveTab: (tab: PortalTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
}) => {
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-50 bg-[#F4F0E6]/95 backdrop-blur-md border-b border-[#0E3B33]/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            className="cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => setActiveTab('landing')}
          >
            <BrandLogo />
          </div>

          {/* Portal Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#E9E3D3]/70 border border-[#0E3B33]/10">
            <button
              onClick={() => setActiveTab('landing')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'landing'
                  ? 'bg-[#0E3B33] text-white shadow-md'
                  : 'text-[#0E3B33]/80 hover:text-[#0E3B33] hover:bg-white/50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{isAr ? 'الرئيسية' : 'Overview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('youth')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'youth'
                  ? 'bg-[#0E3B33] text-white shadow-md'
                  : 'text-[#0E3B33]/80 hover:text-[#0E3B33] hover:bg-white/50'
              }`}
            >
              <UserCheck className="w-4 h-4 text-[#C4824A]" />
              <span>{isAr ? 'بوابة الشباب' : 'Youth Portal'}</span>
            </button>

            <button
              onClick={() => setActiveTab('employer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'employer'
                  ? 'bg-[#0E3B33] text-white shadow-md'
                  : 'text-[#0E3B33]/80 hover:text-[#0E3B33] hover:bg-white/50'
              }`}
            >
              <Building2 className="w-4 h-4 text-[#C4824A]" />
              <span>{isAr ? 'أصحاب الأعمال' : 'Employer Console'}</span>
            </button>

            <button
              onClick={() => setActiveTab('b2g')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === 'b2g'
                  ? 'bg-[#0E3B33] text-white shadow-md'
                  : 'text-[#0E3B33]/80 hover:text-[#0E3B33] hover:bg-white/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#C4824A]" />
              <span>{isAr ? 'الرقابة الحكومية B2G' : 'B2G Oversight'}</span>
            </button>
          </nav>

          {/* Right Action: Language Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white border border-[#C4824A]/40 text-[#0E3B33] hover:bg-[#C4824A] hover:text-white transition-all shadow-sm"
              title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-4 h-4 text-[#C4824A]" />
              <span>{isAr ? 'English' : 'عربي (RTL)'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-[#0E3B33]/10 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              activeTab === 'landing' ? 'bg-[#0E3B33] text-white' : 'text-[#0E3B33]'
            }`}
          >
            {isAr ? 'الرئيسية' : 'Overview'}
          </button>
          <button
            onClick={() => setActiveTab('youth')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              activeTab === 'youth' ? 'bg-[#0E3B33] text-white' : 'text-[#0E3B33]'
            }`}
          >
            {isAr ? 'الشباب' : 'Youth'}
          </button>
          <button
            onClick={() => setActiveTab('employer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              activeTab === 'employer' ? 'bg-[#0E3B33] text-white' : 'text-[#0E3B33]'
            }`}
          >
            {isAr ? 'الأعمال' : 'Employers'}
          </button>
          <button
            onClick={() => setActiveTab('b2g')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              activeTab === 'b2g' ? 'bg-[#0E3B33] text-white' : 'text-[#0E3B33]'
            }`}
          >
            {isAr ? 'الحكومة' : 'B2G'}
          </button>
        </div>
      </div>
    </header>
  );
};
