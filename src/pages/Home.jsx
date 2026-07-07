import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Paintbrush, 
  Layers, 
  Compass, 
  Cpu, 
  BookOpen,
  Camera,
  Award
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import AboutModal from '../components/AboutModal';
import BlindsReveal from '../components/BlindsReveal';
import './Home.css';

const projectsData = [
  {
    title: 'Krishi AI Crop Platform',
    category: 'Engineering & Code',
    description: 'An AI-powered mobile assistant crop disease diagnostics and speech chat interface in regional dialects.',
    image: '/assets/logo_krishiai_1777718739708.png',
    tools: ['Python', 'TensorFlow', 'React Native', 'Machine Learning', 'IoT'],
    client: 'Agricultural Research Prototype',
    date: 'January 2026',
    challenge: 'Develop a lightweight, offline-first mobile app that accurately processes leaf disease images and reads advice aloud in regional languages.',
    story: 'I trained a lightweight classification model in TensorFlow Lite for edge deployment and integrated it into a React Native frontend. I also built voice-to-text queries so local farmers can speak to the assistant.'
  },
  {
    title: 'Tenughat Power C&I System',
    category: 'Engineering & Code',
    description: 'Interned at a thermal station, analyzing digital logic gate sensor networks and SAP database logging pipelines.',
    image: '/assets/u_connect.png',
    tools: ['SAP Systems', 'Digital Logic Gates', 'Industrial Control & Instrumentation'],
    client: 'Tenughat Thermal Power Project',
    date: 'June 2024',
    challenge: 'Trace and map the flow of physical telemetry values from low-level thermal boilers up to high-level SAP dashboard nodes.',
    story: 'During my operations internship, I sat in the Control & Instrumentation station. I tracked physical telemetry values from sensors, mapping them through digital logic gates and database entries.'
  },
  {
    title: 'Logo for KrishiAI',
    category: 'Logos',
    description: 'The KrishiAI logo merges technology and agriculture, symbolizing growth and efficiency in transforming the farming industry with artificial intelligence.',
    image: '/assets/logo_krishiai_1777718739708.png',
    tools: ['Adobe Illustrator', 'Figma', 'Vector Design'],
    client: 'KrishiAI Technologies',
    date: 'January 2026',
    challenge: 'To design a recognizable, scalable logo that links the organic nature of agriculture (leaves, growth) with digital intelligence (circuits, network nodes) without cluttering the brand symbol.',
    story: 'I began by sketching overlapping plant leaves overlaid with neural network points. After iterating on various shapes, I finalized a balanced monogram that combines a leaf contour with a circuit path. The color palette utilizes emerald green representing agriculture, blended into deep indigo representing high-end technology. This emblem successfully gives KrishiAI a trustworthy, modern look.'
  },
  {
    title: 'Designs For Restaurant',
    category: 'Branding',
    description: "Created a comprehensive branding package for a restaurant in Kotdwar. Encompasses a menu highlighting culinary offerings, a menu cover, and business cards.",
    image: '/assets/restaurant_brand_1777718960983.jpeg',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Print Design'],
    client: 'Restaurant in Kotdwar',
    date: 'March 2026',
    challenge: 'To design a cohesive visual identity that matches the warm atmosphere of the restaurant. Needs to look welcoming yet highly premium and modern for printed materials.',
    story: 'For this branding suite, I selected warm earth tones combined with dark accents. The menu utilizes a clean, readable typographic grid. I designed business cards to leave a memorable impression, ensuring each component elevates the dining experience.'
  },
  {
    title: 'TeamUp Esports Brand',
    category: 'Startups & Ventures',
    description: 'Co-founded a professional Esports brand catering to PlayersUnknownBattleGround (PUBG) gamers. Served as Graphic Designer, UI/UX developer, and Social Media Manager.',
    image: '/assets/teamup_esports.png',
    tools: ['Adobe Photoshop', 'UI/UX Design', 'Social Media Branding'],
    client: 'TeamUp Esports (Co-founded)',
    date: '2024 - Present',
    challenge: 'To design an active esports gaming identity, including team logos, banners, UI layouts, and social media templates for PUBG players, ensuring a fierce and recognizable style.',
    story: 'We co-founded TeamUp Esports to bring together PUBG players. As Lead Designer, I set the neon cyber aesthetic, designing high-contrast team emblems, gaming hoodies, and digital social overlays.'
  },
  {
    title: 'U-Connect Platform',
    category: 'Startups & Ventures',
    description: 'Founded an Educational Resource UpCycling Platform during my first year of B.Tech CSE majors to enable peer-to-peer resource sharing.',
    image: '/assets/u_connect.png',
    tools: ['UI/UX Design', 'Product Concept', 'B.Tech CSE Project'],
    client: 'U-Connect Upcycling (CSE Project)',
    date: '2023 - 2024',
    challenge: 'To design a clean, minimal user interface and promotional flyer package for a peer-to-peer educational resource sharing and upcycling platform.',
    story: 'In my first year of CSE, my classmate and I realized a huge amount of textbooks and materials were discarded each semester. We founded U-Connect to recycle resources. I worked on the branding, structuring a clean node-based green and blue logo accompanied by promotional materials.'
  },
  {
    title: 'Thumbnail Designs',
    category: 'YouTube Content',
    description: 'Thumbnail for a popular YouTube channel, boosting video click-through rates (CTR) by 60%. Highly engaging design conveying messages instantly.',
    image: '/assets/youtube_thumbnail_1777719927884.png',
    tools: ['Adobe Photoshop', 'Lightroom', 'Custom Typography'],
    client: 'TechVibe YouTube Channel',
    date: 'April 2026',
    challenge: 'To design thumbnails that immediately stand out on mobile feeds and convey complex video themes within 1 second of viewing.',
    story: 'I applied high-saturation color grading to make the central subject pop against a dark, contrasting background. Using bold, customized type with drop shadows and glowing outlines ensures readability on tiny screens.'
  },
  {
    title: 'Social Media Content',
    category: 'Branding',
    description: 'Provided dynamic social media content that includes eye-catching posts and stories designed to engage audiences and elevate brand presence.',
    image: '/assets/social_media_1777719976276.jpg',
    tools: ['Adobe Photoshop', 'Figma', 'Canva Pro'],
    client: 'Omni Retail Group',
    date: 'February 2026',
    challenge: 'To design templates for Instagram posts and stories that maintain absolute brand consistency while keeping each individual post unique and engaging.',
    story: 'I developed a design system consisting of strict grid ratios, recurring color blocks, and specific font weights. This modular framework allows for fast layouts while keeping the feed looking curated and professional.'
  },
  {
    title: 'Flyers for College Events',
    category: 'Marketing',
    description: 'Designed the flyers for CONNAITRE 24, the event hosted by the Youth Parliament Society of Law Dehradun. Focused on creating visually appealing and informative layouts.',
    image: '/assets/event_flyer_1777720017711.jpg',
    tools: ['Adobe Illustrator', 'InDesign', 'Layout Grid'],
    client: 'Youth Parliament Society of Law Dehradun',
    date: 'October 2025',
    challenge: 'To organize a large amount of event details in a clean flyer without overwhelming the reader.',
    story: 'I handled the visual hierarchy by dividing the flyer into three distinct sections. The top section draws interest with a bold header design, the middle holds speaker details, and the bottom uses simple icon layouts for dates and QR-code registration.'
  },
  {
    title: 'Invitation Cards',
    category: 'Marketing',
    description: 'Created several custom invitation cards for personal and family functions, featuring elegant typography and visually stunning compositions.',
    image: '/assets/invitation_card_1777720086351.png',
    tools: ['Adobe Illustrator', 'Print Design', 'Color Theory'],
    client: 'Family Celebrations',
    date: 'November 2025',
    challenge: 'To design invitations that capture personal stories and familial warmth in a classic, luxury format suitable for print.',
    story: 'I hand-drew delicate line-art ornaments and border frames in Illustrator to establish a classic look. Pairings of script fonts with modern serifs create a balanced composition.'
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
  const categories = ['All', 'Logos', 'Branding', 'YouTube Content', 'Marketing', 'Startups & Ventures', 'Engineering & Code'];

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
              B.Tech CSE Student & Digital Artist
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
              Welcome! My site is a reflection of my journey filled with ups, downs, and pretty cool stuff I have done. Explore my experiences from Computer Science Engineering to Photography and Graphic Design.
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
                <h2>Fusing Technical Engineering with Creative Arts</h2>
                <p className="about-text-lead">
                  I am a Graphic Design and Photography enthusiast with a solid Computer Science Engineering background. Currently pursuing B.Tech in Dehradun, UK.
                </p>
                <p className="about-text-body">
                  My creative journey in graphic design has been an exploration of blending aesthetics with functionality. From digital branding elements to vector illustrations, I focus on constructing assets that elevate user experiences and marketing click-throughs.
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

      {/* Developer Core Section */}
      <BlindsReveal delay={0.35}>
        <section id="developer-core" className="dev-core-section section-padding">
          <div className="container">
            <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
              <div className="flex-center animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                <span className="badge">Developer Core</span>
              </div>
              <h2>Engineering & Code</h2>
              <p className="mx-auto header-description" style={{ maxWidth: '650px' }}>
                Bridging core computer science principles and database structures with modern software architectures and machine learning prototypes.
              </p>
            </div>

            <div className="dev-columns-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', width: '100%', marginTop: '1rem' }}>
              {/* Col 1: Education */}
              <div className="glass" style={{ padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                  <BookOpen size={20} />
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>Education</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: '700', fontFamily: 'monospace' }}>B.TECH CSE (2023-2027)</span>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.15rem 0' }}>Uttaranchal University</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Core CS fundamentals, OOPs, DSA, C++, and Web App Development. (CGPA: 7.0/10)</p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: '700', fontFamily: 'monospace' }}>B.S. DATA SCIENCE (2025-2028)</span>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.15rem 0' }}>IIT Madras (Correspondence)</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>Data structures, statistics, programming, database queries, and ML models. (CGPA: 6.8/10)</p>
                  </div>
                </div>
              </div>

              {/* Col 2: Tech Stack Badges */}
              <div className="glass" style={{ padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                  <Cpu size={20} />
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>Tech Stack</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Languages</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['C', 'C++', 'Python', 'SQL', 'HTML/CSS', 'JavaScript'].map((lang, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '99px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)' }}>{lang}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Frontend & Systems</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['ReactJS', 'React Native', 'Figma Prototyping', 'UI/UX'].map((fw, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '99px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)' }}>{fw}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Backend & Frameworks</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['Node.js REST APIs', 'SAP ERP Telemetry', 'ML Classifiers'].map((be, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '99px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)' }}>{be}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Col 3: Practical Internships & Certifications */}
              <div className="glass" style={{ padding: '2.25rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'var(--card-bg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
                  <Award size={20} />
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>Credentials & Experience</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent-color)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>INTERNSHIP</span>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.35rem 0 0.15rem' }}>Tenughat Thermal Power Station</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                      Worked in C&I. Mapped digital logic gates, plant sensors, and analyzed SAP database tables.
                    </p>
                  </div>
                  
                  <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>CERTIFICATION</span>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.35rem 0 0.15rem' }}>NPTEL Cybersecurity</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                      Completed concepts in cyber defense, secure networks, and cryptography. (Score: 70/100)
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.65rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>SEMINAR</span>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '0.35rem 0 0.15rem' }}>Node.JS Let's Upgrade Bootcamp</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                      Completed server setups, asynchronous queries, and REST APIs.
                    </p>
                  </div>
                </div>
              </div>
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
                Browse through my design collection. Click on any design card to read the complete creative story, client context, and tools utilized in its creation.
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
