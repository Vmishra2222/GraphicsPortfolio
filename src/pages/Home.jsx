import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Paintbrush, 
  Layers, 
  Compass, 
  Cpu, 
  BookOpen,
  Camera
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import AboutModal from '../components/AboutModal';
import BlindsReveal from '../components/BlindsReveal';
import './Home.css';

const projectsData = [
  {
    title: 'Logo for KrishiAI',
    category: 'Logos',
    description: 'Designed the logo for KrishiAI, an agricultural technology startup, combining neuron patterns with leaf shapes.',
    image: '/assets/logo_krishiai_1777718739708.png',
    tools: ['Adobe Illustrator', 'Figma', 'Vector Design'],
    client: 'KrishiAI Technologies',
    date: 'January 2026',
    challenge: 'Create a clean, scalable logo that represents both farming (leaves) and technology (circuits).',
    story: 'I sketched leaves overlaid with grid points, then refined the shape into a clean monogram. The green represents agriculture, while the dark indigo represents technology.'
  },
  {
    title: 'Designs For Restaurant',
    category: 'Branding',
    description: 'Created menus, menu covers, and business cards for a restaurant in Kotdwar.',
    image: '/assets/restaurant_brand_1777718960983.jpeg',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Print Design'],
    client: 'Restaurant in Kotdwar',
    date: 'March 2026',
    challenge: 'Create a simple visual identity for printed menus and cards that feels clean and modern.',
    story: 'I selected warm earth tones with dark accents. The menu uses a readable grid layout, and the business cards keep a clean, minimalist style.'
  },
  {
    title: 'TeamUp Esports Brand',
    category: 'Startups & Ventures',
    description: 'Co-founded an Esports team. Created the team logo, uniform designs, and social media graphics.',
    image: '/assets/teamup_esports.png',
    tools: ['Adobe Photoshop', 'UI/UX Design', 'Social Media Branding'],
    client: 'TeamUp Esports (Co-founded)',
    date: '2024 - Present',
    challenge: 'Build a cohesive and recognizable gaming brand for competitive play.',
    story: 'As co-founder and lead designer, I created the visual assets for the team, including jersey illustrations, social media templates, and banners.'
  },
  {
    title: 'U-Connect Platform',
    category: 'Startups & Ventures',
    description: 'A student project to enable peer-to-peer sharing and recycling of textbooks and materials.',
    image: '/assets/u_connect.png',
    tools: ['UI/UX Design', 'Product Concept', 'B.Tech CSE Project'],
    client: 'U-Connect Upcycling (CSE Project)',
    date: '2023 - 2024',
    challenge: 'Design a simple interface and promotional materials to launch the platform.',
    story: 'We started U-Connect to prevent textbook waste. I designed the green and blue logo and the promotional flyers.'
  },
  {
    title: 'Thumbnail Designs',
    category: 'YouTube Content',
    description: 'Created custom YouTube thumbnails designed to improve video click-through rates.',
    image: '/assets/youtube_thumbnail_1777719927884.png',
    tools: ['Adobe Photoshop', 'Lightroom', 'Custom Typography'],
    client: 'TechVibe YouTube Channel',
    date: 'April 2026',
    challenge: 'Make the thumbnails clear and easy to read on small mobile screens.',
    story: 'I used high-contrast colors to highlight the main subject and selected bold text that remains legible on small screens.'
  },
  {
    title: 'Social Media Content',
    category: 'Branding',
    description: 'Designed social media graphics and template sets for consistent brand accounts.',
    image: '/assets/social_media_1777719976276.jpg',
    tools: ['Adobe Photoshop', 'Figma', 'Canva Pro'],
    client: 'Omni Retail Group',
    date: 'February 2026',
    challenge: 'Create reusable templates that keep the feed looking uniform.',
    story: 'I built a simple layout grid with set fonts and colors, making it quick to lay out new posts while keeping a clean style.'
  },
  {
    title: 'Flyers for College Events',
    category: 'Marketing',
    description: 'Designed schedule flyers for a youth parliament event, organizing schedule details clearly.',
    image: '/assets/event_flyer_1777720017711.jpg',
    tools: ['Adobe Illustrator', 'InDesign', 'Layout Grid'],
    client: 'Youth Parliament Society of Law Dehradun',
    date: 'October 2025',
    challenge: 'Present schedules, speakers, and registration details clearly on a single page.',
    story: 'I split the layout into three sections: a bold title at the top, speaker profiles in the middle, and date/registration info at the bottom.'
  },
  {
    title: 'Invitation Cards',
    category: 'Marketing',
    description: 'Designed custom print invitation cards for family events.',
    image: '/assets/invitation_card_1777720086351.png',
    tools: ['Adobe Illustrator', 'Print Design', 'Color Theory'],
    client: 'Family Celebrations',
    date: 'November 2025',
    challenge: 'Create a clean, print-ready invitation layout using classic typography.',
    story: 'I drew vector line frames and paired elegant serif fonts with scripts to create a classic look.'
  }
];

