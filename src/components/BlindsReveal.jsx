import { useEffect, useRef, useState } from 'react';
import './BlindsReveal.css';

const BlindsReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    let observer;
    const currentRef = domRef.current;

    // Use a timeout to let the page layout settle before registering observers.
    // This prevents sections further down from intersecting prematurely during mount.
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        { 
          threshold: 0.05,
          rootMargin: '0px 0px -100px 0px' // Start unrolling when section is 100px into the viewport
        }
      );

      if (currentRef) {
        observer.observe(currentRef);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (observer && currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={domRef} style={{ width: '100%', position: 'relative' }}>
      <div
        className={`blinds-reveal-container ${isVisible ? 'unrolled' : ''}`}
        style={{
          transitionDelay: `${delay}s`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BlindsReveal;
