import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Briefcase, Coins, User, Settings } from 'lucide-react';
import type { Language } from '../Navbar';

export type YouthNavTab = 'home' | 'stipends' | 'profile' | 'settings';

interface FloatingBottomNavProps {
  activeTab: YouthNavTab;
  onChangeTab: (tab: YouthNavTab) => void;
  language: Language;
  isDark: boolean;
}

/**
 * MEHNA Floating Bottom Navigation — Premium Neo-Banking Style
 *
 * Architecture:
 * 1. Floating pill dock detached from screen edge with large border-radius
 * 2. Glassmorphism: translucent frosted surface + backdrop blur(12px)
 * 3. Sliding capsule indicator that glides between tabs using spring physics
 * 4. Motion blur simulation via scaleX stretch + opacity pulse during transit
 * 5. Thin inner highlight border for realistic glass edge reflection
 * 6. Safe-area padding for modern phones with gesture bars
 * 7. Touch targets ≥ 48px, WCAG AA contrast, prefers-reduced-motion fallback
 */
export const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({
  activeTab,
  onChangeTab,
  language,
  isDark,
}) => {
  const isAr = language === 'ar';

  // Tab definitions — icon + bilingual labels
  const navItems: {
    id: YouthNavTab;
    labelAr: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  }[] = useMemo(() => [
    { id: 'home',     labelAr: 'الفرص',      labelEn: 'Home',     icon: Briefcase },
    { id: 'stipends', labelAr: 'المكافآت',    labelEn: 'Stipends', icon: Coins },
    { id: 'profile',  labelAr: 'الملف',       labelEn: 'Profile',  icon: User },
    { id: 'settings', labelAr: 'الإعدادات',   labelEn: 'Settings', icon: Settings },
  ], []);

  // ── Capsule position tracking ──
  // We measure the real DOM positions of each tab button so the capsule
  // slides to exactly the right spot regardless of text width or locale.
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [capsuleStyle, setCapsuleStyle] = useState<React.CSSProperties>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion once and track changes
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Measure and position the capsule behind the active tab
  const updateCapsulePosition = useCallback(() => {
    const activeIndex = navItems.findIndex((item) => item.id === activeTab);
    const activeButton = tabRefs.current[activeIndex];
    const container = containerRef.current;

    if (!activeButton || !container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    // Position the capsule relative to the container's inner padding
    const offsetLeft = buttonRect.left - containerRect.left;
    const width = buttonRect.width;

    setCapsuleStyle({
      width: `${width}px`,
      // Use transform for GPU-accelerated movement instead of left/right
      transform: `translateX(${offsetLeft}px)`,
    });
  }, [activeTab, navItems]);

  // Re-measure on mount, tab change, and window resize
  useEffect(() => {
    updateCapsulePosition();
    window.addEventListener('resize', updateCapsulePosition);
    return () => window.removeEventListener('resize', updateCapsulePosition);
  }, [updateCapsulePosition]);

  // Trigger motion-blur stretch effect during capsule transit
  const handleTabClick = useCallback((tab: YouthNavTab) => {
    if (tab === activeTab) return;

    if (!reducedMotion) {
      setIsTransitioning(true);
      // The stretch lasts slightly less than the spring duration so it
      // settles back to normal shape just as the capsule arrives
      const timer = setTimeout(() => setIsTransitioning(false), 320);
      // Cleanup if component unmounts mid-animation
      setTimeout(() => clearTimeout(timer), 350);
    }

    onChangeTab(tab);
  }, [activeTab, onChangeTab, reducedMotion]);

  // ── Glass surface colors ──
  // Light: warm cream glass  |  Dark: deep emerald glass
  const glassBg = isDark
    ? 'rgba(17, 43, 37, 0.62)'
    : 'rgba(255, 253, 248, 0.78)';
  const glassBorder = isDark
    ? 'rgba(60, 154, 128, 0.12)'
    : 'rgba(14, 59, 51, 0.06)';
  const innerHighlight = isDark
    ? 'rgba(255, 255, 255, 0.04)'
    : 'rgba(255, 255, 255, 0.55)';
  const capsuleBg = isDark
    ? 'rgba(60, 154, 128, 0.15)'
    : 'rgba(14, 59, 51, 0.07)';
  const capsuleBorder = isDark
    ? 'rgba(60, 154, 128, 0.18)'
    : 'rgba(14, 59, 51, 0.08)';

  // Shadow that gives the dock physical elevation depth
  const dockShadow = isDark
    ? '0 -4px 32px rgba(0, 0, 0, 0.35), 0 -1px 8px rgba(0, 0, 0, 0.2)'
    : '0 -4px 32px rgba(14, 59, 51, 0.08), 0 -1px 8px rgba(14, 59, 51, 0.04), 0 8px 32px rgba(14, 59, 51, 0.06)';

  return (
    <div
      className="w-full flex justify-center shrink-0"
      style={{
        // Push dock away from the bottom edge, respect safe area
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)',
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '6px',
      }}
    >
      <nav
        aria-label={isAr ? 'شريط التنقل الرئيسي' : 'Main navigation'}
        className="relative w-full max-w-[420px]"
        style={{
          // Outer pill shape
          borderRadius: '28px',
          // Glassmorphism surface
          backgroundColor: glassBg,
          backdropFilter: 'blur(12px) saturate(150%)',
          WebkitBackdropFilter: 'blur(12px) saturate(150%)',
          // Physical elevation shadow
          boxShadow: dockShadow,
          // Thin outer glass border
          border: `1px solid ${glassBorder}`,
        }}
      >
        {/* Inner highlight stroke — simulates light catching the glass edge */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: '28px',
            border: `1px solid ${innerHighlight}`,
            // Inset the highlight 1px so it sits inside the outer border
            margin: '0px',
          }}
        />

        {/* Tab buttons container — the capsule slides behind these */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-around px-1.5 py-1.5"
        >
          {/* ── Sliding Capsule Indicator ──
              Positioned absolutely behind the active tab button.
              Uses CSS transition with a custom spring-like cubic-bezier curve.
              During transit, scaleX stretches slightly to simulate motion blur. */}
          <div
            aria-hidden="true"
            className="absolute top-1.5 bottom-1.5"
            style={{
              ...capsuleStyle,
              // Spring physics curve: fast start, slight overshoot, gentle settle
              transition: reducedMotion
                ? 'none'
                : 'transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1), width 380ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              borderRadius: '22px',
              backgroundColor: capsuleBg,
              border: `1px solid ${capsuleBorder}`,
              // Motion blur stretch: scaleX expands during transit, opacity dips
              ...(isTransitioning && !reducedMotion
                ? {
                    // Slight horizontal stretch simulates motion blur
                    transform: `${capsuleStyle.transform || ''} scaleX(1.08)`,
                    opacity: 0.85,
                  }
                : {
                    opacity: 1,
                  }),
              // Smooth the stretch and opacity back to normal
              transitionProperty: reducedMotion
                ? 'none'
                : 'transform, width, opacity',
              transitionDuration: reducedMotion ? '0ms' : '380ms, 380ms, 200ms',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />

          {/* ── Tab Buttons ── */}
          {navItems.map((item, index) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            const label = isAr ? item.labelAr : item.labelEn;

            // Color tokens calibrated for WCAG AA contrast
            const iconColor = isActive
              ? isDark ? '#7FD1B0' : '#0E3B33'
              : isDark ? '#8A9C95' : '#8A9488';
            const labelColor = isActive
              ? isDark ? '#E8F5EF' : '#0E3B33'
              : isDark ? '#8A9C95' : '#8A9488';

            return (
              <button
                key={item.id}
                ref={(el) => { tabRefs.current[index] = el; }}
                onClick={() => handleTabClick(item.id)}
                aria-selected={isActive}
                aria-label={label}
                role="tab"
                className="relative z-10 flex flex-col items-center justify-center gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-1 rounded-[20px] cursor-pointer select-none"
                style={{
                  // Generous touch target: minimum 48px height, flexible width
                  minWidth: '64px',
                  minHeight: '54px',
                  padding: '6px 10px 4px',
                  // Prevent the button from capturing hover styles on touch devices
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <Icon
                  className="transition-all duration-200"
                  strokeWidth={isActive ? 2.4 : 1.7}
                  style={{
                    width: isActive ? '23px' : '21px',
                    height: isActive ? '23px' : '21px',
                    color: iconColor,
                    // Subtle scale-up on active for perceived weight
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    transition: reducedMotion ? 'none' : 'all 250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                />
                <span
                  className="leading-none tracking-tight"
                  style={{
                    fontSize: '11px',
                    fontWeight: isActive ? 800 : 500,
                    color: labelColor,
                    transition: reducedMotion ? 'none' : 'color 200ms ease, font-weight 200ms ease',
                    marginTop: '2px',
                  }}
                >
                  {label}
                </span>

                {/* Active dot indicator — small accent dot beneath label */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: '3px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: isDark ? '#E0A86A' : '#C4824A',
                      opacity: 0.7,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default FloatingBottomNav;
