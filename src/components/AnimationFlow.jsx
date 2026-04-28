import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimationFlow = () => {
  const containerRef = useRef(null);
  const startSectionRef = useRef(null);
  const endSectionRef = useRef(null);
  const boxesRef = useRef([]);
  const mergedBoxRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const vh = window.innerHeight;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: startSectionRef.current,
          start: "center center", 
          endTrigger: endSectionRef.current,
          end: "center center",
          scrub: 1, // Smooth scrub for scroll-linked animation
        }
      });

      // Initial layout: 4 boxes spread out
      gsap.set(boxesRef.current[0], { xPercent: -50, yPercent: -50, x: -120, y: -120 });
      gsap.set(boxesRef.current[1], { xPercent: -50, yPercent: -50, x: 120, y: -120 });
      gsap.set(boxesRef.current[2], { xPercent: -50, yPercent: -50, x: -120, y: 120 });
      gsap.set(boxesRef.current[3], { xPercent: -50, yPercent: -50, x: 120, y: 120 });
      
      // Setup the merged box (initially hidden)
      gsap.set(mergedBoxRef.current, { 
        xPercent: -50, 
        yPercent: -50, 
        x: 0, 
        y: 0, 
        scale: 0.8,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)", 
        filter: "blur(4px)" 
      });

      // Step 2: Merge + Move Down
      tl.to(boxesRef.current, {
        x: 0,
        y: vh * 0.15, // Move downwards while merging
        scale: 0.8,
        opacity: 0,
        duration: 2,
        stagger: 0.1, // Stagger for 4 boxes
        ease: "power3.inOut"
      }, 0);

      // Fade in the merged box precisely as the 4 boxes converge
      tl.fromTo(mergedBoxRef.current,
        { opacity: 0, scale: 0.8, y: vh * 0.05, filter: "blur(4px)" },
        { opacity: 1, y: vh * 0.15, scale: 0.8, filter: "blur(2px)", boxShadow: "0 15px 40px rgba(0,0,0,0.15)", duration: 1.5, ease: "power3.inOut" },
        0.5 // Slight offset to blend seamlessly
      );

      // Step 3 & 4: Floating Transition & Align at Next Section Top Center
      tl.to(mergedBoxRef.current, {
        y: vh * 0.5, // 50vh down perfectly aligns with the top of the next section
        ease: "none", // Linear movement for natural floating continuity
        duration: 3
      }, 2);

      // Step 5: Move to Center + Final Transform
      tl.to(mergedBoxRef.current, {
        y: vh * 1.0, // 100vh down matches the exact center of Intro End section
        width: "90vw", // Size increases dramatically
        height: "80vh",
        backgroundColor: "#2563eb", // Highlight color
        borderRadius: "32px", // Smooth rounded corners
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.3)",
        filter: "blur(0px)", // Blur reduction when final
        duration: 3,
        ease: "power2.inOut"
      }, 5);

      // Step 6: Content Reveal
      tl.fromTo(headingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" },
        8
      );

      tl.fromTo(contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" },
        8.5 // Slight delay
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* Absolute Layer for Transform-Based Floating Animations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
        {/* top-[150vh] places the base coordinates perfectly in the center of Intro Start */}
        <div className="absolute top-[150vh] left-1/2 w-full h-full">
          
          {/* Initial 4 Boxes */}
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i}
              ref={el => boxesRef.current[i] = el} 
              className="absolute w-20 h-20 bg-white rounded-2xl opacity-100" 
              style={{ willChange: "transform, opacity" }}
            />
          ))}

          {/* Merged Box */}
          <div 
            ref={mergedBoxRef} 
            className="absolute w-20 h-20 bg-white rounded-2xl flex items-center justify-center opacity-0"
            style={{ willChange: "transform, width, height, opacity, filter, background-color, border-radius" }}
          />
          
        </div>
      </div>

      {/* Spacer to allow scrolling before animation starts */}
      <div className="h-screen w-full flex items-center justify-center border-b border-white/5">
        <p className="text-gray-500 uppercase tracking-widest text-sm">Scroll Down to Begin</p>
      </div>

      {/* Intro Start Section */}
      <section ref={startSectionRef} className="h-screen w-full relative flex items-center justify-center border-b border-white/5">
        <h2 className="text-4xl text-white/20 font-light tracking-widest uppercase">Intro Start</h2>
      </section>

      {/* Intro End Section */}
      <section ref={endSectionRef} className="h-screen w-full relative flex items-center justify-center">
        <div className="relative z-20 max-w-6xl w-full px-8 flex flex-col md:flex-row items-center justify-between gap-16">
          <div ref={headingRef} className="w-full md:w-1/2 opacity-0">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Smooth <br/> <span className="text-white drop-shadow-md">Transform.</span>
            </h2>
          </div>
          <div ref={contentRef} className="w-full md:w-1/2 opacity-0">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
              The 4 boxes seamlessly morph into a single layout element. 
              This creates a premium, native-feeling experience directly driven by your scroll momentum.
            </p>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling past */}
      <div className="h-[50vh] w-full" />
    </div>
  );
};

export default AnimationFlow;
