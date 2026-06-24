import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass">
      <div className="container footer-content">
        <div className="footer-left">
          <h3 className="footer-logo">Vaibhav Mishra</h3>
          <p>Engineering Undergraduate</p>
        </div>

        <div className="footer-socials">
          <a href="https://www.linkedin.com/in/vaibhav-mishra-2bb899320/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
          <a href="https://github.com/Vmishra2222" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub"><FaGithub size={18} /></a>
          <a href="https://leetcode.com/shabdless" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LeetCode"><SiLeetcode size={18} /></a>
          <a href="https://instagram.com/v.shabdless" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><FaInstagram size={18} /></a>
          <a href="mailto:vaibhavmishra.lalpania.dav@gmail.com" className="social-icon" aria-label="Email"><Mail size={18} /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Vaibhav Mishra. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
