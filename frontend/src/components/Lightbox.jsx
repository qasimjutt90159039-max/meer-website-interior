import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Lightbox = ({ items, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !items || items.length === 0) return null;
  const current = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#172326]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white z-10">
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs text-[#95B2B8] px-2 py-0.5 rounded-sm bg-[#202A2D] border border-[#324145]">
            {currentIndex + 1} / {items.length}
          </span>
          {current.category && (
            <span className="text-xs font-mono uppercase text-gray-400">
              {current.category}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-sm bg-[#202A2D] text-gray-300 hover:text-white hover:bg-[#324145] transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-sm bg-[#172326]/80 text-white hover:bg-[#95B2B8] hover:text-[#172326] border border-[#324145] transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={onNext}
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-sm bg-[#172326]/80 text-white hover:bg-[#95B2B8] hover:text-[#172326] border border-[#324145] transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <img
          src={current.image}
          alt={current.title || 'Office Furniture Visual'}
          className="max-h-[75vh] max-w-full object-contain rounded-sm border border-[#324145] shadow-2xl"
        />
      </div>

      {/* Caption Bar */}
      <div className="bg-[#202A2D] border border-[#324145] p-4 rounded-sm text-center max-w-2xl mx-auto w-full">
        <h3 className="text-white font-bold text-base sm:text-lg">{current.title}</h3>
        {current.description && (
          <p className="text-xs sm:text-sm text-gray-400 mt-1 font-light leading-relaxed">
            {current.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
