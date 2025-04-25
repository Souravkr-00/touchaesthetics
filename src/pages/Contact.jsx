import { useState, useEffect, useRef } from 'react';
import contact from "../assets/images/contact.jpg";
import map from "../assets/images/map.png";
import contactbanner from "../assets/images/contactbanner.jpg";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    info: false,
    form: false,
    locations: false,
    faq: false,
    cta: false
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: 'General Inquiry'
  });

  const [activeLocation, setActiveLocation] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  
  // Create refs for each section
  const heroRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const locationsRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const emailFormRef = useRef();
  
  useEffect(() => {
    // Check if viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Intersection observer for scroll animations
    const createObserver = (ref, section) => {
      const observer = new IntersectionObserver((entries) => {
        setIsVisible(prev => ({
          ...prev,
          [section]: entries[0].isIntersecting
        }));
      }, { threshold: 0.2 });
      
      if (ref.current) observer.observe(ref.current);
      return observer;
    };
    
    // Create observers for each section
    const heroObserver = createObserver(heroRef, 'hero');
    const infoObserver = createObserver(infoRef, 'info');
    const formObserver = createObserver(formRef, 'form');
    const locationsObserver = createObserver(locationsRef, 'locations');
    const faqObserver = createObserver(faqRef, 'faq');
    const ctaObserver = createObserver(ctaRef, 'cta');
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      // Clean up observers
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (infoRef.current) infoObserver.unobserve(infoRef.current);
      if (formRef.current) formObserver.unobserve(formRef.current);
      if (locationsRef.current) locationsObserver.unobserve(locationsRef.current);
      if (faqRef.current) faqObserver.unobserve(faqRef.current);
      if (ctaRef.current) ctaObserver.unobserve(ctaRef.current);
    };
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
    
    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: 'cash.souravkr12@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone, 
      subject: formData.subject,
      message: formData.message,
      service: formData.service
    };
    
    // Replace these with your actual EmailJS service ID, template ID, and public key
    emailjs.send(
      'service_h2yiz34', // Replace with your EmailJS service ID
      'template_h6x2ulc', // Replace with your EmailJS template ID
      templateParams,
      'zB_bhd03Tc8V5OIFE' // Replace with your EmailJS public key
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      setSubmitStatus({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        service: 'General Inquiry'
      });
      
      setIsSubmitting(false);
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setSubmitStatus({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later.'
      });
      setIsSubmitting(false);
    });
  };

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Color scheme based on text-[#7d6e63]
  const colors = {
    primary: "#7d6e63", // Base color
    light: "#a89a91", // Lighter shade for backgrounds
    lighter: "#e8e2db", // Very light shade for container backgrounds
    dark: "#5d5149", // Darker shade for emphasis
    accent: "#b2a192", // Accent color for buttons, etc.
  };

  // Contact info data
  const contactInfo = [
    {
      id: 1,
      title: "Call Us",
      details: "+91 9220546827",
      hours: "Mon-Sat, 9:00 AM - 8:00 PM",
      icon: "☎" // Using a simple character as placeholder for icon
    },
    {
      id: 2,
      title: "Email Us",
      details: "toucheaesthetics0@gmail.com",
      hours: "We respond within 24 hours",
      icon: "✉"
    },
    {
      id: 3,
      title: "WhatsApp",
      details: "+91 9220546827",
      hours: "Available for quick inquiries",
      icon: "💬"
    }
  ];

  // Location data
  const locations = [
    {
      id: 1,
      city: "Delhi",
      address: "A/41, South Extension Part-2, New Delhi - 110049, India",
      phone: "+91 9220546827",
      email: "toucheaesthetics0@gmail.com",
      hours: "Mon-Sat: 9:00 AM - 8:00 PM\nSun: 10:00 AM - 5:00 PM",
      map: map
    },
  ];

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment through our website by filling out the contact form, calling our clinic directly, or using our WhatsApp number. Our team will get back to you promptly to confirm your appointment time."
    },
    {
      id: 2,
      question: "Do I need a referral to visit your clinic?",
      answer: "No, you don't need a referral to visit our clinic. We welcome walk-ins, though we recommend scheduling an appointment to minimize wait times and ensure you see the specialist most suited to your needs."
    },
    {
      id: 3,
      question: "What insurance plans do you accept?",
      answer: "We accept most major insurance plans. Please contact our administrative team with your insurance details before your appointment so we can verify coverage for the services you need."
    },
    {
      id: 4,
      question: "How do I prepare for my first visit?",
      answer: "For your first visit, please bring your identification, insurance information if applicable, a list of current medications, and any previous medical records related to your skin condition. Arrive 15 minutes early to complete necessary paperwork."
    },
    {
      id: 5,
      question: "What is your cancellation policy?",
      answer: "We request that you notify us at least 24 hours in advance if you need to cancel or reschedule your appointment. Late cancellations or no-shows may incur a fee."
    }
  ];

  // Services for dropdown
  const services = [
    "General Inquiry",
    "Skin Consultation",
    "Hair Treatment",
    "Cosmetic Procedure",
    "Medical Dermatology",
    "Appointment Rescheduling",
    "Career Opportunities",
    "Other"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-80 bg-gradient-to-r from-[#f7f4f1] to-[#e8e2db] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={contactbanner} 
            alt="Contact us" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center text-center">
          <div className={`transition-all duration-1000 transform ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-4xl md:text-5xl font-bold font-serif font-light text-[#c8a287] mb-6">Contact Us</h1>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
            <p className="text-lg text-[#7d6e63] max-w-3xl">
              We're here to help. Reach out to us with any questions or to schedule your appointment.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Info Cards */}
      <div ref={infoRef} className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={info.id}
                className={`bg-[#f7f4f1] p-6 rounded-lg shadow-md text-center transition-all duration-1000 transform ${isVisible.info ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: isVisible.info ? `${index * 200}ms` : '0ms' }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-[#b2a192] text-white rounded-full mb-4 mx-auto">
                  <span className="text-2xl">{info.icon}</span>
                </div>
                <h3 className="text-xl font-serif font-light text-[#c8a287] mb-2">{info.title}</h3>
                <p className="text-[#7d6e63] font-medium mb-1">{info.details}</p>
                <p className="text-[#a89a91] text-sm">{info.hours}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Contact Form and Map Section */}
      <div ref={formRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#f7f4f1]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 transform ${isVisible.form ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">Send Us a Message</h2>
              <div className="w-16 h-1 bg-[#b2a192] mb-6"></div>
              <p className="text-[#7d6e63] mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              
              {submitStatus.message && (
                <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form ref={emailFormRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#5d5149] font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e2db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b2a192]"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[#5d5149] font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e2db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b2a192]"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[#5d5149] font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e2db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b2a192]"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-[#5d5149] font-medium mb-2">Service</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e8e2db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b2a192] bg-white"
                      required
                    >
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-[#5d5149] font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#e8e2db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b2a192]"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-[#5d5149] font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-[#e8e2db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b2a192]"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full md:w-auto px-8 py-3 bg-[#b2a192] hover:bg-[#a89a91] text-white font-medium rounded-lg transition-colors duration-300 shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Image/Illustration */}
            <div className={`transition-all duration-1000 transform ${isVisible.form ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <img 
                src={contact} 
                alt="Contact us illustration" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#5d5149] mb-4">Business Hours</h3>
                <div className="space-y-2 text-[#7d6e63]">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Locations Section */}
      <div ref={locationsRef} className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible.locations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">Our Locations</h2>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
            <p className="text-[#7d6e63] max-w-3xl mx-auto">
              Visit us at one of our convenient clinic locations
            </p>
          </div>
          
          {/* Location Tabs */}
          <div className={`mb-8 transition-all duration-1000 transform ${isVisible.locations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
               style={{ transitionDelay: isVisible.locations ? '200ms' : '0ms' }}>
            <div className="flex flex-wrap justify-center gap-4">
              {locations.map((location, index) => (
                <button
                  key={location.id}
                  onClick={() => setActiveLocation(index)}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
                    activeLocation === index 
                      ? 'bg-[#b2a192] text-white' 
                      : 'bg-[#e8e2db] text-[#7d6e63] hover:bg-[#d8d0c7]'
                  }`}
                >
                  {location.city}
                </button>
              ))}
            </div>
          </div>
          
          {/* Active Location Details */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 transform ${isVisible.locations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isVisible.locations ? '400ms' : '0ms' }}
          >
            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src={locations[activeLocation].map} 
                alt={`Map of ${locations[activeLocation].city} location`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Location Details */}
            <div className="bg-[#f7f4f1] p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-serif font-light text-[#c8a287] mb-4">{locations[activeLocation].city} Clinic</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#7d6e63] font-medium mb-1">Address:</h4>
                  <p className="text-[#5d5149]">{locations[activeLocation].address}</p>
                </div>
                
                <div>
                  <h4 className="text-[#7d6e63] font-medium mb-1">Phone:</h4>
                  <p className="text-[#5d5149]">{locations[activeLocation].phone}</p>
                </div>
                
                <div>
                  <h4 className="text-[#7d6e63] font-medium mb-1">Email:</h4>
                  <p className="text-[#5d5149]">{locations[activeLocation].email}</p>
                </div>
                
                <div>
                  <h4 className="text-[#7d6e63] font-medium mb-1">Hours:</h4>
                  <p className="text-[#5d5149] whitespace-pre-line">{locations[activeLocation].hours}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <a href='https://www.google.co.in/maps/place/TOUCHE+AESTHETICS/@28.5665661,77.218044,16.11z/data=!4m6!3m5!1s0x390ce329e911b6db:0x195d4775acfaa380!8m2!3d28.5663962!4d77.2208124!16s%2Fg%2F11x11_9dkc?entry=ttu&g_ep=EgoyMDI1MDQyMi4wIKXMDSoASAFQAw%3D%3D' target='_blank' rel="noopener noreferrer">
                <button className="px-6 py-3 bg-[#b2a192] hover:bg-[#a89a91] text-white font-medium rounded-lg transition-colors duration-300 shadow-md">
                  Get Directions
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div ref={faqRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#f7f4f1]">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={faq.id}
                className={`border border-[#e8e2db] rounded-lg overflow-hidden transition-all duration-1000 transform ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: isVisible.faq ? `${index * 150}ms` : '0ms' }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-[#f7f4f1] transition-colors duration-300"
                >
                  <span className="font-medium text-[#5d5149]">{faq.question}</span>
                  <span className="text-xl text-[#b2a192]">
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>
                <div 
                  className={`bg-[#f7f4f1] overflow-hidden transition-all duration-300 ${
                    activeFaq === index ? 'max-h-80 p-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-[#7d6e63]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div ref={ctaRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#e8e2db]">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl md:text-3xl font-serif font-light text-[#c8a287] mb-4">Still Have Questions?</h3>
          <p className="text-[#7d6e63] mb-8 max-w-2xl mx-auto">
            Our dedicated support team is ready to assist you with any inquiries about our services, appointments, or treatments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href='tel: +919220546827'target='_blank' rel="noopener noreferrer">
            <button className="px-8 py-3 bg-[#b2a192] hover:bg-[#a89a91] text-white font-medium rounded-lg transition-colors duration-300 shadow-md">
              Call Now
            </button>
            </a>
            <a href="mailto:toucheaesthetics0@gmail.com" target="_blank" rel="noopener noreferrer">
            <button className="px-8 py-3 bg-white hover:bg-gray-50 text-[#7d6e63] font-medium rounded-lg transition-colors duration-300 shadow-md border border-[#a89a91]">
              Email Us
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}