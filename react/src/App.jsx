
import {Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories} from './components/index'
import { footerAPI, heroapi, highlight, popularsales, sneaker, story, toprateslaes } from './data/data.js'
function App() {
  return (
    <>
      <Navbar />
      <Cart />
      <main className='flex flex-col gap-16 relative'>
        <Hero heroapi= {heroapi} />
        <Sales sales = {popularsales} ifExists />
        <FlexContent endpoint={highlight} isLeft />
        <Sales sales = {toprateslaes} />
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
      </main>
      <Footer footerapi={footerAPI}/>
    </>
  )
}

export default App
