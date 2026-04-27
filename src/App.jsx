import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SidebarMenu from './components/SidebarMenu';
import { SectionHero } from './sections/HeroSection';
import { SectionVideoIntro } from './sections/SectionVideoIntro';
import {
  SectionDesignStrategy,
  SectionExploring,
  SectionInspiration,
} from './sections/SpecializedSections';
import { SectionCreativeShowcase } from './sections/SectionCreativeShowcase';
import { SectionServices } from './sections/SectionServices';
import { SectionCreativity } from './sections/SectionCreativity';
import { SectionFooter } from './sections/SectionFooter';
import SectionAttention from './sections/SectionAttention';
import footerBg from './assets/images/footer-bg.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const scrollerRef = React.useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleVideoComplete = () => {
    setIsVideoFinished(true);
    const homeEl = document.getElementById('intro-start');
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
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
          <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} />
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

        {/* 5. Creative Showcase (Moved here) */}
        <section className="snap-section">
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
}

export default App;
