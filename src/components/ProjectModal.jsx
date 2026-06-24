import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Wrench, FileText, Target, Calendar, User } from 'lucide-react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose, onPrev, onNext }) => {
  // Add keyboard navigation listeners when modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext, onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay-container">
      {/* Overlay Backdrop */}
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Previous Button (Left Navigation) */}
      {onPrev && (
        <button className="nav-arrow-btn prev-btn" onClick={onPrev} aria-label="Previous project">
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next Button (Right Navigation) */}
      {onNext && (
        <button className="nav-arrow-btn next-btn" onClick={onNext} aria-label="Next project">
          <ChevronRight size={24} />
        </button>
      )}

      {/* Close Button (Moved outside the card to prevent header conflicts) */}
      <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
        <X size={20} />
      </button>

      {/* Instagram-style Modal Container */}
      <motion.div
        className="modal-instagram-card glass"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      >
        {/* Main Instagram Layout Grid */}
        <div className="instagram-layout-grid">
          
          {/* Left Column: Visual Showcase (Image panel) */}
          <div className="instagram-media-pane">
            <div 
              className="media-blur-background" 
              style={{ backgroundImage: `url(${project.image})` }}
            ></div>
            <img src={project.image} alt={project.title} className="media-contain-image" />
          </div>

          {/* Right Column: Descriptions & Story Panel */}
          <div className="instagram-info-pane">
            
            {/* Header (Designer Account info) */}
            <div className="pane-header">
              <div className="header-avatar-placeholder">
                <User size={18} />
              </div>
              <div className="header-text-block">
                <h4>Vaibhav Mishra</h4>
                <p>B.Tech CSE & Graphic Designer</p>
              </div>
              <span className="badge pane-badge">{project.category || 'Design'}</span>
            </div>

            {/* Scrollable details content */}
            <div className="pane-scroll-content">
              
              {/* Project Title & Overview */}
              <div className="pane-section">
                <h2 className="project-title-heading">{project.title}</h2>
                <p className="project-brief-text">{project.description}</p>
              </div>

              {/* Challenge details */}
              <div className="pane-section border-top">
                <h3 className="section-title"><Target size={16} /> The Challenge</h3>
                <p>{project.challenge || 'To deliver a visually striking composition that communicates the core message, aligns with modern marketing standards, and attracts targeted user attention.'}</p>
              </div>

              {/* Design Story */}
              <div className="pane-section border-top">
                <h3 className="section-title"><FileText size={16} /> Behind the Design</h3>
                <p>{project.story || 'Every creative layout has a purpose. Starting with initial doodles, grid systems, and typography trials, this project was developed to balance negative space and strong visual accents, aligning with modern aesthetic expectations.'}</p>
              </div>

              {/* Sidebar Metadata Box: Tools, Client, Date */}
              <div className="pane-section border-top metadata-section">
                
                <div className="meta-box glass">
                  <h4><Wrench size={14} /> Tools Utilized</h4>
                  <div className="tools-tags">
                    {project.tools ? (
                      project.tools.map((tool, idx) => (
                        <span key={idx} className="tool-tag">{tool}</span>
                      ))
                    ) : (
                      ['Adobe Suite', 'Figma', 'Visual Art'].map((tool, idx) => (
                        <span key={idx} className="tool-tag">{tool}</span>
                      ))
                    )}
                  </div>
                </div>

                <div className="meta-list-items">
                  <div className="meta-item-row">
                    <span className="meta-label">Client / Focus</span>
                    <span className="meta-val">{project.client || 'Personal Showcase'}</span>
                  </div>
                  <div className="meta-item-row">
                    <span className="meta-label">Date Created</span>
                    <span className="meta-val"><Calendar size={12} style={{ marginRight: '0.2rem' }} /> {project.date || 'May 2026'}</span>
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

export default ProjectModal;
