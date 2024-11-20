import { useEffect, useState } from 'react';

export default function Loading() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Start the animation
    const timer = setTimeout(() => {
      document.getElementById("loading-page")?.classList.add("loaded");
      document.getElementById("loader")?.classList.add("opzero");
      document.getElementById("lastray")?.classList.add("finalray");
      document.body.classList.add("whitebk");
      setAnimationComplete(true);
    }, 2000); // Reduced from 6500 to 2000 for better UX

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container">
        <p>.</p>
      </div>
      <div id="loading-page" className={animationComplete ? 'loaded' : ''}>
        <div id="loader" className={animationComplete ? 'opzero' : ''}>
          <div className="particles element">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`spark${i + 1} spark element`}>
                <div className={`particle${i + 1} particle element`}></div>
              </div>
            ))}
          </div>
          <div className="ray element"></div>
          <div className="sphere element"></div>
        </div>
      </div>
      <div id="lastray" className={`element ${animationComplete ? 'finalray' : ''}`}></div>
    </>
  );
} 