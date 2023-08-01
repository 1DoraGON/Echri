import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi'
import { Outlet } from 'react-router-dom';
import '../../App.css'

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce } from './pages';
import { useSelector } from 'react-redux';
import { selectActiveMenu } from '../../app/ThemeSlice';

const Dashboard = () => {
  const activeMenu = useSelector(selectActiveMenu);
  return (
    <>

      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4 z-[1000]">
          <TooltipComponent
            content="Settings"
            position="Top"
          >
            <button type='button' className='text-3xl p-3 hover:drop-shadow-xl text-white hover:bg-light-gray' style={{ background: 'blue', borderRadius: '50%' }}>
              <FiSettings />
            </button>

          </TooltipComponent>

        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white dark:text-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:text-white dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div className={
          activeMenu
            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen ml-72 w-full  '
            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
        } >
          {activeMenu ? (
            <div style={{
              width: 'calc(100% - 18rem)',
            }} className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full dark:text-white">
              <Navbar />

            </div>

          ) : (
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full dark:text-white">
              <Navbar />

            </div>

          )}
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard