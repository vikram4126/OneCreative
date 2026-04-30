import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import slidesData from '../data/slides.json';
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';
import Template3 from '../components/templates/Template3';
import TemplateVideo from '../components/templates/TemplateVideo';
import TemplateGallery from '../components/templates/TemplateGallery';
import TemplateDefault from '../components/templates/TemplateDefault';
import CreativeSlider from '../components/CreativeSlider';
import Navbar from '../components/Navbar';
import SidebarMenu from '../components/SidebarMenu';
import { SectionFooter } from '../sections/SectionFooter';
import footerBg from '../assets/images/footer-bg.png';

const templateMap = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  video: TemplateVideo,
  gallery: TemplateGallery,
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  
  const slide = slidesData.find(s => s.id === id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarDark(window.scrollY > 64);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!slide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-[#00338d]">
        <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} />
        <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} activeSection={null} hideSections={true} />
        <h1 className="text-6xl font-bold mb-4 mt-20">404</h1>
        <p className="text-xl mb-8">Project not found.</p>
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
      <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} />
      <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} activeSection={null} hideSections={true} />
      
      {/* Dynamic Template Banner */}
      <div className="pt-20">
        <TemplateComponent slide={slide} />
      </div>

      {/* Reusable Slider Component Below Banner */}
      <div className="mt-12 border-t border-gray-100">
        <CreativeSlider showTabs={false} fixedCategoryId={slide.categoryId} customHeading="More Projects" />
      </div>

      {/* Sync Footer with Home Page Footer */}
      <footer 
        id="footer"
        className="mt-20"
        style={{ 
          backgroundImage: `url(${footerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#FFFFFF',
          padding: '80px 0'
        }}
      >
        <SectionFooter customMembers={slide.contacts} />
      </footer>
    </div>
  );
};

export default ProjectDetailPage;
