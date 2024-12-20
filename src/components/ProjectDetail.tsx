import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Maximize, Users, CheckSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Project } from '../types/project';
import projectsContent from '../content/projects.json';
import Masonry from 'react-masonry-css';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ImageViewer from './ImageViewer';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsContent.projects.find(p => p.id === id) as Project;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Only cleanup ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light mb-4">Project Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5" />
          חזרה לפרויקטים
        </Link>

        {/* Hero Section */}
        <div className="relative h-[70vh] mb-16 overflow-hidden rounded-lg">
          <img 
            src={project.heroImage} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-8">
            <h1 className="text-5xl font-light text-white mb-4">{project.title}</h1>
            <p className="text-white/80">{project.location} • {project.year}</p>
          </div>
        </div>

        {/* Project Info */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            {project.description && (
              <>
                <h2 className="text-2xl font-light mb-6">סקירה כללית</h2>
                <p className="text-gray-700 leading-relaxed mb-8">{project.description}</p>
              </>
            )}
            
            <div className="space-y-8">
              {project.challenge && (
                <div>
                  <h3 className="text-xl font-light mb-4">האתגר</h3>
                  <p className="text-gray-700">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div>
                  <h3 className="text-xl font-light mb-4">הפתרון שלנו</h3>
                  <p className="text-gray-700">{project.solution}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light mb-4">פרטי הפרויקט</h3>
              <div className="space-y-4">
                {project.details.size && (
                  <div className="flex items-start gap-3">
                    <Maximize className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">גודל</p>
                      <p className="text-gray-600">{project.details.size}</p>
                    </div>
                  </div>
                )}
                {project.details.duration && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">משך הפרויקט</p>
                      <p className="text-gray-600">{project.details.duration}</p>
                    </div>
                  </div>
                )}
                {project.details.client && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium">לקוח</p>
                      <p className="text-gray-600">{project.details.client}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {project.details.services.length > 0 && (
              <div>
                <h3 className="text-xl font-light mb-4">שירותים</h3>
                <div className="space-y-2">
                  {project.details.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <CheckSquare className="w-4 h-4" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gallery - Only show if there are images */}
        {project.gallery.length > 0 && (
          <div>
            <h2 className="text-2xl font-light mb-8">גלריית הפרויקט</h2>
            <div className="gallery-wrap">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="gallery-item cursor-pointer"
                  style={{ backgroundImage: `url(${image.url})` }}
                  onClick={() => setSelectedImage(image.url)}
                >
                  {(image.caption || image.description) && (
                    <div className="gallery-item-content opacity-0 group-hover:opacity-100">
                      <div className="absolute bottom-4 right-4 text-white">
                        {image.caption && (
                          <h4 className="text-lg font-light mb-2">{image.caption}</h4>
                        )}
                        {image.description && (
                          <p className="text-sm text-white/80">{image.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Image Viewer */}
            {selectedImage && (
              <ImageViewer 
                imageUrl={selectedImage} 
                onClose={() => setSelectedImage(null)} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
} 