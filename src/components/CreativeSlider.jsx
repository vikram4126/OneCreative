import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import slidesData from '../data/slides.json';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TABS = ['Graphic Design', 'PPT Deck Design', 'Motion Graphics', 'Other Design'];

const CreativeSlider = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const handleTabChange = (idx) => {
    if (idx === activeTab || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(idx);
      setIsFading(false);
    }, 300);
  };

  // Filter slides from JSON based on the active category tab
  const currentSlides = slidesData.filter(slide => slide.categoryId === activeTab);

  return (
    <div className="w-full bg-[#F5F7FA] py-[80px] flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-start max-w-[1400px]">
        
        {/* Heading */}
        <h2 
          className="text-[#00338d] w-full text-center" 
          style={{ 
            fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', 
            fontWeight: 900, 
            lineHeight: 1,
            marginBottom: '30px'
          }}
        >
          Creative show case
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center w-full gap-0 mb-12">
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => handleTabChange(idx)}
              className={`px-16 py-4 transition-all duration-300 relative bg-[#D1D5DB] text-[#00338d] ${
                activeTab === idx 
                  ? 'font-bold' 
                  : 'font-medium hover:bg-[#E5E7EB]'
              }`}
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '1.2rem', 
                borderBottom: activeTab === idx ? '5px solid #00338d' : '5px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Slider Area */}
        <div className={`w-full relative mt-4 transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
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
            {currentSlides.map((slide, i) => (
              <SwiperSlide key={slide.id} className="flex justify-center">
                <Link to={`/slide/${slide.id}`} className="block w-full h-full relative cursor-pointer group">
                  <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#0C233C] overflow-hidden rounded-lg">
                    <img 
                      src={`/images/slider-items/${slide.image}`} 
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <span className="text-white text-lg font-bold tracking-widest uppercase border border-white px-6 py-2 rounded-full">View Details</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation & Pagination Controls (Bottom Left) */}
          <div className="flex items-center mt-10 gap-4">
            <button className="custom-prev flex items-center justify-center w-14 h-14 border-2 border-[#00338d] text-[#00338d] hover:bg-[#00338d] hover:text-white transition-colors cursor-pointer z-10" style={{ borderRadius: '50%' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button className="custom-next flex items-center justify-center w-14 h-14 border-2 border-[#00338d] text-[#00338d] hover:bg-[#00338d] hover:text-white transition-colors cursor-pointer z-10" style={{ borderRadius: '50%' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            
            <div className="custom-pagination flex items-center gap-3 ml-4 z-10" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CreativeSlider;
