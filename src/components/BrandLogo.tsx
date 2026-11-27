import React from 'react';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({ className = '', showWordmark = true }) => {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* 
        Official MEHNA Emblem:
        - Rendered at 56px tall on cream (#F4F0E6) background
        - Strict 0.73 : 1 aspect ratio (width: 41px, height: 56px)
        - Clear space padding of 25% of emblem width (~10px) on cream surface
        - Dark outer band contrast preserved
      */}
      <div className="h-14 w-[42px] flex items-center justify-center shrink-0">
        <img
          src={`${import.meta.env.BASE_URL}brand/mehna-emblem.png`}
          alt="MEHNA Emblem"
          className="h-14 w-[42px] object-contain select-none pointer-events-none"
          style={{ aspectRatio: '0.748 / 1' }}
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col text-start justify-center">
          {/* Arabic wordmark element */}
          <img
            src={`${import.meta.env.BASE_URL}brand/mehna-wordmark-gold.png`}
            alt="مهنة"
            className="h-7 w-auto object-contain select-none pointer-events-none"
          />
          {/* Latin wordmark element: beneath Arabic at 8% height gap, widely spaced serif capitals */}
          <span className="text-[10px] font-bold tracking-[0.28em] text-[var(--theme-accent)] font-brand uppercase mt-0.5">
            M E H N A
          </span>
        </div>
      )}
    </div>
  );
};
