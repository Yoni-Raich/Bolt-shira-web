import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Maximize, Users, CheckSquare } from 'lucide-react';
import { Project } from '../types/project';
import projectsContent from '../content/projects.json';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projectsContent.projects.find(p => p.id === id) as Project;

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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Projects
        </Link>

        {/* Hero Section */}
        <div className="relative h-[70vh] mb-16">
          <img 
            src={project.heroImage} 
            alt={project.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
            <h1 className="text-5xl font-light text-white mb-4">{project.title}</h1>
            <p className="text-white/80">{project.location} • {project.year}</p>
          </div>
        </div>

        {/* Project Info */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-light mb-6">Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-8">{project.description}</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-light mb-4">The Challenge</h3>
                <p className="text-gray-700">{project.challenge}</p>
              </div>
              <div>
                <h3 className="text-xl font-light mb-4">Our Solution</h3>
                <p className="text-gray-700">{project.solution}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light mb-4">Project Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Maximize className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Size</p>
                    <p className="text-gray-600">{project.details.size}</p>
                  </div>
                </div>
                {/* Add more details... */}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-light mb-4">Services</h3>
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

        {/* Gallery */}
        <div>
          <h2 className="text-2xl font-light mb-8">Project Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <div key={index} className="group relative">
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-light mb-2">{image.caption}</h4>
                    <p className="text-sm text-white/80">{image.description}</p>
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