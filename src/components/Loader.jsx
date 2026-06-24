import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger the exit transition class at 4.2s (84% of the 5.0s timeline)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 4200);

    // Call onComplete at 5.0s to unmount the loader once the transition finishes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`app-loader ${isExiting ? 'loader-exit' : ''}`}>
      <div className="loader-content-wrapper">
        <div id="dark-bookshelf"></div>
      </div>
    </div>
  );
};

export default Loader;
