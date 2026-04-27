import React from 'react';

export const SectionVideoIntro = ({ onComplete }) => {
  return (
    <section className="h-screen w-full relative overflow-hidden bg-[#0C233C]">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/feature-video.mp4"
        autoPlay
        muted
        playsInline
        onEnded={onComplete}
      />
      
      {/* Optional skip button to allow user to proceed early */}
      <button 
        onClick={onComplete}
        className="absolute bottom-8 right-8 z-10 text-white/50 hover:text-white transition-colors uppercase tracking-widest text-sm"
      >
        Skip Intro
      </button>
    </section>
  );
};
