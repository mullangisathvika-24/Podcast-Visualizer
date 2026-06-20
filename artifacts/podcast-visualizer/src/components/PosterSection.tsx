import React, { useState, useEffect } from 'react';

interface PosterData {
  caption: string;
  slogan: string;
  imageType: string;
  themeStyle: string;
  takeaways: string[];
}

interface PosterSectionProps {
  posterData?: PosterData;
}

export default function PosterSection({ posterData }: PosterSectionProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  // Reset to first takeaway slide if data updates or changes
  useEffect(() => {
    setSlideIndex(0);
  }, [posterData]);

  // If the generated podcast doesn't have poster data yet, show a clean loading placeholder
  if (!posterData) {
    return (
      <div className="w-full bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl p-8 text-center text-slate-500">
        Generating poster layout design details...
      </div>
    );
  }

  const takeaways = posterData.takeaways || [];

  const handleNext = () => {
    setSlideIndex((prev) => (prev === takeaways.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSlideIndex((prev) => (prev === 0 ? takeaways.length - 1 : prev - 1));
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      
      {/* 1. Dynamic Headlines */}
      <div>
        <span className="text-xs font-bold text-purple-400 tracking-wider uppercase block">
          Generated Slogan
        </span>
        <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-0.5">
          {posterData.slogan || "Untitled Blueprint"}
        </h2>
        <p className="text-slate-400 text-sm mt-1 italic">
          "{posterData.caption}"
        </p>
      </div>

      {/* 2. Visual Prompt Blueprint Variables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
        <div>
          <span className="block font-bold text-slate-400 uppercase mb-1">Image Prompt Style:</span>
          <p className="text-slate-300 leading-relaxed">{posterData.imageType}</p>
        </div>
        <div>
          <span className="block font-bold text-slate-400 uppercase mb-1">Theme Palette:</span>
          <p className="text-slate-300 leading-relaxed">{posterData.themeStyle}</p>
        </div>
      </div>

      {/* 3. Takeaways Carousel */}
      {takeaways.length > 0 && (
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Key Takeaways ({slideIndex + 1} of {takeaways.length})
          </span>
          
          {/* Main Slide Panel Box */}
          <div className="bg-gradient-to-br from-purple-950/20 to-slate-950 border border-purple-900/30 rounded-xl p-6 min-h-[110px] flex items-center justify-center text-center">
            <p className="text-sm md:text-base text-purple-100 font-medium leading-relaxed max-w-md">
              {takeaways[slideIndex]}
            </p>
          </div>

          {/* Nav Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer select-none"
            >
              ◀ Previous
            </button>
            
            {/* Carousel Slide Progress Dots */}
            <div className="flex gap-1">
              {takeaways.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === slideIndex ? 'bg-purple-400' : 'bg-slate-700'}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="px-3 py-1.5 text-xs font-bold bg-purple-900 hover:bg-purple-800 text-purple-100 rounded-lg transition-colors cursor-pointer select-none"
            >
              Next ▶
            </button>
          </div>
        </div>
      )}

    </div>
  );
}