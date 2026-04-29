import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const TemplateGallery = ({ slide }) => {
  // Map category ID to string label
  const categoryLabels = {
    0: 'Graphic Design',
    1: 'PPT Deck Design',
    2: 'Motion Graphics',
    3: 'Other Design'
  };

  const galleryImages = slide.gallery || [];

  return (
    <div 
      className="w-full min-h-[80vh] flex items-center justify-center py-20 relative" 
      style={{ 
        backgroundImage: 'url(/images/project-page-banner-background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#00338d' // fallback
      }}
    >
      {/* Changed gap-6 to gap-0 */}
      <div className="container mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-[1.5fr_2fr_1.5fr] gap-0 items-stretch relative z-10">
        
        {/* Left Content (Text) - Col 1: Overlaps Right by 10px, high z-index */}
        <div className="flex flex-col justify-center items-start text-white py-10 pr-4 relative lg:-mr-[10px] z-20">
          <div className="inline-block border border-white/60 px-4 py-1 mb-8">
            <span className="text-sm font-bold tracking-widest uppercase">{categoryLabels[slide.categoryId]}</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            {slide.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word}<br/>
              </React.Fragment>
            ))}
          </h1>
          
          <p className="text-lg font-medium opacity-90 leading-relaxed max-w-sm">
            {slide.content}
          </p>
        </div>

        {/* Middle Content - Big Main Image - Col 2: Lowest z-index */}
        <div className="flex items-center justify-center w-full relative z-10">
          <div className="w-full aspect-[4/5] bg-white shadow-2xl overflow-hidden relative group">
            <img 
              src={`/images/slider-items/${slide.image}`} 
              alt={`${slide.title} Main`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Content - Vertical Mini Swiper - Col 3: Overlaps Left by 10px, high z-index */}
        <div className="relative lg:-ml-[10px] z-20 h-[600px] lg:h-auto lg:py-[100px]">
          {/* Swiper Container - Using absolute on desktop to fill grid height perfectly minus padding */}
          <div className="w-full h-full lg:absolute lg:inset-x-0 lg:top-[100px] lg:bottom-[100px] lg:h-auto relative flex items-center justify-center">
            <Swiper
              direction={'vertical'}
              slidesPerView={2}
              spaceBetween={20}
              modules={[Pagination]}
              observer={true}
              observeParents={true}
              pagination={{
                clickable: true,
                renderBullet: function (index, className) {
                  return `<span class="${className} custom-bullet-square"></span>`;
                },
              }}
              style={{ height: '100%' }}
              className="w-full max-w-[420px] h-full gallery-custom-swiper"
            >
              {galleryImages.map((img, idx) => (
                <SwiperSlide key={idx} className="w-full" style={{ height: 'calc((100% - 20px) / 2)' }}>
                  <div className="w-full h-full bg-transparent shadow-xl overflow-hidden relative group border-2 border-white/20 aspect-[4/5] p-[10px]">
                    <img 
                      src={`/images/slider-items/${img}`} 
                      alt={`Gallery ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </div>

      {/* Embedded Styles for the square pagination bullets matching the design image */}
      <style dangerouslySetInnerHTML={{__html: `
        .gallery-custom-swiper {
          padding-right: 50px !important; /* Gap between slider items and pagination */
        }
        .gallery-custom-swiper.swiper-initialized {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .gallery-custom-swiper .swiper-slide {
          height: calc(50% - 10px) !important; /* Force exact height for 2 slides per view to override any global 100% height styles */
        }
        .swiper-pagination-vertical.swiper-pagination-bullets, .swiper-vertical>.swiper-pagination-bullets {
          right: 0 !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .custom-bullet-square {
          width: 14px;
          height: 14px;
          border-radius: 0;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.5);
          opacity: 1;
          margin: 0 !important;
          transition: all 0.3s ease;
          display: block;
          cursor: pointer;
        }
        .custom-bullet-square.swiper-pagination-bullet-active {
          background: white;
          border-color: white;
        }
      `}} />
    </div>
  );
};

export default TemplateGallery;
