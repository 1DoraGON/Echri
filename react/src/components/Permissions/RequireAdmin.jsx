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

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import RequireAuth from './RequireAuth';

const RequireAdmin = () => {
  const auth = useAuth()
  const location = useLocation();
  console.log(auth?.user?.is_admin === 1? 'its admin' : 'not admin');
  return (
    <RequireAuth>

      {auth?.user?.is_admin === 1? <Outlet /> : <Navigate to="/" state={{from: location}} replace />}
    </RequireAuth>
  )
}

export default RequireAdmin
