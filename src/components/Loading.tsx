import { useEffect } from 'react';

export default function Loading() {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("loading-page")?.classList.add("loaded");
      document.getElementById("loader")?.classList.add("opzero");
      document.getElementById("lastray")?.classList.add("finalray");
      document.body.classList.add("whitebk");
    }, 6500);
  }, []);

  return (
    <>
      <div className="container">
        <p>.</p>
      </div>
      <div id="loading-page">
        <div id="loader">
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
      <div id="lastray" className="element"></div>
    </>
  );
} 