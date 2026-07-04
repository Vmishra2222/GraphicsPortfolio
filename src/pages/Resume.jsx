import { Download, Calendar, Award, BookOpen, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import BlindsReveal from '../components/BlindsReveal';
import './PageStyles.css';

const educationData = [
  {
    institution: 'Uttaranchal University, Dehradun',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    duration: '2023 - 2027',
    details: 'Bachelor of Technology in Computer Science and Engineering focusing on programming in C, C++, JavaScript, and Python. Curriculum covers data structures, algorithms, and software development principles, emphasizing problem-solving and the design of efficient, scalable, and user-friendly applications.'
  },
  {
    institution: 'Indian Institute of Technology, Madras (Distance Learning)',
    degree: 'Bachelor of Science in Data Science',
    duration: '2025 - Present',
    details: 'Bachelor of Science in Data Science (Distance Learning) from IIT Madras, focused on core concepts of data science, statistics, and AI/ML. Covers data analysis, machine learning algorithms, and real-world applications, with emphasis on problem-solving, data-driven decision-making, and modern analytical tools.'
  },
  {
    institution: 'CBSE Senior Secondary School, Varanasi, Uttar Pradesh',
    degree: 'Senior Secondary Education (Class 12th)',
    duration: '2021 - 2023',
    details: 'Completed science majors. Fun Fact: In the Joint Entrance Examination (JEE), I secured a rank equivalent to the price of a brand new Maruti Alto!'
  }
];

const experienceData = [
  {
    title: 'Co-Founder & Lead Designer',
    org: 'TeamUp Esports',
    date: '2024 - Present',
    desc: 'Co-founded a professional Esports brand catering to PlayersUnknownBattleGround (PUBG) players. Served as Graphic Designer, UI/UX developer, and Social Media Manager.'
  },
  {
    title: 'Co-Founder',
    org: 'U-Connect Platform',
    date: '2023 - 2024',
    desc: 'Co-founded U-Connect, an Educational Resource UpCycling Platform, during my first year of B.Tech CSE. Handled the visual layouts and promotional flyers.'
  }
];

const achievementsData = [];

const skillsData = [
  { name: 'Adobe Photoshop & Illustrator', level: 90 },
  { name: 'UI/UX & Figma Prototyping', level: 60 },
  { name: 'Web Dev (HTML/CSS, React, Vite)', level: 80 },
  { name: 'Photography & Photo Editing', level: 88 },
  { name: 'Branding & Logo Identity Design', level: 92 },
  { name: 'Digital Marketing & Social Media Assets', level: 50 }
];

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/vaibhav_mishra_resume.pdf';
    link.download = 'Vaibhav_Mishra_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-wrapper container">
      <div className="bg-blobs">
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>
      </div>

      <BlindsReveal delay={0.1}>
        <div className="page-header text-center animate-fade-in">
          <span className="badge">Curriculum Vitae</span>
          <h1>My Professional Resume</h1>
          <p className="mx-auto header-description">
            Explore my journey from Engineering studies in Dehradun to Photography and Graphic Design ventures. Click below to download a print-ready PDF copy.
          </p>
          
          <div className="header-cta animate-fade-in delay-100 relative-span">
            <button onClick={handleDownload} className="btn btn-primary">
              <Download size={18} /> Download Full Resume (PDF)
            </button>
            

          </div>
        </div>
        
        <div className="resume-grid animate-fade-in delay-200">
          
          {/* Left Column: Education & Experience */}
          <div className="resume-main-timeline">
            
            {/* Experience Timeline */}
            <div className="timeline-section">
              <h2 className="timeline-section-title"><Award size={24} /> Work & Experience</h2>
              
              <div className="timeline-list">
                {experienceData.map((item, idx) => (
                  <div key={idx} className="timeline-item glass ">

                    <div className="timeline-marker achievement-marker"></div>
                    <div className="timeline-header">
                      <h3>{item.title}</h3>
                      <span className="timeline-date"><Calendar size={14} /> {item.date}</span>
                    </div>
                    <h4 className="timeline-org">{item.org}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div className="timeline-section">
              <h2 className="timeline-section-title"><BookOpen size={24} /> Education</h2>
              
              <div className="timeline-list">
                {educationData.map((item, idx) => (
                  <div key={idx} className="timeline-item glass ">

                    <div className="timeline-marker"></div>
                    <div className="timeline-header">
                      <h3>{item.degree}</h3>
                      <span className="timeline-date"><Calendar size={14} /> {item.duration}</span>
                    </div>
                    <h4 className="timeline-org">{item.institution}</h4>
                    <p>{item.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements / Credentials */}
            {achievementsData.length > 0 && (
              <div className="timeline-section">
                <h2 className="timeline-section-title"><Sparkles size={24} /> Credentials & Certifications</h2>
                
                <div className="timeline-list">
                  {achievementsData.map((item, idx) => (
                    <div key={idx} className="timeline-item glass ">
                      {/* Crop marks */}
                      <div className="crop-mark tl"></div>
                      <div className="crop-mark tr"></div>
                      <div className="crop-mark bl"></div>
                      <div className="crop-mark br"></div>
                      <div className="timeline-marker"></div>
                      <div className="timeline-header">
                        <h3>{item.title}</h3>
                        <span className="timeline-date"><Calendar size={14} /> {item.date}</span>
                      </div>
                      <h4 className="timeline-org">{item.org}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Skills & Approach */}
          <div className="resume-sidebar">
            
            <div className="sidebar-resume-card glass ">

              <h2>Design & Technical Skills</h2>
              <div className="skills-bars-container">
                {skillsData.map((skill, idx) => (
                  <div key={idx} className="skill-progress-item">
                    <div className="skill-progress-header">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-progress-bar-track">
                      <div 
                        className="skill-progress-bar-fill" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-resume-card glass ">

              <h2>Core Design Philosophy</h2>
              <ul className="philosophy-checklist">
                <li>
                  <CheckCircle size={18} className="philosophy-icon" />
                  <div>
                    <strong>Contrast & Hierarchy:</strong> Leading viewers’ focus naturally to key elements first.
                  </div>
                </li>
                <li>
                  <CheckCircle size={18} className="philosophy-icon" />
                  <div>
                    <strong>Story-First Creation:</strong> Every line, curve, and shade must reinforce the project backstory.
                  </div>
                </li>
                <li>
                  <CheckCircle size={18} className="philosophy-icon" />
                  <div>
                    <strong>Aesthetic + Utility:</strong> Merging beautiful visual arts with functional layouts that boost CTR.
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Flashy Opportunities & Recruiter Callout Banner */}
        <div className="recruiter-cta-section animate-fade-in delay-300">
          <div className="recruiter-cta-card glass ">

            
            <div className="cta-status-badge">
              <span className="pulse-dot"></span>
              Open to Opportunities
            </div>
            
            <div className="cta-content">
              <h2>Ready for new challenges and collaborations</h2>
              <p>
                Seeking software development and engineering internships. I am eager to apply my technical stack in AI/ML (Python, C++) and UI/UX design concepts to help build modern, high-performance web products.
              </p>
              <div className="cta-actions">
                <a href="/contact" className="btn btn-primary">
                  Get In Touch <ArrowRight size={16} />
                </a>
                <a href="/#showcase" className="btn btn-outline">
                  Explore Designs
                </a>
              </div>
            </div>
          </div>
        </div>

      </BlindsReveal>
    </div>
  );
};

export default Resume;
