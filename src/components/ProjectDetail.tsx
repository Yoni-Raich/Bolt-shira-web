import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Maximize, CheckSquare } from 'lucide-react';
import gsap from 'gsap';
import projectsContent from '../content/projects.json';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsContent.projects.find(p => p.id === id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.animate-fade-up', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!project) return <div>Project not found</div>;

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 animate-fade-up"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-up">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-[600px] object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="space-y-8 animate-fade-up">
            <div>
              <h1 className="text-4xl font-light mb-4">{project.title}</h1>
              <p className="text-gray-600">{project.location} • {project.year}</p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Maximize className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Size</p>
                  <p className="text-gray-600">{project.details.size}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-gray-600">{project.details.duration}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Services Provided</h3>
              <div className="space-y-2">
                {project.details.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckSquare className="w-4 h-4" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="animate-fade-up">
          <h2 className="text-2xl font-light mb-8">Project Gallery</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 