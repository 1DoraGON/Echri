import Login from '../Registration/Login'
import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import NotFound from '../Views/NotFound'

const GuestLayout = () => {

  const auth = useAuth()
//<Navigate to="/" />
  return (
    !auth? <Outlet /> : <NotFound />
    
  )
}

export default GuestLayout