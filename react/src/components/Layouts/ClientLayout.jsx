import { Outlet } from 'react-router-dom';

import { Footer, Navbar } from '../HomePage/index'
import { footerAPI } from '../../data/data.js'
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axiosClient from '../../api/axios';
import { setUser } from '../../app/UserSlice';
const ClientLayout = () => {
  const auth = useAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    if (auth) {
      axiosClient.get('/api/user').then(response => {
        console.log(response);
        dispatch(setUser(response.data))
      })
    }

  }, [])
  return (
    <>
      <Navbar />

      <Outlet />
      <Footer footerapi={footerAPI} />
    </>
  )
}

export default ClientLayout