import React, { useEffect } from 'react'
import RequireAuth from '../Permissions/RequireAuth'
import { removeToken } from '../../app/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DefaultLayout = () => {
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  useEffect(()=> {
    //console.log(localStorage);
    //navigate('/profile')
    //dispatch(removeToken())

  },[])

  return (
    <RequireAuth />
  )
}

export default DefaultLayout