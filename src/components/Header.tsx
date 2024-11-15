import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        },
        yPercent: 50,
        scale: 0.8,
        opacity: 0
      });

      gsap.to(arrowRef.current, {
        y: 8,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    });

    return () => ctx.revert();
  }, []);

  const handleExploreClick = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      (window as any).lenis.scrollTo(projectsSection, {
        duration: 2,
        easing: (t: number) => {
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }
      });
    }
  };

  return (
    <div ref={headerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full opacity-50 blur-sm"
        >
          <source src="public/videos/homepage-back.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10 text-center text-white">
        <h1 ref={titleRef} className="text-7xl md:text-9xl font-light tracking-wider mb-8">
          SHIRA RAICH
        </h1>
        <p className="text-xl md:text-2xl font-light tracking-wide mb-12 opacity-90">
          ARCHITECTURAL DESIGN & INNOVATION
        </p>
        <button 
          onClick={handleExploreClick}
          className="group flex items-center gap-2 mx-auto text-lg border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300"
        >
          Explore Work
          <div ref={arrowRef}>
            <MoveDown className="w-5 h-5" />
          </div>
        </button>
      </div>
    </div>
  );
}