import { useState, useEffect, useRef } from 'react';
import service1 from "../../assets/images/service1.jpg";
import service2 from "../../assets/images/service2.jpg";
import service3 from "../../assets/images/service3.jpg";
import service4 from "../../assets/images/service4.jpg";

export default function TreatmentsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    // Check if viewport is mobile on component mount and when resized
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Intersection observer for scroll animations
    // This will trigger the animation each time the section enters the viewport
    const observer = new IntersectionObserver((entries) => {
      // Set isVisible based on current intersection state
      setIsVisible(entries[0].isIntersecting);
    }, { threshold: 0.2 });
    
    const section = sectionRef.current;
    if (section) observer.observe(section);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (section) observer.unobserve(section);
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Skincare Treatments",
      description: "Rejuvenate your skin with our premium facial treatments tailored to your specific skin concerns.",
      price: "$79",
      image: service1
    },
    {
      id: 2,
      title: "Hair Treatments",
      description: "Advanced treatments to promote natural hair growth and restore thickness and volume.",
      price: "$129",
      image: service2
    },
    {
      id: 3,
      title: "Laser Treatments",
      description: "Detailed skin analysis using cutting-edge technology to identify your unique skin needs.",
      price: "$49",
      image: service3
    },
    {
      id: 4,
      title: "Body Treatments",
      description: "Comprehensive body treatments to address skin concerns from head to toe.",
      price: "$99",
      image: service4
    }
  ];

  return (
    <div className=" py-16 px-4 md:px-8 lg:px-16">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className={`w-full text-center md:text-left transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="w-full text-center text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-serif font-light text-gray-800 mb-6 leading-tight text-zinc-800 font-serif font-light text-gray-800 mb-6 leading-tight">
                Our Premium Treatments
              </h2>

            <p className={`w-full text-sm md:text-md
            lg:text-md xl:text-md text-center text-gray-900 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`} style={{ transitionDelay: "200ms" }}>
                Discover our range of specialized skin and hair treatments designed to enhance your natural beauty.
              </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 m-auto align-items-center justify-items-center">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              isVisible={isVisible} 
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, isVisible, index, isMobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle click for mobile devices
  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  // For accessibility and mobile: separate interaction states
  const isInfoVisible = isMobile ? isExpanded : isHovered;
  
  // Reset expanded state when visibility changes (scrolling in/out)
  useEffect(() => {
    if (!isVisible) {
      setIsExpanded(false);
    }
  }, [isVisible]);
  
  return (
    <div 
      className={`relative w-60 h-60  shadow-lg overflow-hidden transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${isMobile ? 'cursor-pointer' : ''}`}
      style={{ transitionDelay: isVisible ? `${(index + 2) * 150}ms` : '0ms' }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Full-size image background */}
      <img 
        src={service.image} 
        alt={service.title} 
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isInfoVisible ? 'scale-110' : 'scale-100'}`}
      />
      
      {/* Gradient overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
      
      {/* Service title always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-lg font-light text-white mb-2 text-center">{service.title}</h3>
      </div>
      
      {/* Content overlay that appears on hover/tap */}
      <div 
        className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center p-6 transition-opacity duration-500 ${isInfoVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <h3 className="text-2xl font-medium text-white mb-4">{service.title}</h3>
        <p className="text-white mb-6">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold text-cream-400">{service.price}</span>
          <button className="bg-cream-400 hover:bg-cream-500 text-brown-800 py-2 px-4 rounded transition-colors duration-300">
            Book Now
          </button>
        </div>
        
        {/* Mobile-only indicator */}
        {isMobile && (
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-brown-800 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}