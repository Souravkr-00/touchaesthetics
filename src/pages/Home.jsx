import React from 'react'
import Banner from '../components/home/Banner'
import WhyChooseUs from '../components/home/WhyChooseUs'
import OurVision from '../components/home/OurVision'
import ServicesPreview from '../components/home/ServicesPreview'
import AppointmentPopup from '../components/appointment/AppointmentPopup'
function Home() {
  return (
    <>
        <div className='overflow-hidden w-full'>
            <Banner/>
            <WhyChooseUs/>
            <ServicesPreview/>
            <OurVision/>
            <AppointmentPopup/>
        </div>
    </>
  )
}

export default Home