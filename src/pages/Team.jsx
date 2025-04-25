import { useState, useEffect, useRef } from 'react';

export default function Team() {
  const [isVisible, setIsVisible] = useState({
    intro: false,
    doctors: false,
    support: false,
    cta: false
  });
  
  const [isMobile, setIsMobile] = useState(false);
  
  const introRef = useRef(null);
  const doctorsRef = useRef(null);
  const supportRef = useRef(null);
  const ctaRef = useRef(null);
  const doctorRefs = useRef([]);
  
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
    
    const introObserver = createObserver(introRef, 'intro');
    const doctorsObserver = createObserver(doctorsRef, 'doctors');
    const supportObserver = createObserver(supportRef, 'support');
    const ctaObserver = createObserver(ctaRef, 'cta');
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (introRef.current) introObserver.unobserve(introRef.current);
      if (doctorsRef.current) doctorsObserver.unobserve(doctorsRef.current);
      if (supportRef.current) supportObserver.unobserve(supportRef.current);
      if (ctaRef.current) ctaObserver.unobserve(ctaRef.current);
    };
  }, []);

  const doctors = [
    {
      id: 1,
      name: "Dr. Neha Singh",
      title: "Dermatologist",
      qualifications: "MD Dermatology, 10+ yrs exp.",
      specialties: ["Acne Treatment", "Chemical Peels", "Botox"],
      location: "Main Branch",
      image: "/api/placeholder/400/400"
    },
    {
      id: 2,
      name: "Dr. Rahul Kapoor",
      title: "Hair Specialist",
      qualifications: "MD Trichology, 8+ yrs exp.",
      specialties: ["Hair Transplant", "PRP Therapy", "Hair Loss Treatment"],
      location: "South Branch",
      image: "/api/placeholder/400/400"
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      title: "Cosmetic Dermatologist",
      qualifications: "MD Dermatology, MRCP, 12+ yrs exp.",
      specialties: ["Laser Therapy", "Anti-aging", "Skin Rejuvenation"],
      location: "Main Branch",
      image: "/api/placeholder/400/400"
    },
    {
      id: 4,
      name: "Dr. Amit Verma",
      title: "Clinical Dermatologist",
      qualifications: "MD Dermatology, Fellowship in Aesthetics, 7+ yrs exp.",
      specialties: ["Psoriasis", "Vitiligo", "Eczema Treatment"],
      location: "East Branch",
      image: "/api/placeholder/400/400"
    }
  ];
  
  const supportTeam = [
    {
      id: 1,
      name: "Anjali Gupta",
      title: "Senior Aesthetician",
      image: "/api/placeholder/300/300"
    },
    {
      id: 2,
      name: "Kiran Reddy",
      title: "Nutrition Consultant",
      image: "/api/placeholder/300/300"
    },
    {
      id: 3,
      name: "Sanjay Mehta",
      title: "Patient Coordinator",
      image: "/api/placeholder/300/300"
    }
  ];

  // Color scheme based on text-[#7d6e63]
  const colors = {
    primary: "#7d6e63", // Base color
    light: "#a89a91", // Lighter shade for backgrounds
    lighter: "#e8e2db", // Very light shade for container backgrounds
    dark: "#5d5149", // Darker shade for emphasis
    accent: "#b2a192", // Accent color for buttons, etc.
  };

  return (
    <div className="bg-white">
      {/* Section 1: Header + Paragraph */}
      <div ref={introRef} className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-[#f7f4f1]">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-700 transform ${isVisible.intro ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#c8a287]  mb-4">Meet Our Experts</h2>
          <div className="w-24 h-1 bg-[#b2a192] mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-[#7d6e63] text-lg">
            We're a passionate team of dermatologists, hair specialists & certified experts delivering care with science-backed results.
          </p>
        </div>
      </div>
      
      {/* Section 2: Doctor Sections with alternating layouts */}
      <div ref={doctorsRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#f7f4f1]">
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-2xl md:text-3xl font-serif font-light text-[#c8a287] mb-12 text-center transition-all duration-700 transform ${isVisible.doctors ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Our Medical Specialists
          </h3>
          
          <div className="space-y-16">
            {doctors.map((doctor, index) => (
              <DoctorSection 
                key={doctor.id} 
                doctor={doctor} 
                isVisible={isVisible.doctors} 
                index={index}
                isImageLeft={index % 2 === 0}
                colors={colors}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Section 3: Support Team */}
      <div ref={supportRef} className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className={`text-2xl md:text-3xl font-serif font-light text-[#c8a287] mb-12 text-center transition-all duration-700 transform ${isVisible.support ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Support Team
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportTeam.map((member, index) => (
              <SupportMemberCard 
                key={member.id} 
                member={member} 
                isVisible={isVisible.support} 
                index={index}
                colors={colors}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Section 4: CTA */}
      <div ref={ctaRef} className="py-16 px-4 md:px-8 lg:px-16 bg-[#e8e2db]">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-700 transform ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl md:text-3xl font-serif font-light text-[#c8a287] mb-4">Ready to Experience Expert Care?</h3>
          <p className="text-[#7d6e63] mb-8 max-w-2xl mx-auto">
            Our team of specialists is ready to provide personalized care for all your skin and hair concerns. Book a consultation today.
          </p>
          <button className="px-8 py-3 bg-[#b2a192] hover:bg-[#a89a91] text-white font-medium rounded-lg transition-colors duration-300 shadow-md">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

function DoctorSection({ doctor, isVisible, index, isImageLeft, colors }) {
  return (
    <div 
      className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: isVisible ? `${index * 200}ms` : '0ms' }}
    >
      <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-lg shadow-lg overflow-hidden`}>
        {/* Doctor Image */}
        <div className="md:w-1/2">
          <div className="relative h-64 md:h-full w-full">
            <img 
              src={doctor.image} 
              alt={doctor.name} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24 opacity-70"></div>
            <div className="absolute bottom-4 left-4">
              <span className="inline-block px-3 py-1 bg-[#b2a192] text-white text-sm font-medium rounded-full">
                {doctor.location}
              </span>
            </div>
          </div>
        </div>
        
        {/* Doctor Info */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-4">
            <h3 className="text-2xl font-serif font-light text-[#c8a287]">{doctor.name}</h3>
            <p className="text-[#7d6e63] font-medium text-lg">{doctor.title}</p>
            <div className="w-16 h-1 bg-[#b2a192] mt-3 mb-4"></div>
          </div>
          
          <p className="text-[#7d6e63] mb-6">{doctor.qualifications}</p>
          
          {/* Specialty Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {doctor.specialties.map((specialty, i) => (
              <span 
                key={i} 
                className="inline-block px-3 py-1 bg-[#e8e2db] text-[#7d6e63] text-sm font-medium rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          {/* Book Appointment Button */}
          <button className="w-full md:w-auto px-6 py-3 bg-[#b2a192] hover:bg-[#a89a91] text-white font-medium rounded transition-colors duration-300 shadow-md">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

function SupportMemberCard({ member, isVisible, index, colors }) {
  return (
    <div 
      className={`text-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : '0ms' }}
    >
      <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#e8e2db]">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <h4 className="text-lg font-serif font-light text-[#c8a287]">{member.name}</h4>
      <p className="text-[#7d6e63]">{member.title}</p>
    </div>
  );
}