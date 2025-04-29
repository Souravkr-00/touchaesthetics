import React from 'react'
import Banner from '../components/home/Banner'
import WhyChooseUs from '../components/home/WhyChooseUs'
import OurVision from '../components/home/OurVision'
import AppointmentPopup from '../components/appointment/AppointmentPopup'
import ServicesCarousel from '../components/home/ServicesCarousel'
import TreatmentsSection from '../components/home/TreatmentsSection'
import ServicesSection from '../components/home/ServicesSection'
import TreatmentProcess from '../components/home/TreatmentProcess'
// import ServicesSection from '../components/home/ServicesPreview'
function Home() {
  return (
    <>
        <div className='relative overflow-hidden w-full'>
            <Banner/>
            <TreatmentsSection/>
            <ServicesSection/>
            <TreatmentProcess/>
            {/* <WhyChooseUs/> */}
            <OurVision/>
            <AppointmentPopup/>
        </div>
    </>
  )
}

export default Home