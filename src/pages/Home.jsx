import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SidebarMenu from '../components/SidebarMenu';
import { SectionHero } from '../sections/HeroSection';
import { SectionVideoIntro } from '../sections/SectionVideoIntro';
import {
  SectionDesignStrategy,
  SectionExploring,
  SectionInspiration,
} from '../sections/SpecializedSections';
import { SectionCreativeShowcase } from '../sections/SectionCreativeShowcase';
import { SectionServices } from '../sections/SectionServices';
import { SectionCreativity } from '../sections/SectionCreativity';
import { SectionFooter } from '../sections/SectionFooter';
import SectionAttention from '../sections/SectionAttention';
import footerBg from '../assets/images/footer-bg.png';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const scrollerRef = React.useRef(null);
  const location = useLocation();

  const [activeSection, setActiveSection] = useState('intro-start');

  // Handle hash navigation from other pages
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setIsVideoFinished(true); // Skip video if navigating to a section
        }
      }, 100);
    }
  }, [location.hash]);

  // Update active section based on scroll position
  useEffect(() => {
    const sectionIds = ['intro-start', 'intro-end', 'pillars', 'services', 'creative-showcase', 'exploring', 'inspiration', 'footer'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let current = activeSection;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleVideoComplete = () => {
    setIsVideoFinished(true);
    const homeEl = document.getElementById('intro-start');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show navbar when intro-start section enters viewport (scroll or skip)
  useEffect(() => {
    const introSection = document.getElementById('intro-start');
    if (!introSection) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVideoFinished(true);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(introSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarDark(window.scrollY > 64);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {isVideoFinished && (
        <>
          <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} />
          <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} activeSection={activeSection} />
        </>
      )}

      <main id="main-scroller" ref={scrollerRef} className="w-full relative scroll-smooth snap-container">

        {/* Intro Video */}
        <section id="feature-video" className="snap-section">
          <SectionVideoIntro onComplete={handleVideoComplete} />
        </section>

        {/* 1. Hero — GSAP animation */}
        <section id="intro-start" className="snap-section">
          <SectionHero />
        </section>

        {/* 2. Creativity Section */}
        <section id="intro-end" className="snap-section">
          <SectionCreativity />
        </section>

        {/* 3. Design Strategy */}
        <section id="pillars" className="snap-section">
          <SectionDesignStrategy />
        </section>

        {/* 4. Services Cards */}
        <section id="services" className="snap-section">
          <SectionServices />
        </section>

        {/* 5. Creative Showcase */}
        <section id="creative-showcase" className="snap-section">
          <SectionCreativeShowcase />
        </section>

        {/* 6. Exploring New Possibilities */}
        <section id="exploring" className="snap-section">
          <SectionExploring />
        </section>

        {/* 7. Inspiration Meets Technology */}
        <section id="inspiration" className="snap-section">
          <SectionInspiration />
        </section>

        {/* 9. Footer */}
        <section 
          id="footer"
          className="snap-section"
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

export default Home;
