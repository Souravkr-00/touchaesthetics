import React from 'react'
import Banner from '../components/home/Banner'
import WhyChooseUs from '../components/home/WhyChooseUs'
import OurVision from '../components/home/OurVision'
import ServicesPreview from '../components/home/ServicesPreview'
function Home() {
  return (
    <>
        <div className='overflow-hidden w-full'>
            <Banner/>
            <WhyChooseUs/>
            <ServicesPreview/>
            <OurVision/>
        </div>
    </>
  )
}

export default Home