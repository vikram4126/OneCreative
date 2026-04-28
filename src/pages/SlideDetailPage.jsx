import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import slidesData from '../data/slides.json';
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import TemplateDefault from '../components/templates/TemplateDefault';
import CreativeSlider from '../components/CreativeSlider';
import Navbar from '../components/Navbar'; // Optionally reuse Navbar if desired
import { SectionFooter } from '../sections/SectionFooter';

const templateMap = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
};

const SlideDetailPage = () => {
  const { id } = useParams();

  const slide = slidesData.find(s => s.id === id);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!slide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-[#00338d]">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Slide not found.</p>
        <Link to="/" className="px-6 py-3 bg-[#00338d] text-white rounded font-bold hover:bg-blue-800 transition">
          Return Home
        </Link>
      </div>
    );
  }

  // Determine the template component
  const TemplateComponent = templateMap[slide.template] || TemplateDefault;

  return (
    <div className="w-full relative bg-white">
      {/* We can include the navbar here if we want consistent navigation */}
      <div className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-[#00338d] font-bold text-xl tracking-wider">ONECREATIVE</Link>
          <Link to="/" className="text-sm font-semibold text-gray-600 hover:text-[#00338d] transition">Back to Home</Link>
        </div>
      </div>

      {/* Dynamic Template Banner */}
      <div className="pt-20">
        <TemplateComponent slide={slide} />
      </div>

      {/* Reusable Slider Component Below Banner */}
      <div className="mt-12 border-t border-gray-200">
        <CreativeSlider />
      </div>

      <div className="bg-[#FFFFFF] py-10 mt-20">
        <SectionFooter />
      </div>
    </div>
  );
};

export default SlideDetailPage;
