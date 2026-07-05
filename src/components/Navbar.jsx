import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const showcase = document.getElementById('showcase');
      if (!showcase) {
        // Fallback for pages without #showcase section (e.g. Resume, Contact)
        const threshold = 150;
        const currentScroll = window.scrollY;
        const opacity = Math.min(currentScroll / threshold, 1);
        setScrollOpacity(opacity);
        return;
      }

      // Homepage: transition based on Showcase section position
      const rect = showcase.getBoundingClientRect();
      const showcaseTop = rect.top;
      
      const startTransitionAt = 250; // start darkening when showcase is 250px from top of viewport
      const endTransitionAt = 80;    // fully dark when showcase is 80px from top of viewport

      if (showcaseTop > startTransitionAt) {
        setScrollOpacity(0);
      } else if (showcaseTop < endTransitionAt) {
        setScrollOpacity(1);
      } else {
        const totalDistance = startTransitionAt - endTransitionAt;
        const currentDistance = startTransitionAt - showcaseTop;
        const opacity = Math.min(currentDistance / totalDistance, 1);
        setScrollOpacity(opacity);
      }
    };

    // Initialize position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Showcase', path: '/#showcase' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (e, path) => {
    setIsOpen(false);
    
    // Custom handling for hash links (e.g. /#showcase)
    if (path.includes('#')) {
      e.preventDefault();
      const [route, hash] = path.split('#');
      
      if (location.pathname === route || (location.pathname === '/' && route === '')) {
        // We are already on the target page, just scroll
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to route, wait, then scroll
        navigate(route);
        setTimeout(() => {
          const targetElement = document.getElementById(hash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const isOpaque = scrollOpacity === 1 || isOpen;

  const headerStyle = {
    background: isOpaque ? 'var(--nav-bg)' : 'transparent',
    backdropFilter: isOpaque ? 'blur(16px)' : 'none',
    WebkitBackdropFilter: isOpaque ? 'blur(16px)' : 'none',
    borderBottom: `1px solid ${isOpaque ? 'var(--card-border)' : 'transparent'}`,
    boxShadow: isOpaque ? '0 10px 30px -10px rgba(0, 0, 0, 0.15)' : 'none',
    padding: `${1.25 - (isOpaque ? 1 : scrollOpacity) * 0.4}rem 0`,
    transition: 'background 0.3s ease, border-bottom 0.3s ease, padding 0.3s ease'
  };

  return (
    <header className={`navbar ${isOpaque ? 'navbar-scrolled' : ''}`} style={headerStyle}>
      <div className="container nav-container">
        <div className="logo">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="brand-name">Vaibhav Mishra</span>
            <span className="brand-title">Engineering Undergraduate</span>
          </Link>
        </div>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul>
            {navLinks.map((link) => {
              const isHash = link.path.includes('#');
              const isActive = isHash 
                ? location.pathname === '/' && location.hash === `#${link.path.split('#')[1]}`
                : location.pathname === link.path;

              return (
                <li key={link.name}>
                  {isHash ? (
                    <a
                      href={link.path}
                      className={`nav-link ${isActive ? 'active-link' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.path)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className={`nav-link ${isActive ? 'active-link' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-actions">
          <button 
            className="theme-toggle-btn"
            onClick={() => setTheme(theme === 'light' ? 'default' : 'light')}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
