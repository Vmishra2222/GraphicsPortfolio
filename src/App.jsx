import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Loader from './components/Loader';
import FontPreview from './pages/FontPreview';
import GradientPreview from './pages/GradientPreview';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Global mouse position tracking for high-performance CSS parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate coordinates from -1 to 1 based on center of screen
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      // Update CSS variables on document root
      document.documentElement.style.setProperty('--mouse-x', x.toFixed(3));
      document.documentElement.style.setProperty('--mouse-y', y.toFixed(3));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Router>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fonts" element={<FontPreview />} />
          <Route path="/gradients" element={<GradientPreview />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </>
  );
}

export default App;
