import React from 'react';

interface ShimmerSkeletonCardProps {
  isDark?: boolean;
}

/**
 * Opportunity Card Shimmer Skeleton
 * Implements Section 4 of MEHNA UI Spec v2:
 * - Matches the exact anatomy of the real opportunity card:
 *   1. Logo/Sector badge block
 *   2. Two title lines (Job role + Employer)
 *   3. Meta row (Location badge + Stipend numerals)
 *   4. Full-width action button block
 * - Uses calibrated base & highlight tokens:
 *   Light: #E9E2D3 -> #F7F3EA -> #E9E2D3
 *   Dark:  #1A3832 -> #244A42 -> #1A3832
 * - Linear sweep over 1.4s, gracefully static on prefers-reduced-motion
 */
export const OpportunityCardSkeleton: React.FC<ShimmerSkeletonCardProps> = ({ isDark = false }) => {
  return (
    <div
      role="status"
      aria-label="جارِ تحميل الفرص..."
      className="p-4 rounded-2xl border transition-colors duration-200"
      style={{
        backgroundColor: isDark ? 'var(--theme-surface)' : 'var(--theme-surface)',
        borderColor: isDark ? 'var(--theme-border)' : 'var(--theme-border)',
      }}
    >
      {/* Top row: Sector badge block & Fit score pill placeholder */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-2 flex-1">
          {/* Sector tag placeholder */}
          <div className="w-24 h-4 rounded-md shimmer-skeleton" />
          {/* Job title line placeholder */}
          <div className="w-4/5 h-5 rounded-md shimmer-skeleton" />
          {/* Employer name line placeholder */}
          <div className="w-1/2 h-3.5 rounded-md shimmer-skeleton" />
        </div>

        {/* Fit score badge placeholder */}
        <div className="w-12 h-10 rounded-xl shimmer-skeleton shrink-0" />
      </div>

      {/* Description lines */}
      <div className="space-y-1.5 my-3">
        <div className="w-full h-3 rounded shimmer-skeleton" />
        <div className="w-3/4 h-3 rounded shimmer-skeleton" />
      </div>

      {/* Meta row: Location & Stipend block */}
      <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between gap-2">
        <div className="space-y-1">
          {/* Location line */}
          <div className="w-28 h-3 rounded shimmer-skeleton" />
          {/* Large stipend numerals placeholder */}
          <div className="w-36 h-5 rounded shimmer-skeleton" />
        </div>

        {/* Action button block */}
        <div className="w-24 h-9 rounded-xl shimmer-skeleton shrink-0" />
      </div>
    </div>
  );
};

/**
 * List Skeleton Container
 * Renders multiple skeletons to ensure user perceives immediate visual structure
 */
export const OpportunityListSkeleton: React.FC<{ count?: number; isDark?: boolean }> = ({
  count = 3,
  isDark = false,
}) => {
  return (
    <div className="space-y-3.5" aria-busy="true">
      {Array.from({ length: count }).map((_, idx) => (
        <OpportunityCardSkeleton key={`skeleton-${idx}`} isDark={isDark} />
      ))}
    </div>
  );
};
