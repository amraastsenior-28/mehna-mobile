import React from 'react';

interface StaggeredListProps {
  children: React.ReactNode[];
  /**
   * Changing this key (e.g. search term or selected category filter)
   * triggers re-staggering from the top without running on scroll.
   */
  animationKey?: string | number;
  className?: string;
}

/**
 * Staggered List Entrance Wrapper
 * Implements Section 5 of MEHNA UI Spec v2:
 * - Staggers the first 8 items with 40ms progressive delay
 * - Translates translateY 12px -> 0 and fades opacity 0 -> 1 over 280ms cubic-bezier(0.22, 1, 0.36, 1)
 * - Items index >= 8 render immediately without delay
 * - Triggered strictly on mount or query/filter mutation, never on scrolling
 * - Clean static rendering under prefers-reduced-motion
 */
export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  animationKey = 'default',
  className = 'space-y-3.5',
}) => {
  return (
    <div key={animationKey} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        // Apply progressive stagger only to the first 8 items (indices 0..7)
        const isStaggered = index < 8;
        const delayMs = isStaggered ? index * 40 : 0;

        return (
          <div
            className={isStaggered ? 'stagger-item' : ''}
            style={
              isStaggered
                ? {
                    animationDelay: `${delayMs}ms`,
                  }
                : undefined
            }
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};
