import { Outlet } from 'react-router-dom';

import { Footer, Navbar } from '../HomePage/index'
import { footerAPI } from '../../data/data.js'
const ClientLayout = () => {

  return (
    <>
      <Navbar />

      <Outlet />
      <Footer footerapi={footerAPI} />
    </>
  )
}

export default ClientLayout