// Resume Databases
const educationData = [
  {
    institution: 'Uttaranchal University, Dehradun',
    degree: 'B.Tech in Computer Science and Engineering',
    duration: '2023 - 2027',
    details: 'Focusing on programming in C, C++, JavaScript, and Python. Covers data structures, algorithms, and software development principles.'
  },
  {
    institution: 'IIT Madras (Distance Learning)',
    degree: 'B.Sc. in Data Science',
    duration: '2025 - Present',
    details: 'Focused on core data science concepts, statistics, and machine learning. Covers data analysis and data-driven decision making.'
  },
  {
    institution: 'CBSE Senior Secondary School, Varanasi',
    degree: 'Senior Secondary Education (Class 12th)',
    duration: '2021 - 2023',
    details: 'Completed science majors. Fun Fact: In the JEE exam, I secured a rank equivalent to the price of a brand new Maruti Alto!'
  }
];

const experienceData = [
  {
    title: 'Co-Founder & Lead Designer',
    org: 'TeamUp Esports',
    date: '2024 - Present',
    desc: 'Co-founded a professional Esports brand. Served as Graphic Designer, UI/UX developer, and Social Media Manager.'
  },
  {
    title: 'Co-Founder',
    org: 'U-Connect Platform',
    date: '2023 - 2024',
    desc: 'Co-founded U-Connect, an Educational Resource UpCycling Platform. Handled the visual layouts and promotional flyers.'
  }
];

const skillsData = [
  { name: 'Adobe Photoshop & Illustrator', level: 90 },
  { name: 'UI/UX & Figma Prototyping', level: 60 },
  { name: 'Web Dev (HTML/CSS, React, Vite)', level: 80 },
  { name: 'Photography & Photo Editing', level: 88 },
  { name: 'Branding & Logo Identity Design', level: 92 },
  { name: 'Digital Marketing & Social Media Assets', level: 50 }
];



