import React from 'react';

const TemplateDefault = ({ slide }) => {
  return (
    <div className="w-full py-16 px-6 text-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
      <p className="text-gray-600 mb-8">{slide.content}</p>
      <img 
        src={`/images/slider-items/${slide.image}`} 
        alt={slide.title} 
        className="max-w-2xl w-full mx-auto rounded shadow-lg"
      />
    </div>
  );
};

export default TemplateDefault;
