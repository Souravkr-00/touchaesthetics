import { useState, useEffect, useRef } from 'react';
import aboutbanner from "../assets/images/aboutbanner.jpg"
import banner1 from "../assets/images/banner1.jpg"
export default function About() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    story: false,
    mission: false,
    values: false,
    achievements: false,
    team: false,
    testimonials: false,
    locations: false,
    cta: false
  });
  
  const [isMobile, setIsMobile] = useState(false);
  
  // Create refs for each section
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const achievementsRef = useRef(null);
  const teamRef = useRef(null);
  const testimonialsRef = useRef(null);
  const locationsRef = useRef(null);
  const ctaRef = useRef(null);
  
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
    const storyObserver = createObserver(storyRef, 'story');
    const missionObserver = createObserver(missionRef, 'mission');
    const valuesObserver = createObserver(valuesRef, 'values');
    const achievementsObserver = createObserver(achievementsRef, 'achievements');
    const teamObserver = createObserver(teamRef, 'team');
    const testimonialsObserver = createObserver(testimonialsRef, 'testimonials');
    const locationsObserver = createObserver(locationsRef, 'locations');
    const ctaObserver = createObserver(ctaRef, 'cta');
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      // Clean up observers
      if (heroRef.current) heroObserver.unobserve(heroRef.current);
      if (storyRef.current) storyObserver.unobserve(storyRef.current);
      if (missionRef.current) missionObserver.unobserve(missionRef.current);
      if (valuesRef.current) valuesObserver.unobserve(valuesRef.current);
      if (achievementsRef.current) achievementsObserver.unobserve(achievementsRef.current);
      if (teamRef.current) teamObserver.unobserve(teamRef.current);
      if (testimonialsRef.current) testimonialsObserver.unobserve(testimonialsRef.current);
      if (locationsRef.current) locationsObserver.unobserve(locationsRef.current);
      if (ctaRef.current) ctaObserver.unobserve(ctaRef.current);
    };
  }, []);

  // Color scheme based on text-[#7d6e63]
  const colors = {
    primary: "#7d6e63", // Base color
    light: "#a89a91", // Lighter shade for backgrounds
    lighter: "#e8e2db", // Very light shade for container backgrounds
    dark: "#5d5149", // Darker shade for emphasis
    accent: "#b2a192", // Accent color for buttons, etc.
  };

  // Values data
  const values = [
    {
      id: 1,
      title: "Excellence",
      description: "We strive for excellence in every treatment, using advanced technologies and proven methods for optimal results.",
      icon: "✦" // Using a simple character as placeholder for icon
    },
    {
      id: 2,
      title: "Personalization",
      description: "Every skin is unique. We tailor our approach to address your specific concerns and goals.",
      icon: "✦"
    },
    {
      id: 3,
      title: "Trust",
      description: "We build lasting relationships with our patients based on honesty, transparency, and consistent results.",
      icon: "✦"
    },
    {
      id: 4,
      title: "Innovation",
      description: "We continuously update our knowledge and techniques to incorporate the latest advancements in dermatology.",
      icon: "✦"
    }
  ];

  // Achievements data
  const achievements = [
    {
      id: 1,
      number: "15+",
      label: "Years of Excellence"
    },
    {
      id: 2,
      number: "25K+",
      label: "Satisfied Patients"
    },
    {
      id: 3,
      number: "12",
      label: "Expert Specialists"
    },
    {
      id: 4,
      number: "8",
      label: "Locations Nationwide"
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote: "The personalized care I received at SkinCare Clinic transformed my skin completely. Their team took the time to understand my concerns and created a treatment plan that truly worked for me.",
      author: "Priya M.",
      location: "Delhi"
    },
    {
      id: 2,
      quote: "After struggling with hair loss for years, I finally found a solution with Dr. Kapoor. His expertise and the clinic's advanced treatments have given me my confidence back.",
      author: "Arjun S.",
      location: "Mumbai"
    }
  ];

  // Location data
  const locations = [ 
    {
      id: 2,
      city: "Delhi",
      address: "A/41, South Extension Part-2, New Delhi - 110049, India",
      phone: "+91 9220546827",
      image: banner1
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-96 md:h-[500px] bg-gradient-to-r from-[#f7f4f1] to-[#e8e2db] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={aboutbanner} 
            alt="Modern dermatology clinic" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center text-center">
          <div className={`transition-all duration-1000 transform ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif font-light text-[#c8a287] mb-6">About Our Clinic</h1>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-[#7d6e63] max-w-3xl">
              Transforming lives through advanced dermatology and personalized care since 2010
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div ref={storyRef} className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-12">
            <div className={`md:w-1/2 mb-8 md:mb-0 transition-all duration-1000 transform ${isVisible.story ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <img 
                src={banner1} 
                alt="Our clinic founder" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className={`md:w-1/2 transition-all duration-1000 transform ${isVisible.story ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">Our Story</h2>
              <div className="w-16 h-1 bg-[#b2a192] mb-6"></div>
              <p className="text-[#7d6e63] mb-4">
                Founded in 2010 by Dr. Subhanshu Singh Rajput, SkinCare Clinic began as a small practice with a powerful vision: to combine medical expertise with a personalized approach to skincare.
              </p>
              <p className="text-[#7d6e63] mb-4">
                After years of working in leading hospitals, Dr. Singh recognized the need for a dermatology clinic that not only offered cutting-edge treatments but also took the time to understand each patient's unique concerns and goals.
              </p>
              <p className="text-[#7d6e63]">
                Today, we've grown to multiple locations across India, but our commitment remains the same: providing exceptional care that helps our patients feel confident in their skin.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mission & Vision Section */}
      <div ref={missionRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#f7f4f1]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">Mission & Vision</h2>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className={`md:w-1/2 bg-white p-8 rounded-lg shadow-md mb-8 md:mb-0 transition-all duration-1000 transform ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                 style={{ transitionDelay: isVisible.mission ? '200ms' : '0ms' }}>
              <h3 className="text-2xl font-semibold text-[#5d5149] mb-4">Our Mission</h3>
              <div className="w-12 h-1 bg-[#b2a192] mb-6"></div>
              <p className="text-[#7d6e63]">
                To provide accessible, comprehensive, and personalized dermatological care that enhances our patients' quality of life. We strive to solve skin and hair concerns with evidence-based treatments while ensuring a supportive and caring environment for every patient.
              </p>
            </div>
            
            <div className={`md:w-1/2 bg-white p-8 rounded-lg shadow-md transition-all duration-1000 transform ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                 style={{ transitionDelay: isVisible.mission ? '400ms' : '0ms' }}>
              <h3 className="text-2xl font-semibold text-[#5d5149] mb-4">Our Vision</h3>
              <div className="w-12 h-1 bg-[#b2a192] mb-6"></div>
              <p className="text-[#7d6e63]">
                To be India's most trusted dermatology practice, known for our exceptional medical expertise, innovative treatments, and holistic approach to skin and hair health. We aim to continuously raise standards in dermatological care and expand our reach to help more individuals achieve healthy, radiant skin.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div ref={valuesRef} className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
            <p className="text-[#7d6e63] max-w-3xl mx-auto">
              These core principles guide everything we do at SkinCare Clinic, from how we treat our patients to how we develop our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.id}
                className={`bg-[#f7f4f1] p-6 rounded-lg transition-all duration-1000 transform ${isVisible.values ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: isVisible.values ? `${index * 200}ms` : '0ms' }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#b2a192] text-white rounded-full mb-4 mx-auto">
                  <span className="text-xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-serif font-light text-[#c8a287] mb-3 text-center">{value.title}</h3>
                <p className="text-[#7d6e63] text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Achievements Section */}
      <div ref={achievementsRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#5d5149] text-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">Our Achievements</h2>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <div 
                key={item.id}
                className={`text-center transition-all duration-1000 transform ${isVisible.achievements ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: isVisible.achievements ? `${index * 200}ms` : '0ms' }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#b2a192] mb-2">{item.number}</div>
                <div className="text-sm md:text-base">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Team Glimpse Section */}
      <div ref={teamRef} className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
            <p className="text-[#7d6e63] max-w-3xl mx-auto">
              Our talented team of specialists is passionate about helping you achieve your skin goals.
            </p>
          </div>
          
          <div className={`relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg transition-all duration-1000 transform ${isVisible.team ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <img 
              src="/api/placeholder/1200/400" 
              alt="Our medical team" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-white text-lg md:text-xl mb-4">
                With backgrounds from premier medical institutions, our doctors combine expertise with compassion.
              </p>
              <a href="/team" className="inline-block px-6 py-2 bg-[#b2a192] hover:bg-[#a89a91] text-white font-medium rounded transition-colors duration-300">
                View Full Team
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#f7f4f1]">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-serif font-light text-[#c8a287] mb-4">What Our Patients Say</h2>
            <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`bg-white p-6 md:p-8 rounded-lg shadow-md transition-all duration-1000 transform ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: isVisible.testimonials ? `${index * 300}ms` : '0ms' }}
              >
                <div className="text-[#b2a192] text-4xl mb-4">"</div>
                <p className="text-[#7d6e63] mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#e8e2db] rounded-full mr-4"></div>
                  <div>
                    <div className="font-medium text-[#5d5149]">{testimonial.author}</div>
                    <div className="text-sm text-[#a89a91]">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
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
              Find us at one of our state-of-the-art clinics across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div 
                key={location.id}
                className={`bg-[#f7f4f1] rounded-lg overflow-hidden shadow-md transition-all duration-1000 transform ${isVisible.locations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: isVisible.locations ? `${index * 200}ms` : '0ms' }}
              >
                <img 
                  src={location.image} 
                  alt={`${location.city} clinic`} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-serif font-light text-[#c8a287] mb-2">{location.city}</h3>
                  <p className="text-[#7d6e63] mb-2">{location.address}</p>
                  <p className="text-[#7d6e63] font-medium">{location.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div ref={ctaRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#e8e2db]">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 transform ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl md:text-3xl font-serif font-light text-[#c8a287] mb-4">Begin Your Skin Transformation Journey</h3>
          <p className="text-[#7d6e63] mb-8 max-w-2xl mx-auto">
            Book a consultation with our experts and discover personalized solutions for your skin and hair concerns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-[#b2a192] hover:bg-[#a89a91] text-white font-medium rounded-lg transition-colors duration-300 shadow-md">
              Book a Consultation
            </button>
            <button className="px-8 py-3 bg-white hover:bg-gray-50 text-[#7d6e63] font-medium rounded-lg transition-colors duration-300 shadow-md border border-[#a89a91]">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}