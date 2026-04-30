import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// Import assets
import bannerBg from '../assets/images/service-banner-bg.jpeg';
import pillarsBg from '../assets/images/pillars-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ─── Right-side clickable dot pagination ─── */
const SidebarDots = ({ total, active, swiperRef }) => (
  <div style={{
    position: 'absolute', 
    right: 30, 
    top: '50%', 
    transform: 'translateY(-50%)',
    display: 'flex', 
    flexDirection: 'column', 
    gap: 12,
    zIndex: 50,
  }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        onClick={() => swiperRef.current?.slideTo(i)}
        style={{
          width: 18, 
          height: 18,
          borderRadius: 0,
          border: '2px solid rgba(255,255,255,0.6)',
          backgroundColor: i === active ? 'rgba(255,255,255,0.9)' : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: i === active ? '0 0 10px rgba(255,255,255,0.3)' : 'none'
        }}
      />
    ))}
  </div>
);

/* ── Section 1: Service Banner ── */
export const ServiceBanner = ({ title = [], description = "" }) => {
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
          start: 'top 80%',
        }
      });

      gsap.set(centerRef.current, { 
        backgroundColor: 'transparent',
        border: '1.5px solid #1E49E2',
        scaleY: 1
      });

      tl.to(centerRef.current, {
        backgroundColor: '#00338d',
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
        backgroundImage: `url(${bannerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
        overflow: 'hidden',
        position: 'relative'
      }}
    >

      <div 
        className="container mx-auto px-6 lg:px-12 relative z-10"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
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
              marginRight: '-20px',
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
                color: '#FFFFFF', 
                maxWidth: '500px',
                textTransform: 'none',
              }}
            >
              {title.map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
            </h2>
          </div>

          {/* Middle Column - Dark Blue Rectangle */}
          <div 
            ref={centerRef}
            style={{
              width: 'clamp(200px, 30vw, 450px)',
              height: 'clamp(300px, 40vh, 500px)',
              backgroundColor: '#00338d',
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
              marginLeft: '-20px',
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
                color: '#FFFFFF', 
                maxWidth: '420px'
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Section 2: Service Detail Slider ── */
export const ServiceDetailSlider = ({ slides = [] }) => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  // Dynamically import images if needed, but here we assume they are passed as paths
  // and we will require them or use a resolver.
  // For now, let's assume the images are in src/assets/images and we'll use a dynamic import style if possible
  // or just use the names.
  
  // Since we copied them to src/assets/images, we can try to resolve them.
  // Actually, it's easier to import them all here if they are known.
  
  const [resolvedSlides, setResolvedSlides] = useState([]);

  useEffect(() => {
    const loadImages = () => {
      const updatedSlides = slides.map((slide) => {
        // Use new URL() for Vite asset resolution
        const imgUrl = new URL(`../assets/images/${slide.image}`, import.meta.url).href;
        return { ...slide, img: imgUrl };
      });
      setResolvedSlides(updatedSlides);
    };

    if (slides.length > 0) {
      loadImages();
    }
  }, [slides]);

  if (resolvedSlides.length === 0) return null;

  return (
    <section 
      style={{ 
        position: 'relative', 
        width: '100%', 
        backgroundImage: `url(${pillarsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        padding: '80px 0'
      }}
    >
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%' }}
      >
        {resolvedSlides.map((slide, i) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container mx-auto px-6" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Heading overlapping image top */}
              <h1 className="content-creation-title section-heading" style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                textAlign: 'center', textTransform: 'none',
                lineHeight: 1, fontWeight: 900, width: '100%',
                position: 'relative', zIndex: 2,
                marginBottom: '-1.4vw',
                color: '#FFFFFF !important'
              }}>
                {slide.title}
              </h1>

              {/* Panoramic image */}
              <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '42vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                <img src={slide.img} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Description */}
              <p style={{
                marginTop: '2rem',
                color: '#FFFFFF',
                fontSize: 'clamp(1rem, 1.2vw, 1.25rem)',
                textAlign: 'center',
                maxWidth: '800px',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.6
              }}>
                {slide.desc}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={resolvedSlides.length} active={active} swiperRef={swiperRef} />
    </section>
  );
};
