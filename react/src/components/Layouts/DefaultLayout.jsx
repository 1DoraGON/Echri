import React, { useEffect } from 'react'
import RequireAuth from '../Permissions/RequireAuth'
import { removeToken } from '../../app/UserSlice';
import { useDispatch } from 'react-redux';

const DefaultLayout = () => {

  
  const dispatch = useDispatch()
  useEffect(()=> {
    //console.log(localStorage);
    //dispatch(removeToken())

  },[])

  return (
    <RequireAuth />
  )
}

export default DefaultLayout