const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Categories list including Startups & Ventures
  const categories = ['All', 'Logos', 'Branding', 'YouTube Content', 'Marketing', 'Startups & Ventures'];

  // Filter projects based on category selection
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  // Handler to select the previous project in the filtered list (loop around)
  const handlePrevProject = () => {
    if (!activeProject || filteredProjects.length <= 1) return;
    const currentIndex = filteredProjects.findIndex(p => p.title === activeProject.title);
    const prevIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setActiveProject(filteredProjects[prevIndex]);
  };

  // Handler to select the next project in the filtered list (loop around)
  const handleNextProject = () => {
    if (!activeProject || filteredProjects.length <= 1) return;
    const currentIndex = filteredProjects.findIndex(p => p.title === activeProject.title);
    const nextIndex = (currentIndex + 1) % filteredProjects.length;
    setActiveProject(filteredProjects[nextIndex]);
  };

  const openProjectDetails = (project) => {
    setActiveProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="home-page">
      {/* Decorative Blobs for Ambient Glow */}
      <div className="bg-blobs">
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>
        <div className="bg-blob-3"></div>
      </div>

      {/* Bezier Vector Art illustration floating on the right side of hero */}
      <svg className="bezier-vector-art" style={{ top: '15%', right: '8%', width: '450px', height: '350px' }} viewBox="0 0 450 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bezier-grad" x1="0" y1="0" x2="400" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent-color)" />
            <stop offset="50%" stopColor="var(--accent-secondary)" />
            <stop offset="100%" stopColor="var(--accent-tertiary)" />
          </linearGradient>
        </defs>
        
        {/* Guidelines grid pattern inside illustration */}
        <path d="M 0 50 L 450 50 M 0 150 L 450 150 M 0 250 L 450 250 M 50 0 L 50 350 M 150 0 L 150 350 M 250 0 L 250 350 M 350 0 L 350 350" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        
        {/* Dashed background straight construction lines */}
        <path d="M 50 250 L 120 80 M 380 150 L 250 280" className="bezier-path-dashed" />
        
        {/* Bezier handle links */}
        <line x1="120" y1="80" x2="200" y2="60" className="bezier-handle-line" />
        <line x1="250" y1="280" x2="300" y2="290" className="bezier-handle-line" />
        
        {/* The actual curve */}
        <path d="M 50 250 C 120 80, 200 60, 250 280 C 300 290, 350 200, 380 150" className="bezier-path" />
        
        {/* Control handles lines and dots */}
        <circle cx="200" cy="60" r="4.5" className="bezier-handle-point" />
        <circle cx="300" cy="290" r="4.5" className="bezier-handle-point" />
        
        {/* Anchor points */}
        <rect x="45" y="245" width="10" height="10" rx="1.5" className="bezier-anchor" />
        <rect x="245" y="275" width="10" height="10" rx="1.5" className="bezier-anchor" />
        <rect x="375" y="145" width="10" height="10" rx="1.5" className="bezier-anchor" />
        
        {/* Pen tool drawing node cursor */}
        <g transform="translate(245, 275) rotate(-35)">
          <path d="M-2 -2 L18 4 L14 12 L4 18 Z" fill="#1e293b" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M-2 -2 L8 8" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="-2" cy="-2" r="2.5" fill="#ffffff" />
        </g>
      </svg>

      {/* Hero Section */}
      <BlindsReveal delay={0.15}>
        <section className="hero flex-center">
          <div className="container hero-container text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-badge"
            >
              <Sparkles size={18} className="sparkle-icon" /> B.Tech CSE Student & Digital Artist
            </motion.div>

            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I Build Things That<br />
              <span className="gradient-text relative-span">
                Look Good and Work Better.
                <svg className="title-squiggle" viewBox="0 0 260 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12 C 60 2, 100 2, 160 12 C 200 18, 230 18, 255 12" stroke="var(--accent-secondary)" strokeWidth="4" strokeLinecap="round" />
                  <path d="M25 15 C 80 8, 120 8, 180 15" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
            </motion.h1>

            <motion.p 
              className="hero-subtitle mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I study Computer Science Engineering and work on graphic design and photography. Explore my projects below.
            </motion.p>

            <motion.div 
              className="hero-cta-buttons relative-span"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="#showcase" className="btn btn-primary">
                Explore Showcase <ArrowRight size={18} />
              </a>
              <a href="#about" className="btn btn-outline">
                My Story
              </a>

            </motion.div>
          </div>
        </section>
      </BlindsReveal>

      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="mouse-wheel"></div>
        <span>Scroll Down</span>
      </motion.div>

      {/* About Section */}
      <BlindsReveal delay={0.3}>
        <section id="about" className="about-section section-padding">
          <div className="container">
            <div className="about-grid">
              <motion.div 
                className="about-image-card glass interactive-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                onClick={() => setIsAboutOpen(true)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsAboutOpen(true); } }}
                role="button"
                tabIndex="0"
                aria-label="View detailed about information and socials for Vaibhav Mishra"
              >

                <div className="cyber-grid-overlay" style={{ opacity: 0.15 }}></div>
                <div className="avatar-image-container">
                  <img src="/assets/vaibhav_photo_1.png" alt="Vaibhav Mishra Portrait 1" className="avatar-img main-img" />
                  <img src="/assets/vaibhav_photo_2.png" alt="Vaibhav Mishra Portrait 2" className="avatar-img hover-img" />
                </div>
                <div className="decorator-line"></div>
                <h3>vaibhav mishra</h3>
                <p className="designer-tagline">CSE Student & Creator</p>
                
                <div className="designer-stats">
                  <div className="stat-item">
                    <h4>2023</h4>
                    <p>CSE Entry</p>
                  </div>
                  <div className="stat-item">
                    <h4>2021</h4>
                    <p>Design Start</p>
                  </div>
                </div>
                <div className="card-click-hint">
                  <span>Click to Expand</span>
                </div>
              </motion.div>

              <motion.div 
                className="about-content"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="badge">About Me</span>
                <h2>Engineering and Design</h2>
                <p className="about-text-lead">
                  I study Computer Science Engineering in Dehradun and work on graphic design and photography.
                </p>
                <p className="about-text-body">
                  I focus on clean designs that look professional and work well, from branding projects to custom illustrations.
                </p>
                
                <div className="skills-grid">
                  <div className="skill-card glass">
                    <Paintbrush size={22} className="skill-icon" />
                    <div>
                      <h4>Graphic Design</h4>
                      <p>Branding, Monograms, & Print Layouts</p>
                    </div>
                  </div>
                  
                  <div className="skill-card glass">
                    <Camera size={22} className="skill-icon" />
                    <div>
                      <h4>Photography & Editing</h4>
                      <p>Composition, Lighting, & Post-processing</p>
                    </div>
                  </div>
                  
                  <div className="skill-card glass">
                    <Cpu size={22} className="skill-icon" />
                    <div>
                      <h4>Engineering Stack</h4>
                      <p>Computer Science, Web Apps & UI/UX Dev</p>
                    </div>
                  </div>
                  
                  <div className="skill-card glass">
                    <Layers size={22} className="skill-icon" />
                    <div>
                      <h4>Venture Building</h4>
                      <p>Esports Branding & Resource Platforms</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </BlindsReveal>

      {/* Showcase Section */}
      <BlindsReveal delay={0.45}>
        <section id="showcase" className="showcase-section section-padding">
          <div className="container">
            <div className="section-header text-center">
              <div className="flex-center animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                <span className="badge">Media Gallery</span>
              </div>
              
              <h2>My Creative Media Showcase</h2>
              <p className="mx-auto header-description">
                Explore my design collection below. Click on any card to read about the project backstory and tools used.
              </p>
              

              
              {/* Category Filter Tabs */}
              <div className="category-tabs-wrapper glass">

                {categories.map((category) => (
                  <button
                    key={category}
                    className={`tab-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  category={project.category}
                  delay={`delay-${(index % 3) * 100}`}
                  onClick={() => openProjectDetails(project)}
                />
              ))}
            </div>
          </div>
        </section>
      </BlindsReveal>

      {/* Project Modal Detail Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <ProjectModal 
            project={activeProject}
            onClose={() => setIsModalOpen(false)}
            onPrev={filteredProjects.length > 1 ? handlePrevProject : null}
            onNext={filteredProjects.length > 1 ? handleNextProject : null}
          />
        )}
      </AnimatePresence>

      {/* About Modal Details Overlay */}
      <AnimatePresence>
        {isAboutOpen && (
          <AboutModal 
            isOpen={isAboutOpen}
            onClose={() => setIsAboutOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
