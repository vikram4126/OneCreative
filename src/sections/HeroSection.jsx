import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SectionHero = () => {
  const sectionRef   = useRef(null);
  const centerBoxRef = useRef(null);
  const cardRefs     = useRef([]);

  useEffect(() => {
    const cards     = cardRefs.current.filter(Boolean);
    const centerBox = centerBoxRef.current;

    const ctx = gsap.context(() => {
      if (!sectionRef.current || cards.length === 0 || !centerBox) return;

      // PHASE 1: Auto-Play Intro (No scrub)
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: sectionRef.current.closest('main') || window,
          start: 'top 20%', // Play when land on section
          toggleActions: 'play none none none',
        }
      });

      gsap.set(cards, { opacity: 0 });
      gsap.set(centerBox, {
        width: 0,
        height: 2,
        backgroundColor: '#1E49E2',
        border: 'none',
        opacity: 1
      });

      const firstCard = cards[0];
      const cardWidth = firstCard.offsetWidth;
      const cardHeight = firstCard.offsetHeight;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionCenterX = sectionRect.left + sectionRect.width / 2;
      const sectionCenterY = sectionRect.top + sectionRect.height / 2;

      const cardTransforms = cards.map(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        return {
          x: sectionCenterX - cardCenterX,
          y: sectionCenterY - cardCenterY
        };
      });

      introTl.to(centerBox, { width: cardWidth, duration: 0.5, ease: 'power2.inOut' })
             .set(centerBox, { backgroundColor: 'transparent', border: '1.5px solid #1E49E2' })
             .to(centerBox, { height: cardHeight, duration: 0.6, ease: 'power2.inOut' })
             .set(centerBox, { opacity: 0 })
             .set(cards, {
                opacity: 1,
                x: (i) => cardTransforms[i].x,
                y: (i) => cardTransforms[i].y,
                backgroundColor: 'transparent',
                boxShadow: 'none'
             })
             .to(cards, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.04,
                backgroundColor: 'rgba(245,247,250,0.95)',
                boxShadow: '0 8px 40px rgba(30,73,226,0.06)',
             });

      // PHASE 2: Scrubbed Merge (On Scroll Out)
      const mergeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: sectionRef.current.closest('main') || window,
          start: 'top top',
          end: '+=800',
          pin: true,
          scrub: 1,
        }
      });

      mergeTl.to(cards, {
        x: (i) => cardTransforms[i].x,
        y: (i) => cardTransforms[i].y,
        duration: 1,
        ease: 'power3.inOut',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      })
      .set(centerBox, { opacity: 1 })
      .to(cards, { opacity: 0, duration: 0.2 }, '<');

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        padding: '100px 0',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #EEF3FF 0%, #FFFFFF 70%)',
        pointerEvents: 'none',
      }} />

      <div 
        ref={centerBoxRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 50,
          boxSizing: 'border-box'
        }}
      />

      <div
        className="container mx-auto"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          padding: '0',
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={el => (cardRefs.current[i] = el)}
            style={{
              width: '160px',
              height: '220px',
              border: '2px solid #1E49E2',
              position: 'relative',
              willChange: 'transform, opacity, height, width',
              opacity: 0, 
              borderRadius: '0px',
            }}
          />
        ))}
      </div>
    </section>
  );
};
