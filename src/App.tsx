import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loading from './components/Loading';
import ProjectDetail from './components/ProjectDetail';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new (window as any).Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect GSAP ScrollTrigger and Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Track when all resources are loaded
    const handleLoad = () => {
      const images = Array.from(document.images);
      const videos = Array.from(document.getElementsByTagName('video'));
      
      Promise.all([
        // Wait for all images to load
        ...images.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve; // Handle error cases as well
          });
        }),
        // Wait for videos to load metadata
        ...videos.map(video => {
          if (video.readyState >= 2) return Promise.resolve();
          return new Promise(resolve => {
            video.onloadeddata = resolve;
            video.onerror = resolve;
          });
        })
      ]).then(() => {
        setIsLoading(false);
      });
    };

    // Start tracking after DOM is ready
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={
            <main className="bg-white">
              <Header />
              <div dir="rtl">
                <About />
                <Projects />
                <Contact />
              </div>
            </main>
          } />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;