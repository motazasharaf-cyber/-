import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="الرجوع إلى أعلى الصفحة"
      className="fixed bottom-24 left-6 z-40 w-11 h-11 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-slate-700/80 shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer backdrop-blur-md print:hidden"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
