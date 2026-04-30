import React from 'react';

const TemplateVideo = ({ slide }) => {
  // Map category ID to string label
  const categoryLabels = {
    0: 'Graphic Design',
    1: 'PPT Deck Design',
    2: 'Motion Graphics',
    3: 'Other Design'
  };

  return (
    <div 
      className="w-full min-h-[80vh] flex items-center justify-center py-20 relative overflow-hidden" 
      style={{ 
        backgroundImage: 'url(images/project-page-banner-background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#00338d' // fallback
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 w-full relative z-10 flex items-center justify-center">
        
        {/* Content - Absolute positioned as requested */}
        <div className="absolute left-6 lg:left-20 top-20 lg:top-32 z-30 flex flex-col items-start text-white max-w-[450px]">
          <div className="inline-block border border-white px-4 py-1 mb-8">
            <span className="text-sm font-bold tracking-widest uppercase">{categoryLabels[slide.categoryId]}</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            {slide.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word}<br/>
              </React.Fragment>
            ))}
          </h1>
          
          <p className="text-lg lg:text-xl font-medium opacity-90 leading-relaxed drop-shadow-lg">
            {slide.content}
          </p>
        </div>

        {/* Video Box - 90% space */}
        <div className="w-[90%] relative z-10 group cursor-pointer">
          <div className="w-full aspect-video bg-black/40 shadow-2xl overflow-hidden relative border border-white/5">
            <img 
              src={`images/slider-items/${slide.image}`} 
              alt={slide.title} 
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Play Button Overlay - Large White Triangle */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-0 h-0 border-t-[30px] lg:border-t-[45px] border-t-transparent border-l-[50px] lg:border-l-[75px] border-l-white/90 border-b-[30px] lg:border-b-[45px] border-b-transparent ml-4 drop-shadow-2xl hover:scale-110 transition-transform duration-300"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TemplateVideo;
