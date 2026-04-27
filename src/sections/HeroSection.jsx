import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Card icon components (small, blue stroke) ──────────── */
const IconScissors = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E49E2" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E49E2" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E49E2" strokeWidth="1.5" strokeLinecap="round">
    <path d="M18 20V10M12 20V4M6 20v-6"/>
  </svg>
);
const IconStar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E49E2" strokeWidth="1.5" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const CARDS = [
  { title: ['UK', 'Create'],            Icon: IconScissors },
  { title: ['US Creative', 'Services'], Icon: IconGlobe    },
  { title: ['UK', 'Advisory'],          Icon: IconChart    },
  { title: ['UK Learning', '& Design'], Icon: IconStar     },
];

export const SectionHero = () => {
  const sectionRef  = useRef(null);
  const cardRefs    = useRef([]);
  const contentRefs = useRef([]);

  useEffect(() => {
    /* ── initial state (before JS runs) ── */
    const cards    = cardRefs.current.filter(Boolean);
    const contents = contentRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionCenterX = sectionRect.left + sectionRect.width / 2;
      const sectionCenterY = sectionRect.top + sectionRect.height / 2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Distance to move card from its grid position to the center of the section
        const dx = sectionCenterX - cardCenterX;
        const dy = sectionCenterY - cardCenterY;
        
        gsap.set(card, {
          x: dx,
          y: dy,
          opacity: 0,
          scale: 0.95,
          backgroundColor: 'rgba(255,255,255,0)',
          boxShadow: 'none',
        });
      });

      gsap.set(contents, { opacity: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: sectionRef.current.closest('main') || window,
          start: 'top 60%', // Trigger when section is in view
        }
      });

      // 1. Fade in the overlapping cards as a "single box" at the center
      tl.to(cards, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });

      // 2. Expand out to grid positions (1 box divides into 4)
      tl.to(cards, {
        x: 0,
        y: 0,
        scale: 1,
        backgroundColor: 'rgba(245,247,250,0.98)',
        boxShadow: '0 8px 40px rgba(30,73,226,0.10)',
        duration: 1,
        ease: 'expo.out',
      }, '+=0.2');

      // 3. Fade in text content
      tl.to(contents, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.5');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        width: '100%',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* subtle radial background glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #EEF3FF 0%, #FFFFFF 70%)',
        pointerEvents: 'none',
      }} />

      <div
        className="container mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
          width: '100%',
          position: 'relative',
          zIndex: 1,
          padding: '0',
        }}
      >
        {CARDS.map((card, i) => {
          const { Icon } = card;
          return (
            <div
              key={i}
              ref={el => (cardRefs.current[i] = el)}
              className="hero-card"
              style={{
                width: '100%',
                maxWidth: 320,
                justifySelf: 'center',
                height: 380,
                border: '1.5px solid #1E49E2',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 22,
                position: 'relative',
                willChange: 'transform, opacity',
              }}
            >
              {/* Top-left icon */}
              <div style={{ opacity: 0.6 }}><Icon /></div>

              {/* Center text — PHASE 3 reveal */}
              <div
                ref={el => (contentRefs.current[i] = el)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
              >
                <h2
                  className="hero-card-title"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.55rem)',
                    fontWeight: 800,
                    textAlign: 'center',
                    lineHeight: 1.25,
                  }}
                >
                  {card.title.map((line, j) => (
                    <span key={j} style={{ display: 'block' }}>{line}</span>
                  ))}
                </h2>
              </div>

              {/* Bottom-right icon */}
              <div style={{ alignSelf: 'flex-end', opacity: 0.6 }}><Icon /></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
