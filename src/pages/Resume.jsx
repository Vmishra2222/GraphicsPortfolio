import { Download, Calendar, Award, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import BlindsReveal from '../components/BlindsReveal';
import './PageStyles.css';

const educationData = [
  {
    institution: 'Uttaranchal University, Dehradun',
    degree: 'B.Tech in Computer Science and Engineering',
    duration: '2023 - 2027',
    details: 'Studying core computer science including programming (C, C++, JavaScript, Python), data structures, algorithms, and software engineering. (CGPA: 7.0 / 10)'
  },
  {
    institution: 'IIT Madras (Correspondence)',
    degree: 'B.S. in Data Science and Applications',
    duration: '2025 - 2028',
    details: 'Online degree program focused on core concepts of data science, database query structures, data analysis, statistics, and machine learning models. (CGPA: 6.80 / 10)'
  },
  {
    institution: 'Gyandeep Academy, Varanasi',
    degree: 'Senior Secondary Education (Class 12th CBSE)',
    duration: '2023',
    details: 'Completed science majors. (Percentage: 62.40 / 100)'
  },
  {
    institution: 'D.A.V Public School T.T.P.S Lalpania, Bokaro',
    degree: 'Secondary Education (Class 10th CBSE)',
    duration: '2021',
    details: 'Completed general secondary curriculum. (Percentage: 80.00 / 100)'
  }
];

const experienceData = [
  {
    title: 'Operations & Maintenance Intern',
    org: 'Tenughat Thermal Power Project (Power / Energy)',
    date: '15 Jun, 2024 - 30 Jun, 2024',
    desc: 'Worked in the C&I (Control & Instrumentation) department. Studied the enterprise architecture of the plant\'s SAP ERP software, mapping telemetry inputs, data log pipelines, physical sensors, and low-level digital logic gates.'
  },
  {
    title: 'Co-Founder & Lead Designer',
    org: 'TeamUp Esports',
    date: '2024 - Present',
    desc: 'Co-founded a professional Esports brand. Designed high-contrast vector brand elements, apparel uniforms, social media banners, and digital gaming assets.'
  },
  {
    title: 'Co-Founder',
    org: 'U-Connect Platform',
    date: '2023 - 2024',
    desc: 'Co-founded a peer-to-peer resource sharing platform. Managed UI layouts, promotional assets, and flyer packages to reuse college textbooks.'
  }
];

const achievementsData = [
  {
    title: 'NPTEL Introduction to Cybersecurity',
    org: 'National Programme on Technology Enhanced Learning (NPTEL)',
    date: '2025',
    desc: 'Completed cyber defense concepts, networks, threat assessment metrics, and secure system architectures. (Score: 70 / 100)'
  },
  {
    title: 'Node.JS Bootcamp Graduate',
    org: 'Let\'s Upgrade Institute',
    date: '12 Jan, 2026 - 14 Jan, 2026',
    desc: 'Completed fundamentals of backend programming, REST APIs, asynchronous database queries, and server environments.'
  }
];

const skillsData = [
  { name: 'Adobe Photoshop & Illustrator', level: 90 },
  { name: 'C / C++ & Data Structures (DSA)', level: 85 },
  { name: 'JavaScript & ReactJS / Native', level: 82 },
  { name: 'UI/UX & Figma Prototyping', level: 75 },
  { name: 'Python & Machine Learning Concepts', level: 75 },
  { name: 'Node.JS & Backend Systems', level: 70 },
  { name: 'Cybersecurity Principles (NPTEL)', level: 70 }
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
                <h2 className="timeline-section-title"><Award size={24} /> Credentials & Certifications</h2>
                
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
