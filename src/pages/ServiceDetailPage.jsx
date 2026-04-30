import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SidebarMenu from '../components/SidebarMenu';
import { ServiceBanner, ServiceDetailSlider } from '../sections/ServiceSections';
import CreativeSlider from '../components/CreativeSlider';
import { SectionFooter } from '../sections/SectionFooter';
import servicesData from '../data/services.json';
import footerBg from '../assets/images/footer-bg.png';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);

  useEffect(() => {
    const foundService = servicesData.find(s => s.id === id);
    setService(foundService);
    
    // Scroll to top on mount or id change
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarDark(window.scrollY > 64);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!service) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#00338D] text-white">
        <h1 className="text-4xl font-bold">Service Not Found</h1>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} />
      <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} hideSections={true} />

      <main className="w-full relative scroll-smooth">
        {/* Section 1: Banner */}
        <ServiceBanner 
          title={service.banner.title} 
          description={service.banner.description} 
        />

        {/* Section 2: Service Details Slider */}
        <ServiceDetailSlider slides={service.details} />

        {/* Section 3: Creative Showcase */}
        <CreativeSlider 
          showTabs={false} 
          fixedCategoryId={service.categoryId} 
          customHeading="Creative Showcase" 
        />

        {/* Section 4: Footer */}
        <section 
          id="footer"
          style={{ 
            backgroundImage: `url(${footerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#FFFFFF',
            padding: '80px 0'
          }}
        >
          <SectionFooter />
        </section>
      </main>
    </div>
  );
};

export default ServiceDetailPage;
