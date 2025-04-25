
import { useEffect, useRef, useState } from "react"
import banner1 from "../../assets/images/banner1.jpg"
const Banner = () => {
  const bannerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
      },
    )

    const currentBanner = bannerRef.current
    if (currentBanner) {
      observer.observe(currentBanner)
    }

    return () => {
      if (currentBanner) {
        observer.unobserve(currentBanner)
      }
    }
  }, [])

  return (
    <section
      ref={bannerRef}
      className="w-full bg-gradient-to-r from-[#f9f3ee] to-[#fff8f2] py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div
            className={`w-full md:w-1/2 pr-0 md:pr-12 mb-12 md:mb-0 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#c8a287] mb-6 leading-tight">
              Discover Your Natural Beauty
            </h2>

            <p className="text-[#7d6e63] mb-6 text-lg leading-relaxed">
              At Touche Aesthetics, we believe in enhancing your natural beauty through advanced, gentle treatments tailored to
              your unique needs. Our team of board-certified dermatologists and skincare specialists bring over 20 years
              of combined experience.
            </p>

            <p className="text-[#7d6e63] mb-8 text-lg leading-relaxed">
              We pride ourselves on creating personalized treatment plans that deliver noticeable, natural-looking
              results. Our patients consistently praise our attentive care, comfortable environment, and exceptional
              outcomes.
            </p>

            <div
              className={`transition-all duration-1000 delay-300 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <button className="bg-[#c8a287] hover:bg-[#b08e75] text-white px-8 py-3 rounded-full transition-colors duration-300 shadow-sm font-medium text-lg">
                Meet Our Specialists
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 delay-150 ease-out ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-95"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={banner1}
                alt="Skin care specialist with patient"
                className="w-full h-auto rounded-2xl object-cover"
              />

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#f3e8e0] rounded-full opacity-60"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#e9d5c9] rounded-full opacity-40"></div>

              {/* Floating badge */}
              <div
                className={`absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                }`}
              >
                <p className="text-[#c8a287] font-medium text-sm">Certified Specialists</p>
                <p className="text-[#7d6e63] text-xs">10+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
