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
import SectionAttention from './sections/SectionAttention';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarDark, setIsNavbarDark] = useState(false);
  const scrollerRef = React.useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleVideoComplete = () => {
    const homeEl = document.getElementById('home');
    if (homeEl && scrollerRef.current) {
      scrollerRef.current.scrollTo({
        top: homeEl.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollerRef.current) {
        setIsNavbarDark(scrollerRef.current.scrollTop > 64);
      }
    };

    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scroller) {
        scroller.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Navbar onMenuToggle={toggleMenu} isScrolled={isNavbarDark} />
      <SidebarMenu isOpen={isMenuOpen} onToggle={toggleMenu} />

      <main id="main-scroller" ref={scrollerRef} className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth">

        {/* Intro Video */}
        <SectionVideoIntro onComplete={handleVideoComplete} />

        {/* 1. Hero — GSAP animation */}
        <div id="home">
          <SectionHero />
        </div>

        {/* 2. Design Strategy */}
        <div id="pillars">
          <SectionDesignStrategy />
        </div>

        {/* 3. Exploring New Possibilities */}
        <div id="exploring">
          <SectionExploring />
        </div>


        {/* 5. Inspiration Meets Technology */}
        <div id="services">
          <SectionInspiration />
        </div>

        {/* 6. Creative Showcase */}
        <SectionCreativeShowcase />

      </main>
    </div>
  );
}

export default App;
