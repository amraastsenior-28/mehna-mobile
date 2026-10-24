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
      <div className="h-14 w-[41px] flex items-center justify-center shrink-0">
        <img
          src={`${import.meta.env.BASE_URL}emblem-demo-192.png`}
          alt="MEHNA Emblem"
          className="h-14 w-[41px] object-contain select-none pointer-events-none"
          style={{ aspectRatio: '0.73 / 1' }}
        />
      </div>

      {showWordmark && (
        <div className="flex flex-col text-start justify-center">
          {/* Arabic wordmark element: sized at ~45% of emblem width scale, Cairo font */}
          <span className="font-extrabold text-[22px] tracking-tight leading-none text-[#0E3B33] font-arabic">
            مِـهْـنَـة
          </span>
          {/* Latin wordmark element: beneath Arabic at 8% height gap, widely spaced serif capitals */}
          <span className="text-[10px] font-bold tracking-[0.28em] text-[#C4824A] font-brand uppercase mt-1">
            M E H N A
          </span>
        </div>
      )}
    </div>
  );
};
