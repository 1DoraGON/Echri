import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi'
import { Outlet } from 'react-router-dom';

import { Navbar, Footer, Sidebar, ThemeSettings } from '../Dashboard/components';
import { Ecommerce } from '../Dashboard/pages';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveMenu, selectThemeSettings, setThemeSettings } from '../../app/ThemeSlice';

const Dashboard = () => {
  const activeMenu = useSelector(selectActiveMenu);
  const themeSettings = useSelector(selectThemeSettings)
  const dispatch = useDispatch()
  
  
  return (
    <>
    
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4 z-[1000]">
          <TooltipComponent
            content="Settings"
            position="Top"
          >
            <button type='button' className='text-3xl p-3 hover:drop-shadow-xl text-white hover:bg-light-gray' style={{ background: 'blue', borderRadius: '50%' }} onClick={()=>{dispatch(setThemeSettings(true))}}>
              <FiSettings />
            </button>

          </TooltipComponent>

        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white dark:text-white transition-all duration-300">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:text-white dark:bg-secondary-dark-bg transition-all duration-300">
            <Sidebar />
          </div>
        )}
        <div className={
          activeMenu
            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen ml-72 w-full transition-all duration-300'
            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 transition-all duration-300'
        } >
          {activeMenu ? (
            <div style={{
              width: 'calc(100% - 18rem)',
            }} className="fixed static bg-main-bg dark:bg-main-dark-bg navbar w-full  dark:text-white ">
              <Navbar />

            </div>

          ) : (
            <div className="fixed static bg-main-bg dark:bg-main-dark-bg navbar w-full dark:text-white">
              <Navbar />

            </div>

          )}
          <div className="">
            <div className={`transition-all duration-300 ${!themeSettings ? 'hidden' : ''}`}>
              <ThemeSettings />
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard