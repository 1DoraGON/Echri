import React from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { FiSettings } from 'react-icons/fi'
import { setLicense } from '@syncfusion/ej2-react-base';

// Replace 'YOUR_SYNCFUSION_LICENSE_KEY' with your actual license key
const Dashboard = () => {
  setLicense('487137');
  return (
    <>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4 z-[1000]">
          <TooltipComponent content="Settings" position='Top'>
            <button>
              <FiSettings />
            </button>

          </TooltipComponent>
        </div>
      </div>
    </>
  )
}

export default Dashboard