import React from 'react';

interface LogoProps {
  className?: string;
}

export const BrandLogo: React.FC<LogoProps> = ({ className = 'h-12' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brand image from project assets */}
      <img
        src={`${import.meta.env.BASE_URL}mehna-logo.jpg`}
        alt="MEHNA Logo - مهنة"
        className="h-12 w-12 rounded-lg object-contain shadow-sm border border-[#C4824A]/30 bg-white"
        onError={(e) => {
          // Fallback to SVG if image fails to load
          e.currentTarget.style.display = 'none';
        }}
      />

      <div className="flex flex-col text-start">
        <span className="font-extrabold text-2xl tracking-tight leading-none text-[#0E3B33] font-arabic">
          مِـهْـنَـة
        </span>
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#C4824A] font-brand uppercase mt-0.5">
          M E H N A
        </span>
      </div>
    </div>
  );
};
