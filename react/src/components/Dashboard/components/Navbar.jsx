import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../../../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu, selectCart, selectChat, selectNotification, selectScreenSize, selectUserProfile, setActiveMenu, setCart, setChat, setNotification, setScreenSize, setUserProfile } from '../../../app/ThemeSlice';
import NavButton from './utils/NavButton';
const Navbar = () => {
  const activeMenu = useSelector(selectActiveMenu)
  const dispatch = useDispatch()
  const cart = useSelector(selectCart)
  const chat = useSelector(selectChat)
  const notification = useSelector(selectNotification)
  const userProfile = useSelector(selectUserProfile)
  const screenSize = useSelector(selectScreenSize)

  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenSize(window.innerWidth))
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize',handleResize)
    }
  }, [])
  useEffect(()=>{

    if (screenSize <= 900) {
      dispatch(setActiveMenu(false))
    } else {
      dispatch(setActiveMenu(true))
    }
  },[screenSize])
  return (
    <>
      <div className="flex justify-between p-2 md:mr-6 md:mx-6 relative">
        <NavButton title="Menu" customFunc={() => { dispatch(setActiveMenu(!activeMenu)) }} color="blue" icon={<AiOutlineMenu />} />
        <div className="flex">
          <NavButton title="Cart" customFunc={() => { dispatch(setCart(!cart)) }} color="blue" icon={<FiShoppingCart />} />
          <NavButton title="Chat" dotColor="#03c9d7" customFunc={() => { dispatch(setChat(!chat)) }} color="blue" icon={<BsChatLeft />} />
          <NavButton title="Chat" dotColor="#03c9d7" customFunc={() => { dispatch(setNotification(!notification)) }} color="blue" icon={<RiNotification3Line />} />
          <TooltipComponent content="Profile" position='BottomCenter'>
            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg " onClick={()=>{dispatch(setUserProfile(!userProfile))}}>
              <img src={avatar} alt="avatar" className='rounded-full w-8 h-8' />
              <p className=''> <span className='text-gray-400 text-14'>Hi, </span> {' '} <span className='text-gray-400 font-bold ml-1 text-14'>Amir</span> </p>
              <MdKeyboardArrowDown className='text-gray-400 text-14 ' />
            </div>
          </TooltipComponent>
          {cart && <Cart />}
          {notification && <Notification />}
          {chat && <Chat />}
          {userProfile && <UserProfile />}

        </div>
      </div>
    </>
  )
}

export default Navbar