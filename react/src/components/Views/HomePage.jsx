
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from '../HomePage/index'
import { footerAPI, heroapi, highlight, popularsales, sneaker, story, toprateslaes } from '../../data/data.js'
import { useEffect, useState } from 'react'
import axiosClient from '../../api/axios'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { selectFilterPage } from '../../app/ProductsSlice'
function HomePage() {
  const filterPage = useSelector(selectFilterPage)
  return (
    <>
      <Cart />
      <main className='flex flex-col gap-16 relative'>
        {!filterPage && <Hero heroapi={heroapi} /> }
        <Sales sales={toprateslaes}/>

        {!filterPage && <FlexContent endpoint={highlight} isLeft />}
        {/*         <Sales sales = {latestProducts} ifExists />
 */}
        {!filterPage && <FlexContent endpoint={sneaker} />}
        <Stories story={story} />
      </main>
    </>
  )
}

export default HomePage
