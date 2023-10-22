import { Outlet } from 'react-router-dom';

import { Footer, Navbar } from '../HomePage/index'
import { footerAPI } from '../../data/data.js'
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axios';
import { setUser } from '../../app/UserSlice';
import LoadingScreen from '../utils/LoadingScreen';
const ClientLayout = () => {
  const auth = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    if (auth) {
      axiosClient.get('/api/user').then(response => {
        console.log(response);
        dispatch(setUser(response.data))
        setIsLoading(false)
      })
    }

  }, [])
  return (
    <>
        
      {isLoading && (
        <LoadingScreen />
      )}
      <Navbar />

      <Outlet />
      <Footer footerapi={footerAPI} />
    </>
  )
}

export default ClientLayout