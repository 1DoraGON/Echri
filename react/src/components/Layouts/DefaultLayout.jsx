import React from 'react'
import RequireAuth from '../Permissions/RequireAuth'

const DefaultLayout = () => {


  return (
    <RequireAuth />
  )
}

export default DefaultLayout