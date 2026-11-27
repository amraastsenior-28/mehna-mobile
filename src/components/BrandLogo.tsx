import React from 'react';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export const BrandLogo: React.FC<LogoProps> = ({ className = '', showWordmark = true }) => {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* 
        Official MEHNA Emblem (WebP — Canva clean transparent export, 441 KB vs 873 KB PNG):
        - True aspect ratio 0.75:1 (3297×4401 content bounds on 6250×6250 canvas)
        - Container holds the visual weight; w-auto lets the ratio govern the render width
      */}
      <div className="h-14 flex items-center justify-center shrink-0">
        <img
          src={`${import.meta.env.BASE_URL}brand/mehna-emblem.webp`}
          alt="MEHNA Emblem"
          className="h-14 w-auto object-contain select-none pointer-events-none"
          style={{ aspectRatio: '0.75 / 1' }}
        />
      </div>

      {showWordmark && (
        <div className="flex items-center justify-center">
          {/* Pure gold Arabic calligraphic wordmark — WebP with transparency */}
          <img
            src={`${import.meta.env.BASE_URL}brand/mehna-wordmark-gold.webp`}
            alt="مهنة"
            className="h-8 w-auto object-contain select-none pointer-events-none"
          />
        </div>
      )}
    </div>
  );
};
