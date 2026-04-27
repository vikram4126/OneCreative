import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TABS = ['Graphic Design', 'PPT Deck Design', 'Motion Graphics', 'Other Design'];

const TAB_DATA = {
  0: ['graphis-design-1.png', 'graphis-design-2.png', 'graphis-design-3.png', 'graphis-design-4.png', 'graphis-design-5.png', 'graphis-design-16.png'],
  1: ['ppt-1.png', 'ppt-2.png', 'ppt-3.png', 'ppt-4.png'],
  2: ['motion-1.png', 'motion-2.png', 'motion-3.png', 'motion-4.png', 'motion-5.png'],
  3: ['others-1.png', 'others-2.png', 'others-3.png', 'others-4.png', 'others-5.png', 'others-6.png'],
};

export const SectionCreativeShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabChange = (idx) => {
    if (idx === activeTab || isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(idx);
      setIsAnimating(false);
    }, 300); // Match this duration with the CSS transition
  };

  const currentSlides = TAB_DATA[activeTab] || [];

  return (
    <section id="creative-showcase" className="w-full bg-[#00B8F5] py-24 min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-start max-w-7xl">
        
        {/* Heading */}
        <h2 
          className="text-white uppercase mb-10 w-full text-center" 
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1 }}
        >
          Creative show case
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center w-full gap-4 mb-12">
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => handleTabChange(idx)}
              className={`px-6 py-2 border-2 border-white transition-all duration-300 ${
                activeTab === idx 
                  ? 'bg-white text-[#00B8F5] font-bold' 
                  : 'bg-transparent text-white hover:bg-white/20'
              }`}
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.25rem', 
                borderRadius: '30px' 
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Slider Area */}
        <div 
          className={`w-full relative mt-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          <Swiper
            key={activeTab} // Force re-mount of swiper on tab change
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 24 },
              1024: { slidesPerView: 2.5, spaceBetween: 30 },
            }}
            pagination={{ 
              clickable: true, 
              el: '.custom-pagination',
            }}
            navigation={{ 
              nextEl: '.custom-next', 
              prevEl: '.custom-prev' 
            }}
            className="w-full overflow-visible"
            style={{ overflow: 'visible' }} // Allows seeing the next 0.5 slide cut off
          >
            {currentSlides.map((imageName, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <div 
                  className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#0C233C] overflow-hidden"
                  style={{ borderRadius: '24px' }}
                >
                  <img 
                    src={`/images/slider-items/${imageName}`} 
                    alt={`Slide ${i+1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation & Pagination Controls (Bottom Left) */}
          <div className="flex items-center mt-10 gap-4">
            <button className="custom-prev flex items-center justify-center w-12 h-12 border-2 border-white text-white hover:bg-white hover:text-[#00B8F5] transition-colors cursor-pointer z-10" style={{ borderRadius: '50%' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="custom-next flex items-center justify-center w-12 h-12 border-2 border-white text-white hover:bg-white hover:text-[#00B8F5] transition-colors cursor-pointer z-10" style={{ borderRadius: '50%' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            
            <div className="custom-pagination flex items-center gap-3 ml-4 z-10" />
          </div>
        </div>

      </div>
    </section>
  );
};
