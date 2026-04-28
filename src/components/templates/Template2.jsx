import React from 'react';

const Template2 = ({ slide }) => {
  return (
    <div className="w-full bg-[#f8f9fa] py-20 px-6 flex flex-col items-center">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-[#00338d] mb-8">{slide.title}</h1>
        <p className="text-xl text-gray-600 mb-12">{slide.content}</p>
        
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative">
          <img 
            src={`/images/slider-items/${slide.image}`} 
            alt={slide.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Template2;
