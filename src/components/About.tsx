import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass } from 'lucide-react';
import aboutContent from '../content/about.json';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((ref, index) => {
        gsap.from(ref, {
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <Compass className="w-8 h-8 text-gray-800" />
          <h2 className="text-4xl font-light">About</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <p ref={el => textRefs.current[0] = el} className="text-lg text-gray-700 mb-8">
              {aboutContent.content.paragraphs[0].text}
            </p>
            <p ref={el => textRefs.current[1] = el} className="text-lg text-gray-700 mb-8">
              {aboutContent.content.paragraphs[1].text}
            </p>
          </div>
          
          <div className="relative h-[400px] md:h-auto">
            <img 
              src={aboutContent.content.image.src}
              alt={aboutContent.content.image.alt}
              className="w-full h-full object-cover object-top rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}