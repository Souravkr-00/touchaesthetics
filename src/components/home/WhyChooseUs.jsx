"use client"

import { useEffect, useRef, useState } from "react"
import { FaMedal, FaUserMd, FaRegLightbulb, FaRegSmile } from "react-icons/fa"
import WCU1 from "../../assets/images/wcu1.jpg"
import WCU2 from "../../assets/images/wcu2.jpg"
import WCU3 from "../../assets/images/wcu3.jpg"
import WCU4 from "../../assets/images/wcu4.jpg"

const WhyChooseUs = () => {
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
      },
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

  const reasons = [
    {
      icon: <FaMedal className="w-8 h-8 text-[#c8a287]" />,
      title: "Expert Dermatologists",
      description:
        "Our team consists of board-certified dermatologists with specialized training in aesthetic procedures.",
      subPoints: [
        "20+ years of combined experience",
        "Continuous education in latest techniques",
        "Personalized treatment approach",
      ],
    },
    {
      icon: <FaRegLightbulb className="w-8 h-8 text-[#c8a287]" />,
      title: "Advanced Technology",
      description: "We invest in state-of-the-art equipment and use only premium products for optimal results.",
      subPoints: [
        "FDA-approved devices and treatments",
        "Medical-grade skincare products",
        "Cutting-edge laser technology",
      ],
    },
    {
      icon: <FaUserMd className="w-8 h-8 text-[#c8a287]" />,
      title: "Customized Care",
      description:
        "We believe that each patient is unique, requiring personalized treatment plans tailored to individual needs.",
      subPoints: ["Comprehensive skin analysis", "Customized treatment protocols", "Ongoing support and follow-up"],
    },
    {
      icon: <FaRegSmile className="w-8 h-8 text-[#c8a287]" />,
      title: "Proven Results",
      description:
        "Our clinic has helped thousands of patients achieve their desired skin and beauty goals with natural-looking results.",
      subPoints: [
        "High patient satisfaction rate",
        "Transparent before & after documentation",
        "Long-lasting, natural results",
      ],
    },
  ]

  return (
    <section ref={sectionRef} className="w-full bg-[#fff8f2] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#c8a287] mb-4 leading-tight">
            Why Choose Touche Aesthetics?
          </h2>
          <p className="text-[#7d6e63] text-lg max-w-3xl mx-auto">
            Delhi's Premier Skin Specialist Clinic Dedicated to Your Beauty and Confidence
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Reasons */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex gap-4">
                    <div className="h-full mt-1 bg-[#f9f3ee] p-3 rounded-lg shadow-sm">{reason.icon}</div>
                    <div>
                      <h3 className="text-xl font-medium text-[#b08e75] mb-2">{reason.title}</h3>
                      <p className="text-[#7d6e63] mb-3">{reason.description}</p>
                      <ul className="space-y-1">
                        {reason.subPoints.map((point, idx) => (
                          <li
                            key={idx}
                            className={`flex items-center text-sm text-[#7d6e63] transition-all duration-500 ${
                              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                            }`}
                            style={{ transitionDelay: `${index * 150 + idx * 100 + 200}ms` }}
                          >
                            <span className="w-1.5 h-1.5 bg-[#c8a287] rounded-full mr-2"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image Collage */}
          {/* Right side - Image Collage */}
<div className="w-full lg:w-1/2 relative">
  <div className="relative h-[500px] md:h-[600px]">
    {/* Decorative elements */}
    <div
      className={`absolute -bottom-8 -right-8 w-40 h-40 bg-[#f3e8e0] rounded-full opacity-60 transition-all duration-1000 ${
        isVisible ? "scale-100 opacity-60" : "scale-50 opacity-0"
      }`}
      style={{ transitionDelay: "200ms" }}
    ></div>
    <div
      className={`absolute -top-8 -left-8 w-32 h-32 bg-[#e9d5c9] rounded-full opacity-40 transition-all duration-1000 ${
        isVisible ? "scale-100 opacity-40" : "scale-50 opacity-0"
      }`}
      style={{ transitionDelay: "400ms" }}
    ></div>

    {/* Top left image */}
    <div
      className={`absolute top-[5%] left-[2%] w-[45%] h-[45%] shadow-xl rounded-2xl overflow-hidden z-10 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 -translate-y-30 -translate-x-30"
      }`}
    >
      <img
        src={WCU1}
        alt="Skin treatment"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Top right image */}
    <div
      className={`absolute top-[5%] right-[5%] w-[45%] h-[45%] shadow-xl rounded-2xl overflow-hidden z-10 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 -translate-y-30 translate-x-30"
      }`}
      style={{ transitionDelay: "300ms" }}
    >
      <img
        src={WCU2}
        alt="Skin consultation"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Bottom center image - larger and centered */}
    <div
      className={`absolute bottom-[2%] left-[2%] w-[45%] h-[45%] shadow-xl rounded-2xl overflow-hidden z-10 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-30 -translate-x-30"
      }`}
      style={{ transitionDelay: "500ms" }}
    >
      <img
        src={WCU3}
        alt="Skin care products"
        className="w-full h-full object-cover"
      />
    </div>

    <div
      className={`absolute bottom-[2%] right-[5%] w-[45%] h-[45%] shadow-xl rounded-2xl overflow-hidden z-10 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : "opacity-0 translate-y-30 translate-x-30"
      }`}
      style={{ transitionDelay: "500ms" }}
    >
      <img
        src={WCU4}
        alt="Skin care products"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Floating badge */}
    <div
      className={`absolute top-[-8%] right-[5%] bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md z-40 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}
      style={{ transitionDelay: "700ms" }}
    >
      <p className="text-[#c8a287] font-medium text-sm">Trusted by</p>
      <p className="text-[#7d6e63] text-xs">5000+ Happy Clients</p>
    </div>
  </div>
</div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
