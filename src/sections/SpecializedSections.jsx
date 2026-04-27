import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

/* ── All asset images ─────────────────────────────────────── */
import img01 from '../assets/images/llxvisuals-eSLJG0y5S4U-unsplash.jpg';
import img02 from '../assets/images/mike-hindle-XIWA8_767pU-unsplash.jpg';
import img03 from '../assets/images/marek-piwnicki-NwZmYW5ETnE-unsplash.jpg';
import img04 from '../assets/images/nasa-hubble-space-telescope-oKR1KYjm8C0-unsplash.jpg';
import img05 from '../assets/images/tianlei-wu-TzKBCfzQ2WI-unsplash.jpg';
import img06 from '../assets/images/dmitry-kropachev-_uL1v6AuudQ-unsplash.jpg';
import img07 from '../assets/images/ian-lhPNTD2ii0U-unsplash.jpg';
import img08 from '../assets/images/eugene-golovesov-vTJQzJRmSLQ-unsplash.jpg';
import img09 from '../assets/images/leon-rohrwild-MxcwgJGO-Us-unsplash.jpg';
import img10 from '../assets/images/louis-gaudiau-jpxOY5OdFpc-unsplash.jpg';
import img11 from '../assets/images/nowbelov-Zn3QjwsN2Q0-unsplash.jpg';
import img12 from '../assets/images/quentin-schulz-URfsKbjVA2Q-unsplash.jpg';
import img13 from '../assets/images/thibault-henry-HIWj0F3Xsxc-unsplash.jpg';
import img14 from '../assets/images/mike-hindle-n73nY4TfKZ8-unsplash.jpg';
import pillar1 from '../assets/images/pillar-1.jpg';
import pillar2 from '../assets/images/pillar-2.jpg';
import pillar3 from '../assets/images/pillar-3.jpg';
import pillar4 from '../assets/images/pillar-4.jpg';
import insp1 from '../assets/images/insp-1.jpg';
import insp2 from '../assets/images/insp-2.jpg';
import pillarsBg from '../assets/images/pillars-bg.jpg';

/* ─── Right-side clickable dot pagination (only navigation) ── */
const SidebarDots = ({ total, active, swiperRef }) => (
  <div style={{
    position: 'absolute', 
    right: 30, 
    top: '50%', 
    transform: 'translateY(-50%)',
    display: 'flex', 
    flexDirection: 'column', 
    gap: 12,
    zIndex: 50, // Higher z-index to stay above everything
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

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — Design Strategy  (5 slides)
   Now with pillars-bg.jpg background
═══════════════════════════════════════════════════════════ */
export const SectionDesignStrategy = () => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    { title: 'Design Strategy',    img: pillar1 },
    { title: 'Visual Storytelling', img: pillar2 },
    { title: 'Creative Direction',  img: pillar3 },
    { title: 'Future Vision',       img: pillar4 },
    { title: 'Digital Innovation',  img: pillar1 },
  ];

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
        {slides.map((slide, i) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container mx-auto px-6" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Heading overlapping image top */}
              <h1 className="content-creation-title section-heading" style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)',
                textAlign: 'center', textTransform: 'none',
                lineHeight: 1, fontWeight: 900, width: '100%',
                position: 'relative', zIndex: 2,
                marginBottom: '-1.4vw',
              }}>
                {slide.title}
              </h1>

              {/* Panoramic image — no border radius */}
              <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '42vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                <img src={slide.img} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Services button */}
              <button style={{
                marginTop: '2.2rem', width: 220, padding: '12px 0',
                border: '1px solid rgba(255,255,255,0.5)',
                color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)',
                fontSize: 13, letterSpacing: '0.25em',
                textTransform: 'uppercase', fontWeight: 600,
                background: 'transparent', cursor: 'pointer',
                borderRadius: 0,
              }}>
                Services
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={slides.length} active={active} swiperRef={swiperRef} />
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — Exploring New Possibilities  (5 slides)
═══════════════════════════════════════════════════════════ */
export const SectionExploring = () => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    { lines: ['Exploring New', 'Possibilities'], app: 'Application 1', desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type." },
    { lines: ['Innovating', 'Beyond Limits'],    app: 'Application 2', desc: 'Crafting the future of digital interaction through bold design and innovative technology solutions that push boundaries and redefine user experiences.' },
    { lines: ['Designing', 'The Future'],        app: 'Application 3', desc: 'Empowering organisations to reimagine their digital footprint through immersive experiences and cutting-edge interface design philosophies.' },
    { lines: ['Building', 'Tomorrow'],           app: 'Application 4', desc: 'Transforming complex data into intuitive visual narratives that drive decision-making and unlock hidden value across the enterprise.' },
    { lines: ['Creating', 'Impact'],             app: 'Application 5', desc: 'Delivering solutions that bridge strategy and execution, turning ambitious ideas into tangible, scalable digital products for the modern era.' },
  ];

  const ringColors = ['#1E49E2', '#7213EA', '#00338D', '#FD349C', '#0C233C'];

  return (
    <section style={{ position: 'relative', width: '100%', background: '#00B8F5', overflow: 'hidden', padding: '80px 0' }}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%' }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container mx-auto px-6" style={{ 
              width: '100%', 
              height: '450px', 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>

              {/* CENTER CIRCLE (DONUT) */}
              <div 
                className="force-round"
                style={{ 
                  width: 'clamp(300px, 35vw, 450px)', 
                  height: 'clamp(300px, 35vw, 450px)', 
                  backgroundColor: ringColors[i],
                  position: 'relative',
                  zIndex: 5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 60px rgba(0,0,0,0.15)'
                }}
              >
                <div 
                  className="force-round"
                  style={{ 
                    width: '32%', height: '32%', 
                    backgroundColor: '#00B8F5', // Section Background
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                   {/* WHITE DOT */}
                   <div 
                      className="force-round"
                      style={{ 
                        position: 'absolute', 
                        width: 'min(20px, 4vw)', 
                        height: 'min(20px, 4vw)', 
                        backgroundColor: '#fff', 
                        right: 'calc(-1 * min(10px, 2vw))', 
                        top: '50%', 
                        transform: 'translateY(-50%)',
                        boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                      }} 
                   />
                </div>
              </div>

              {/* LEFT TITLE — Overlapping Donut */}
              <div style={{ 
                position: 'absolute', 
                zIndex: 10,
                right: 'calc(50% + 5%)', // Start slightly inside the circle
                textAlign: 'right',
                width: '40%'
              }}>
                <h1 className="content-creation-title section-heading" style={{ 
                  fontSize: 'clamp(2.5rem, 5.5vw, 4.8rem)', 
                  textTransform: 'none', 
                  fontWeight: 900, 
                  lineHeight: 0.9,
                  color: '#fff',
                  fontFamily: 'var(--font-heading)'
                }}>
                  {slide.lines.map((line, j) => <span key={j} style={{ display: 'block' }}>{line}</span>)}
                </h1>
              </div>

              {/* RIGHT CONTENT — Starting near edge of Donut */}
              <div style={{ 
                position: 'absolute', 
                zIndex: 10,
                left: 'calc(50% + 12%)', // Start near the edge of the hole/donut
                textAlign: 'left',
                width: '32%'
              }}>
                <h3 style={{ 
                  fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', 
                  fontWeight: 800, 
                  color: '#fff', 
                  fontFamily: 'var(--font-body)', 
                  marginBottom: 14 
                }}>
                  {slide.app}
                </h3>
                <p style={{ 
                  fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', 
                  lineHeight: 1.6, 
                  color: 'rgba(255,255,255,0.9)', 
                  fontFamily: 'var(--font-body)' 
                }}>
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={slides.length} active={active} swiperRef={swiperRef} />
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — Inspiration Meets Technology  (5 slides)
═══════════════════════════════════════════════════════════ */
export const SectionInspiration = () => {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    { mainTitle: 'Inspiration Meets Technology', projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: insp1 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: insp2 }] },
    { mainTitle: 'Innovation Drives Progress',   projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img08 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img09 }] },
    { mainTitle: 'Where Art Meets Purpose',      projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img10 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img11 }] },
    { mainTitle: 'Vision Beyond Boundaries',     projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img12 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img13 }] },
    { mainTitle: 'Stories That Move People',     projects: [{ title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img14 }, { title: 'Title of Project', desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', img: img01 }] },
  ];

  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      background: '#00B8F5', 
      padding: '80px 0',
      minHeight: '100vh',
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.activeIndex)}
        style={{ width: '100%' }}
      >
        {slides.map((slide, si) => (
          <SwiperSlide key={si} style={{ display: 'flex', alignItems: 'flex-start', height: 'auto' }}>
            <div className="container mx-auto px-6 relative" style={{ width: '100%', display: 'flex', flexDirection: 'column', height: 'auto', maxWidth: '1200px' }}>

              {/* Heading */}
              <h1 className="content-creation-title section-heading" style={{
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                textAlign: 'center', 
                textTransform: 'none',
                lineHeight: 1, 
                fontWeight: 900,
                marginBottom: '4rem', 
                flexShrink: 0,
                color: '#fff'
              }}>
                {slide.mainTitle}
              </h1>

              {/* Cards Wrapper */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30, position: 'relative' }}>
                {slide.projects.map((proj, pi) => (
                  <div key={pi} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    
                    {/* Background Number (partially hidden) */}
                    <div style={{ 
                      position: 'absolute', 
                      left: '10px', // Number starts 10px inside, so with font size it will peek out
                      transform: 'translateX(-85%)', // Push it out so most of it peeks out
                      fontSize: 'clamp(6rem, 12vw, 10rem)', 
                      fontWeight: 900, 
                      color: 'rgba(255,255,255,0.12)', 
                      lineHeight: 1,
                      zIndex: 0,
                      userSelect: 'none'
                    }}>
                      0{pi + 1}
                    </div>

                    {/* The Card */}
                    <div style={{ 
                      position: 'relative', 
                      zIndex: 5, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 40, 
                      backgroundColor: '#1E49E2', // Bright Blue
                      padding: '2.5rem 3rem', 
                      width: '100%',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
                    }}>
                      
                      {/* Image Container with background border */}
                      <div style={{ position: 'relative', width: '48%', flexShrink: 0 }}>
                        {/* Background border frame — extended top/bottom only */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '-15px', 
                          bottom: '15px', 
                          left: '0', 
                          right: '0', 
                          borderTop: '2.5px solid rgba(255,255,255,0.7)', 
                          borderBottom: '2.5px solid rgba(255,255,255,0.7)', 
                          borderLeft: '2.5px solid rgba(255,255,255,0.7)',
                          borderRight: '2.5px solid rgba(255,255,255,0.7)',
                          zIndex: -1 
                        }} />
                        
                        {/* Main Image */}
                        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#000' }}>
                          <img 
                            src={proj.img} 
                            alt={proj.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{ 
                          fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', 
                          fontWeight: 800, 
                          color: '#fff', 
                          fontFamily: 'var(--font-body)', 
                          marginBottom: 12,
                          lineHeight: 1.2
                        }}>
                          {proj.title}
                        </h3>
                        <p style={{ 
                          fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', 
                          lineHeight: 1.6, 
                          color: 'rgba(255,255,255,0.9)', 
                          fontFamily: 'var(--font-body)',
                          maxWidth: '90%'
                        }}>
                          {proj.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SidebarDots total={slides.length} active={active} swiperRef={swiperRef} />
    </section>
  );
};
