
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from '../HomePage/index'
import { footerAPI, heroapi, highlight, popularsales, sneaker, story, toprateslaes } from '../../data/data.js'
import { useEffect, useState } from 'react'
import axiosClient from '../../api/axios'
import { toast } from 'react-hot-toast'
function HomePage() {

  return (
    <>
      <Navbar />
      <Cart />
      <main className='flex flex-col gap-16 relative'>
        <Hero heroapi={heroapi} />
        <Sales sales={toprateslaes}/>
        <FlexContent endpoint={highlight} isLeft />
        {/*         <Sales sales = {latestProducts} ifExists />
 */}
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
      </main>
      <Footer footerapi={footerAPI} />
    </>
  )
}

export default HomePage
