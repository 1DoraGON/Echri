import Login from '../Registration/Login'
import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const GuestLayout = () => {

  const auth = useAuth()

  return (
    auth? <Navigate to="/" /> :
    <Outlet />
  )
}

export default GuestLayout