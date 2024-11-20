import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loading from './components/Loading';
import ProjectDetail from './components/ProjectDetail';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    const resetScroll = () => {
      if ((window as any).lenis) {
        (window as any).lenis.stop();
        
        // Force immediate scroll reset
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Reset Lenis scroll position
        (window as any).lenis.scrollTo(0, { immediate: true, force: true });
        
        // Restart Lenis after a brief delay
        setTimeout(() => {
          (window as any).lenis.start();
        }, 100);
      }
    };

    // Execute scroll reset immediately
    resetScroll();
    
    // Also try again after a short delay to ensure it works
    const timer = setTimeout(resetScroll, 50);
    
    return () => clearTimeout(timer);
  }, [location]);

  return null;
}

function AppContent() {
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
      touchMultiplier: 1.5,
      touchInertiaMultiplier: 1.5,
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
    <>
      <ScrollToTop />
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
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <AppContent />
    </BrowserRouter>
  );
}