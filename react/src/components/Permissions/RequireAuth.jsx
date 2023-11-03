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

import { useDispatch } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { setUser } from '../../app/UserSlice'
import useAuth from '../../hooks/useAuth'
import axiosClient from '../../api/axios'

const RequireAuth = () => {
  const auth = useAuth()
  const location = useLocation();
  const dispatch = useDispatch();
  if (auth && Object.keys(auth.user).length === 0) {
    console.log('hahha',auth)
    axiosClient.get('/api/user').then(response=>{
      //console.log(response.data);
      dispatch(setUser(response.data))
    });
  }
  return (
    auth? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
  )
}

export default RequireAuth
