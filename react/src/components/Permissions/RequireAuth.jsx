/* import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth; */

import React, { useDebugValue } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectToken } from '../../app/UserSlice'
import useAuth from '../../hooks/useAuth'

const RequireAuth = () => {
  const auth = useAuth()
  const location = useLocation();
  //useDebugValue(auth)
  useDebugValue(location)

  return (
    auth? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
  )
}

export default RequireAuth
