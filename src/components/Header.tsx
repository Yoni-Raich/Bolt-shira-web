import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const architectureRef = useRef<HTMLHeadingElement>(null);
  const namesRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.from(logoRef.current, {
        y: -100,
        opacity: 0,
        duration: 2,
      })
      .from(architectureRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
      }, "-=1") // Start slightly before logo animation ends
      .from(namesRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
      }, "-=1.2");

      // Scroll animation
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

      // Continuous arrow animation
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
          <source src="videos/homepage-back.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>
      
      <div className="relative z-10 text-center text-white">
        <div className="mb-8">
          <img 
            ref={logoRef}
            src="/images/logo3.svg" 
            alt="The Oraison Architecture"
            className="h-80 md:h-[300px] w-auto mx-auto"
          />
        </div>
        <div className="space-y-2 mb-12">
          <h2 
            ref={architectureRef}
            className="text-3xl md:text-5xl font-light tracking-[0.2em]"
          >
            ARCHITECTURE
          </h2>
          <h3 
            ref={namesRef}
            className="text-xl md:text-3xl font-light tracking-wider"
          >
            Shira Raich | Shira Harari
          </h3>
        </div>
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