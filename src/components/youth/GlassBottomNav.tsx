import React from 'react';
import { Briefcase, Coins, User, Settings } from 'lucide-react';
import type { Language } from '../Navbar';

export type YouthNavTab = 'home' | 'stipends' | 'profile' | 'settings';

interface GlassBottomNavProps {
  activeTab: YouthNavTab;
  onChangeTab: (tab: YouthNavTab) => void;
  language: Language;
  isDark: boolean;
}

/**
 * Glass Bottom Navigation Bar
 * Implements Section 3 of MEHNA UI Spec v2:
 * - Clear glass surface with blur(20px) and saturate(140%)
 * - Light surface: rgba(255,253,248,0.72) / Dark surface: rgba(17,43,37,0.65)
 * - Solid fallback when reduced transparency is preferred or backdrop-filter unsupported
 * - Touch targets >= 48px for ergonomic one-handed mobile navigation
 * - Active tab highlight pill behind the active icon
 */
export const GlassBottomNav: React.FC<GlassBottomNavProps> = ({
  activeTab,
  onChangeTab,
  language,
  isDark,
}) => {
  const isAr = language === 'ar';

  const navItems: { id: YouthNavTab; labelAr: string; labelEn: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', labelAr: 'الفرص', labelEn: 'Opportunities', icon: Briefcase },
    { id: 'stipends', labelAr: 'المكافآت', labelEn: 'Stipends', icon: Coins },
    { id: 'profile', labelAr: 'الملف', labelEn: 'Profile', icon: User },
    { id: 'settings', labelAr: 'الإعدادات', labelEn: 'Settings', icon: Settings },
  ];

  return (
    <nav
      aria-label={isAr ? 'شريط التنقل السفلي' : 'Bottom Navigation'}
      className="sticky bottom-0 z-40 w-full mehna-glass-bar border-t transition-colors duration-200"
      style={{
        borderColor: isDark ? 'rgba(31, 61, 54, 0.8)' : 'rgba(228, 219, 203, 0.8)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)',
      }}
    >
      <div className="flex items-center justify-around px-2 pt-1.5 pb-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          const label = isAr ? item.labelAr : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              aria-selected={isActive}
              aria-label={label}
              className={`relative flex flex-col items-center justify-center min-w-[64px] min-h-[48px] px-3 py-1 rounded-2xl transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] ${
                isActive
                  ? 'text-[var(--theme-primary)] font-black'
                  : 'text-[var(--theme-text-muted)] hover:text-[var(--theme-text)]'
              }`}
            >
              {/* Highlight pill behind active icon (Spec Section 3) */}
              <div
                className={`relative flex items-center justify-center w-12 h-7 rounded-full transition-colors duration-200 ${
                  isActive
                    ? isDark
                      ? 'bg-[#3C9A80]/20 text-[#3C9A80]'
                      : 'bg-[#0E3B33]/10 text-[#0E3B33]'
                    : 'text-[var(--theme-text-muted)]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
              </div>

              {/* Text label with legible contrast and minimal layout shift */}
              <span
                className={`text-[11px] leading-tight mt-0.5 tracking-tight transition-all duration-200 ${
                  isActive ? 'font-black scale-105' : 'font-medium'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
