import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, User, BookOpen, Camera, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './AboutModal.css';

const AboutModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const socials = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vaibhav-mishra-2bb899320/',
      icon: <FaLinkedin size={18} />,
      handle: 'vaibhav-mishra-2bb899320',
      color: '#0077b5',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Vmishra2222',
      icon: <FaGithub size={18} />,
      handle: 'Vmishra2222',
      color: '#ffffff',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/shabdless',
      icon: <SiLeetcode size={18} />,
      handle: 'shabdless',
      color: '#f59e0b',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/v.shabdless',
      icon: <FaInstagram size={18} />,
      handle: 'v.shabdless',
      color: '#e1306c',
    },
    {
      name: 'Email',
      url: 'mailto:vaibhavmishra.lalpania.dav@gmail.com',
      icon: <FaEnvelope size={18} />,
      handle: 'vaibhavmishra.lalpania.dav',
      color: '#10b981',
    }
  ];

  return (
    <div className="about-modal-overlay">
      {/* Backdrop */}
      <motion.div
        className="about-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Close button */}
      <button className="about-modal-close-btn" onClick={onClose} aria-label="Close modal">
        <X size={20} />
      </button>

      {/* Modal Container */}
      <motion.div
        className="about-modal-card glass"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      >
        <div className="about-modal-layout">
          {/* Left Side: Image (1:1 format) + Socials rounded box */}
          <div className="about-modal-media-pane">
            <div className="about-modal-image-wrapper">
              <img 
                src="/assets/vaibhav_photo_1.png" 
                alt="Vaibhav Mishra Portrait 1" 
                className="about-modal-img main-img"
              />
              <img 
                src="/assets/vaibhav_photo_2.png" 
                alt="Vaibhav Mishra Portrait 2" 
                className="about-modal-img hover-img"
              />
            </div>
            
            <div className="about-modal-identity">
              <h3>vaibhav mishra</h3>
              <p className="subtitle">B.Tech CSE Student & Digital Artist</p>
              <div className="badge-row">
                <span className="badge-tag">Designer</span>
                <span className="badge-tag">Developer</span>
                <span className="badge-tag">Photographer</span>
              </div>
            </div>

            {/* Rounded Box for Socials */}
            <div className="about-modal-socials-box glass">
              <h4>Connect With Me</h4>
              <div className="socials-vertical-list">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-list-item"
                    style={{ '--social-color-hover': social.color }}
                  >
                    <span className="social-item-icon" style={{ color: social.color, backgroundColor: `${social.color}15` }}>
                      {social.icon}
                    </span>
                    <div className="social-item-text">
                      <span className="social-item-name">{social.name}</span>
                      <span className="social-item-handle">{social.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Detailed Story */}
          <div className="about-modal-info-pane">
            <div className="about-modal-header">
              <div className="avatar-placeholder">
                <User size={18} />
              </div>
              <div className="header-text">
                <h4>My Full Story</h4>
                <p>Learn more about my background and journey</p>
              </div>
            </div>

            <div className="about-modal-scroll-content">
              {/* Detailed bio */}
              <div className="scroll-section">
                <h3 className="section-title">The Creative Journey</h3>
                <p className="bio-paragraph">
                  Based in Dehradun, I am a Computer Science Engineering major who discovered a deep passion for digital arts, branding, and photography. I bridge the gap between technical logical architectures and high-end visual design.
                </p>
                <p className="bio-paragraph">
                  Over the past few years, I have collaborated with brands to create customized visual identities, managed gaming graphics as co-founder of TeamUp Esports, and developed educational sharing portals like U-Connect. I believe that engineering and design should feed into each other to create products that are both technically robust and visually delightful.
                </p>
              </div>

              {/* Core Interests */}
              <div className="scroll-section border-top">
                <h3 className="section-title">Core Focus</h3>
                <div className="focus-list">
                  <div className="focus-item">
                    <BookOpen size={16} className="focus-icon" />
                    <div>
                      <h5>Technical Engineering</h5>
                      <p>Full stack web applications, UI architectures, and software design patterns.</p>
                    </div>
                  </div>
                  <div className="focus-item">
                    <Camera size={16} className="focus-icon" />
                    <div>
                      <h5>Visual Arts & Photography</h5>
                      <p>Creative camera compositions, advanced Photoshop art, logos, and vector templates.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutModal;
