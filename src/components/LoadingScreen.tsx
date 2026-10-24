import React, { useState, useEffect, useRef } from 'react';
import type { Language } from './Navbar';

interface LoadingScreenProps {
  language: Language;
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ language, onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [useFallbackPoster, setUseFallbackPoster] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Transition out over 400ms after the presentation is complete
  const handleTransitionOut = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsDone(true);
      onComplete();
    }, 400);
  };

  // Called when video playback has successfully ended
  const handleVideoEnd = () => {
    handleTransitionOut();
  };

  // Called when the video fails to load or browser cannot play it
  const handleFallback = () => {
    setUseFallbackPoster(true);
    // Display the final glowing poster frame briefly, then fade out smoothly
    setTimeout(() => {
      handleTransitionOut();
    }, 1200);
  };

  useEffect(() => {
    // If prefers-reduced-motion is enabled, show the poster immediately with no animation, then close
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setUseFallbackPoster(true);
      const timer = setTimeout(() => {
        handleTransitionOut();
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Ensure the video plays once without looping
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback if browser autoplay policies reject playback
        handleFallback();
      });
    }
  }, []);

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={language === 'ar' ? 'جاري تحميل منصة مهنة' : 'Loading MEHNA platform'}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F4F0E6] transition-opacity duration-400 ease-out select-none px-4 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative w-full max-w-[min(960px,70vw)] flex flex-col items-center justify-center">
        {useFallbackPoster ? (
          <img
            src={`${import.meta.env.BASE_URL}desktop_intro_poster.jpg`}
            alt={language === 'ar' ? 'شعار منصة مهنة' : 'MEHNA Platform Logo'}
            className="w-full h-auto max-h-[85vh] object-contain select-none pointer-events-none"
          />
        ) : (
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}desktop_intro.webm`}
            poster={`${import.meta.env.BASE_URL}desktop_intro_poster.jpg`}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleFallback}
            className="w-full h-auto max-h-[85vh] object-contain select-none pointer-events-none bg-transparent"
          />
        )}
      </div>
    </div>
  );
};
