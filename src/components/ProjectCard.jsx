import { ArrowUpRight } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, image, category, delay, onClick }) => {
  return (
    <div 
      className={`project-card glass animate-fade-in ${delay}`} 
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >

      
      <div className="project-image">
        <img src={image} alt={title} loading="lazy" />
        
        {/* Blueprint Wireframe Overlay (fades in on hover) */}
        <div className="project-overlay blueprint-overlay">
          <svg className="blueprint-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {/* Diagonal grid lines */}
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
            {/* Axis guide lines */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
            {/* Center target circles */}
            <circle cx="50%" cy="50%" r="16" stroke="var(--accent-secondary)" strokeWidth="1.2" fill="none" opacity="0.4" />
            <circle cx="50%" cy="50%" r="32" stroke="var(--accent-secondary)" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.3" />
            {/* Center crosshair */}
            <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="var(--accent-secondary)" fontSize="10" fontFamily="monospace" opacity="0.6">+</text>
          </svg>
          
          <span className="blueprint-coord top-left">x:0 y:0</span>
          <span className="blueprint-coord top-right">w:100%</span>
          <span className="blueprint-coord bottom-left">h:250px</span>
          <span className="blueprint-coord bottom-right">pms:325c</span>
          
          <button className="view-btn">
            View Story <ArrowUpRight size={18} />
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
