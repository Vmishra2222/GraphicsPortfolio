import { useState } from 'react';
import { Phone, Mail, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import BlindsReveal from '../components/BlindsReveal';
import './PageStyles.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Retrieve access key from env or placeholder
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";
    
    if (accessKey === "YOUR_ACCESS_KEY_HERE" || !accessKey.trim()) {
      alert("Please configure your Web3Forms access key in your .env file (VITE_WEB3FORMS_ACCESS_KEY). You can get a free key instantly by entering your email at https://web3forms.com");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: "Vaibhav Portfolio Contact Form"
        })
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(result.message || "Something went wrong. Please check your Web3Forms access key.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please check your network connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper container">
      {/* Decorative Blobs */}
      <div className="bg-blobs">
        <div className="bg-blob-2"></div>
        <div className="bg-blob-3"></div>
      </div>

      <BlindsReveal delay={0.1}>
        <div className="page-header text-center animate-fade-in">
          <span className="badge">Get in Touch</span>
          <h1>Connect With Me</h1>
          <p className="mx-auto header-description">
            Feel free to reach out. I respond to inquiries within 24 hours.
          </p>
        </div>
        
        <div className="contact-container animate-fade-in delay-100">
          
          {/* Info Column */}
          <div className="contact-info glass ">

            <h2>Get in touch.</h2>
            <p>Use the form or email me directly.</p>
            
            <div className="info-item">
              <div className="icon-wrapper"><Phone size={22} /></div>
              <div>
                <h3>Phone</h3>
                <p><a href="tel:+917979946672" className="contact-link">+91-7979946672</a></p>
                <p><a href="tel:+917060646672" className="contact-link">+91-7060646672</a></p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-wrapper"><Mail size={22} /></div>
              <div>
                <h3>Email</h3>
                <p><a href="mailto:vaibhavmishra.lalpania.dav@gmail.com" className="contact-link">vaibhavmishra.lalpania.dav@gmail.com</a></p>
              </div>
            </div>
          </div>
          
          {/* Form Column */}
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="form-success-card glass flex-center text-center">
                <CheckCircle2 size={56} className="success-icon" />
                <h2>Message Sent!</h2>
                <p>Thank you for reaching out. Your message has been received, and I'll get back to you as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline reset-btn">
                  Send Another Message <RefreshCw size={14} />
                </button>
              </div>
            ) : (
              <form className="contact-form glass " onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Your Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    placeholder="Your Message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="relative-span w-100" style={{ marginBottom: '1.5rem' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending Message... <RefreshCw size={18} className="spin-icon" /></>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>
                  

                </div>
              </form>
            )}
          </div>
          
        </div>
      </BlindsReveal>
    </div>
  );
};

export default Contact;
