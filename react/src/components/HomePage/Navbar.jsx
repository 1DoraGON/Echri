import React, { useEffect, useState } from 'react'
import { HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'
import logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartTotalQantity, setOpenCart, setTotals } from '../../app/CartSlice'
import { selectFilterPage } from '../../app/ProductsSlice'
import { Link, useNavigate } from 'react-router-dom'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { MdKeyboardArrowDown } from 'react-icons/md'
import useAuth from '../../hooks/useAuth'
import { selectUserProfile, setUserProfile } from '../../app/ThemeSlice'
import Profile from '../Views/Profile'
const Navbar = () => {
  const filterPage = useSelector(selectFilterPage)
  const [navState, setNavState] = useState(false)
  const totalCount = useSelector(selectCartTotalQantity)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useAuth()
  const userProfile = useSelector(selectUserProfile)

  const onCartToggle = () => {
    dispatch(setOpenCart({
      cartState: true
    }))
  }

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true)
    } else {
      setNavState(false)
    }
  }

  const handleNavigateHome = () => {
    navigate('/products')
  }

  useEffect(() => {
    dispatch(setTotals())
    window.addEventListener('scroll', onNavScroll)

    return () => {
      window.removeEventListener('scroll', onNavScroll)
    }
  }, [])
  return (
    <>
      <header className={`${!navState ? 'absolute top-7 left-0 right-0 opacity-100 z-50 ' : 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme'} ${filterPage && navState ? 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[1000] blur-effect-theme' : ''}`}>
        <nav className="flex items-center justify-between nike-container">
          <div onClick={handleNavigateHome} className="flex items-center cursor-pointer">
            <img src={logo} alt="logo/img"
              className={`w-16 h-auto ${(navState || filterPage) && "filter brightness-0"}`}
            />
          </div>
          <ul className="flex items-center justify-center gap-2">
            {/*             <li className="grid items-center">
              <MagnifyingGlassIcon className={`icon-style ${(navState || filterPage) && "text-slate-900 transition-all duration-300"}`} />
            </li>
            <li className='grid items-center'>
              <HeartIcon className={`icon-style ${(navState || filterPage) && "text-slate-900 transition-all duration-300"}`} />
            </li> */}
            <li className='grid items-center'>
              {auth ? (
                <TooltipComponent content="Profile" position='BottomCenter'>
                  <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg " onClick={() => { dispatch(setUserProfile(!userProfile)) }}>
                    <img src={auth.user.picture} alt="avatar" className='rounded-full w-8 h-8' />
                    <p className=''> <span className='text-gray-400 text-14'>Hi, </span> {' '} <span className='text-gray-400 font-bold ml-1 text-14'>{auth.user.firstname}</span> </p>
                    <MdKeyboardArrowDown className='text-gray-400 text-14 ' />
                  </div>
                </TooltipComponent>
              ) : (
                <Link to={'/login'} className={`mr-2 text-14 cursor-pointer ${(navState || filterPage) ? ' text-slate-900 hover:text-slate-800' : 'text-slate-100 hover:text-slate-200'}`}> Login </Link>

              )}
              {userProfile && <Profile />}

            </li>
            <li className='grid items-center' onClick={onCartToggle} >
              <button type='button' className='border-none outline-none active:scale-110 transition-all duration-300 relative'>
                <ShoppingBagIcon className={`icon-style ${(navState || filterPage) && "text-slate-900 transition-all duration-300"}`} />
                <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 ${(navState || filterPage) ? 'bg-slate-900 text-slate-100 shadow-slate-900' : 'bg-slate-100 text-slate-900 shadow-slate-100'}`}>{totalCount}</div>
              </button>
            </li>


          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar