import React, { useEffect } from 'react'
import axiosClient from '../../api/axios'

const Profile = () => {
  useEffect(()=>{
    axiosClient.get('/api/users').then(response=>{
      console.log(response);
    })
    
  },[])
  return (
    <div>Profile</div>
  )
}

export default Profile