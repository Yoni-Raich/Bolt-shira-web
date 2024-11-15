export interface ProjectGalleryItem {
  url: string;
  caption: string;
  description: string;
}

export interface ProjectDetails {
  size: string;
  duration: string;
  completion: string;
  client: string;
  services: string[];
}

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  thumbnail: string;
  heroImage: string;
  description: string;
  challenge: string;
  solution: string;
  details: ProjectDetails;
  gallery: ProjectGalleryItem[];
}

export interface ProjectsContent {
  title: string;
  projects: Project[];
} 