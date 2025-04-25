"use client"

import { useEffect, useRef, useState } from "react"
import { FaHeartbeat } from "react-icons/fa"
import ourvision from "../../assets/images/ourvision.jpg"
const OurVision = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // Reset animation when out of view for repeat effect
          setIsVisible(false)
        }
      },
      {
        threshold: 0.15,
      }
    )

    const currentSection = sectionRef.current
    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="w-full py-16 md:py-24 overflow-hidden bg-gradient-to-r from-[#f9f5f2] to-[#fdf8f5]"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left side - Vision image */}
          <div 
            className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="relative">
              {/* Main image */}
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={ourvision} 
                  alt="Our Vision" 
                  className="w-full h-auto object-cover rounded-lg"
                  // You'll need to add your actual image path
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-[#e9d5c9] rounded-full opacity-30"></div>
              <div className="absolute -z-10 -top-6 -right-6 w-40 h-40 bg-[#f3e8e0] rounded-full opacity-50"></div>
              
              {/* Stats badge */}
              <div className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-10 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                <div className="flex items-center gap-2">
                  <FaHeartbeat className="text-[#c8a287] w-5 h-5" />
                  <span className="text-[#c8a287] font-medium">10+ Years</span>
                </div>
                <p className="text-[#7d6e63] text-sm mt-1">Of Excellence in Skin Care</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Vision text */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
          }`}>
            <div className="mb-6">
              <h4 className="text-[#c8a287] font-medium mb-2 tracking-wider text-lg">OUR VISION</h4>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#b08e75] mb-6 leading-tight">
                Transforming Lives Through Skin Excellence
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-[#c8a287] to-[#e9d5c9] mb-6"></div>
            </div>
            
            <div className="space-y-6">
              <p className={`text-[#7d6e63] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`} style={{ transitionDelay: "200ms" }}>
                At our clinic, we envision a world where everyone feels confident in their skin. We believe that healthy, 
                radiant skin is not just about appearance—it's about feeling your best self and embracing your natural beauty.
              </p>
              
              <p className={`text-[#7d6e63] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`} style={{ transitionDelay: "400ms" }}>
                Our vision extends beyond traditional treatments to create a holistic approach that combines cutting-edge 
                technology with personalized care, ensuring each client receives the perfect solution for their unique needs.
              </p>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`} style={{ transitionDelay: "600ms" }}>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  <h3 className="text-[#b08e75] font-medium text-lg mb-2">Natural Results</h3>
                  <p className="text-[#7d6e63] text-sm">We believe in enhancing your natural beauty, not changing who you are.</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                  <h3 className="text-[#b08e75] font-medium text-lg mb-2">Innovation First</h3>
                  <p className="text-[#7d6e63] text-sm">We constantly evolve with the latest advances in dermatological science.</p>
                </div>
              </div>
              
              <div className={`mt-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`} style={{ transitionDelay: "800ms" }}>
                <button className="bg-[#c8a287] hover:bg-[#b08e75] text-white px-8 py-3 rounded-md shadow-sm hover:shadow transition-all duration-300">
                  Discover Our Approach
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurVision