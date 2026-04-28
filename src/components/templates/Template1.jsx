import React from 'react';

const Template1 = ({ slide }) => {
  return (
    <div className="w-full bg-white flex flex-col items-center">
      {/* Banner Image */}
      <div className="w-full h-[50vh] relative bg-gray-200">
        <img 
          src={`/images/slider-items/${slide.image}`} 
          alt={slide.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">{slide.title}</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl w-full py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#00338d] mb-6">Banner Layout Showcase</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{slide.content}</p>
      </div>
    </div>
  );
};

export default Template1;
