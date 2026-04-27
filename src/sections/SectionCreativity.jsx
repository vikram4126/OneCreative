import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SectionCreativity = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: sectionRef.current.closest('main') || window,
          start: 'top 80%', // Start filling as it comes into view
        }
      });

      // 1. Initial state for handoff
      // We start with the box having just the blue border (matching the end of Section 2)
      gsap.set(centerRef.current, { 
        backgroundColor: 'transparent',
        border: '1.5px solid #1E49E2',
        scaleY: 1
      });

      // 2. Fill the box and fade in text
      tl.to(centerRef.current, {
        backgroundColor: '#aceaff',
        border: '0px solid transparent',
        duration: 0.8,
        ease: 'power2.inOut'
      });

      tl.fromTo([leftRef.current, rightRef.current], 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
        '-=0.4'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
        overflow: 'hidden',
      }}
    >
      <div 
        className="container mx-auto px-6 lg:px-12"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {/* Responsive wrapper for the 3-column layout */}
        <div className="container mx-auto px-6" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
          gap: '0px'
        }}>
          
          {/* Left Column - Heading */}
          <div 
            ref={leftRef}
            style={{ 
              flex: 1, 
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'flex-start',
              paddingRight: '0px',
              marginRight: '-20px', // Overlap
              position: 'relative',
              zIndex: 10
            }}
          >
            <h2 
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                lineHeight: 1.1,
                color: '#00338d', 
                maxWidth: '500px',
                textTransform: 'none',
              }}
            >
              Creativity<br/>that powers<br/>business
            </h2>
          </div>

          {/* Middle Column - Cyan Rectangle */}
          <div 
            ref={centerRef}
            style={{
              width: 'clamp(200px, 30vw, 450px)', // Increased width
              height: 'clamp(300px, 40vh, 500px)',
              backgroundColor: '#aceaff',
              flexShrink: 0,
              transformOrigin: 'center center',
              boxSizing: 'border-box',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.12)'
            }}
          />

          {/* Right Column - Paragraph */}
          <div 
            ref={rightRef}
            style={{ 
              flex: 1, 
              textAlign: 'left',
              paddingLeft: '0px',
              marginLeft: '-20px', // Overlap
              position: 'relative',
              zIndex: 10
            }}
          >
            <p 
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)',
                lineHeight: 1.6,
                color: '#00338d', 
                maxWidth: '420px'
              }}
            >
              OneCreative is an in-house creative agency delivering creative, digital, and learning design solutions that help businesses communicate effectively and bring their services to market with impact.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
