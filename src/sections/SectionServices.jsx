import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Card icon components (blue stroke) ──────────── */
const IconScissors = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconChart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round">
    <path d="M18 20V10M12 20V4M6 20v-6"/>
  </svg>
);
const IconStar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const CARDS = [
  { id: 'uk-create',            title: ['UK', 'Create'],            Icon: IconScissors },
  { id: 'us-creative-services', title: ['US Creative', 'Services'], Icon: IconGlobe    },
  { id: 'us-advisory-creative', title: ['US Advisory', 'Creative'], Icon: IconChart    },
  { id: 'uk-learning-design',   title: ['UK Learning', 'Design'],   Icon: IconStar     },
];

export const SectionServices = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

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
        padding: '60px 0', // Reduced padding
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="services-grid-responsive">
          {CARDS.map((card, i) => {
            const { Icon } = card;
            return (
              <Link
                key={i}
                to={`/service/${card.id}`}
                ref={el => (cardRefs.current[i] = el)}
                style={{
                  width: '100%',
                  maxWidth: '350px',
                  height: 'clamp(450px, 55vh, 600px)', // Increased height
                  backgroundColor: '#00B8F5',
                  borderRadius: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 24,
                  position: 'relative',
                  justifySelf: 'center',
                  willChange: 'transform, opacity',
                  boxShadow: '0 10px 30px rgba(0, 184, 245, 0.15)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 15px 40px rgba(0, 184, 245, 0.25)',
                  }
                }}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
              {/* Top-left icon */}
              <div style={{ opacity: 0.8 }}><Icon /></div>

              {/* Center text */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                    fontWeight: 700,
                    textAlign: 'center',
                    lineHeight: 1.1,
                    color: '#FFFFFF', 
                    textTransform: 'none',
                  }}
                >
                  {card.title.map((line, j) => (
                    <span key={j} style={{ display: 'block', color: '#FFFFFF' }}>{line}</span>
                  ))}
                </h2>
              </div>

              {/* Bottom-right icon */}
              <div style={{ alignSelf: 'flex-end', opacity: 0.8 }}><Icon /></div>
            </Link>
          );
        })}
        </div>
      </div>
    </section>
  );
};
