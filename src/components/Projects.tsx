import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2 } from 'lucide-react';
import projectsContent from '../content/projects.json';
import { Link } from 'react-router-dom';

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((ref, index) => {
        gsap.from(ref, {
          scrollTrigger: {
            trigger: ref,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          x: index % 2 === 0 ? -100 : 100,
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
    <section id="projects" ref={sectionRef} className="min-h-screen bg-gray-50 py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <Building2 className="w-8 h-8 text-gray-800" />
          <h2 className="text-4xl font-light">{projectsContent.title}</h2>
        </div>

        <div className="grid gap-12">
          {projectsContent.projects.map((project, index) => (
            <div
              key={project.title}
              ref={el => projectRefs.current[index] = el}
            >
              <Link to={`/project/${project.id}`} className="group relative overflow-hidden rounded-lg shadow-xl cursor-pointer block">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                    <p className="text-sm opacity-80">{project.location} • {project.year}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}