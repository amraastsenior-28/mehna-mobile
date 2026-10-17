import React from 'react';

interface ArchStaircaseArtProps {
  className?: string;
}

/**
 * Architectural line art redrawn from the MEHNA brand mark:
 * An overarching Egyptian-Nubian masonry arch with an ascending staircase
 * symbolizing the structured pathway from vocational training to formal enterprise employment.
 * Rendered with thin hairline strokes for subtle watermark integration.
 */
export const ArchStaircaseArt: React.FC<ArchStaircaseArtProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 650"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Grand Arch Outline */}
      <path
        d="M50 630 V 270 C 50 140 140 50 250 50 C 360 50 450 140 450 270 V 630"
        stroke="#C4824A"
        strokeWidth="2.5"
        strokeMiterlimit="10"
      />

      {/* Decorative Outer Arch Accent Rim */}
      <path
        d="M30 630 V 270 C 30 120 130 30 250 30 C 370 30 470 120 470 270 V 630"
        stroke="#C4824A"
        strokeWidth="1.2"
        strokeDasharray="6 6"
        strokeMiterlimit="10"
      />

      {/* Inner Portal Arch */}
      <path
        d="M90 630 V 300 C 90 190 160 110 250 110 C 340 110 410 190 410 300 V 630"
        stroke="#C4824A"
        strokeWidth="1.8"
        strokeMiterlimit="10"
      />

      {/* Keystone at Apex of Arch */}
      <path
        d="M235 30 L 230 110 L 270 110 L 265 30 Z"
        stroke="#C4824A"
        strokeWidth="1.5"
      />

      {/* Radiating Arch Voussoirs (Architectural Rays) */}
      <line x1="165" y1="75" x2="185" y2="135" stroke="#C4824A" strokeWidth="1.2" />
      <line x1="335" y1="75" x2="315" y2="135" stroke="#C4824A" strokeWidth="1.2" />
      <line x1="95" y1="160" x2="145" y2="195" stroke="#C4824A" strokeWidth="1.2" />
      <line x1="405" y1="160" x2="355" y2="195" stroke="#C4824A" strokeWidth="1.2" />

      {/* The Ascending Staircase Steps (Dual VET Pathway) */}
      {/* Step 1 (Base Step) */}
      <path
        d="M 110 610 L 390 610 L 380 575 L 120 575 Z"
        stroke="#C4824A"
        strokeWidth="2"
      />
      {/* Step 2 */}
      <path
        d="M 125 575 L 375 575 L 365 540 L 135 540 Z"
        stroke="#C4824A"
        strokeWidth="1.8"
      />
      {/* Step 3 */}
      <path
        d="M 140 540 L 360 540 L 350 505 L 150 505 Z"
        stroke="#C4824A"
        strokeWidth="1.8"
      />
      {/* Step 4 */}
      <path
        d="M 155 505 L 345 505 L 335 470 L 165 470 Z"
        stroke="#C4824A"
        strokeWidth="1.6"
      />
      {/* Step 5 */}
      <path
        d="M 170 470 L 330 470 L 320 435 L 180 435 Z"
        stroke="#C4824A"
        strokeWidth="1.6"
      />
      {/* Step 6 */}
      <path
        d="M 185 435 L 315 435 L 305 400 L 195 400 Z"
        stroke="#C4824A"
        strokeWidth="1.5"
      />
      {/* Step 7 */}
      <path
        d="M 200 400 L 300 400 L 290 365 L 210 365 Z"
        stroke="#C4824A"
        strokeWidth="1.5"
      />
      {/* Step 8 (Gateway Horizon Step) */}
      <path
        d="M 215 365 L 285 365 L 275 330 L 225 330 Z"
        stroke="#C4824A"
        strokeWidth="1.4"
      />

      {/* Perspective Guidelines Connecting the Stairway to the Vanishing Point */}
      <line x1="110" y1="610" x2="225" y2="330" stroke="#C4824A" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="390" y1="610" x2="275" y2="330" stroke="#C4824A" strokeWidth="1" strokeDasharray="4 4" />

      {/* Horizon Sun / Dawn of Opportunity at Arch Center */}
      <path
        d="M 220 310 C 220 280 280 280 280 310"
        stroke="#C4824A"
        strokeWidth="1.5"
      />
      <circle cx="250" cy="270" r="14" stroke="#C4824A" strokeWidth="1.4" />
    </svg>
  );
};
