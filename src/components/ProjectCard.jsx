import { ArrowUpRight } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, image, category, delay, onClick }) => {
  return (
    <div 
      className={`project-card glass animate-fade-in ${delay}`} 
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Corner Brackets */}
      <div className="hud-corner tl"></div>
      <div className="hud-corner tr"></div>
      <div className="hud-corner bl"></div>
      <div className="hud-corner br"></div>
      
      <div className="project-image">
        <img src={image} alt={title} loading="lazy" />
        
        {/* HUD Scanner Overlay (fades in on hover) */}
        <div className="project-overlay hud-overlay">
          <div className="cyber-grid-overlay" style={{ opacity: 0.25 }}></div>
          <div className="hud-scanner-line"></div>

          {/* Target Scope */}
          <div className="hud-scope">
            <div className="scope-cross"></div>
            <div className="scope-circle rotate-cw"></div>
            <div className="scope-circle-outer rotate-ccw"></div>
          </div>

          {/* Diagnostic Stats */}
          <div className="hud-diagnostics">
            <span className="diag-item">FPS: 60.00</span>
            <span className="diag-item">RENDER: 0.04ms</span>
            <span className="diag-item">MEM: 0x4E1A</span>
            <span className="diag-item">STATUS: READY</span>
          </div>

          <button className="view-btn">
            ACCESS MODULE <ArrowUpRight size={16} />
          </button>
        </div>
        
        {category && (
          <span className="project-category-badge">{category}</span>
        )}
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
