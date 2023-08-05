import React from 'react'
//import { IoIosMore } from 'react-icons/io'; 
import { CurrencyDollarIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../../../data/dummy';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
const Ecommerce = () => {
  return (
    <div className='mt-12'>
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-80 py-8 px-10 pt-9 m-3">
          <div className="flex justify-between items-center">
            <div className="">
              <p className='font-bold text-gray-400'>Earnings</p>
              <p className='text-2xl'>$63,454.55</p>
            </div>
          </div>
          <div className="mt-6">
            <Button color="white" bgColor="blue" text="Download" borderRadius="10px" size="md" />
            {/* <CurrencyDollarIcon className='w-6 h-6' /> */}
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="dark:text-gray-200 bg-white dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl w-780">
          <div className="flex justify-between">
            <p className='font-semibold text-xl'>Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:shadow-xl">
                <div className="rounded-full bg-gray-600 w-3 h-3"></div>
                <span className="">Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:shadow-xl">
                <div className="rounded-full bg-green-400  w-3 h-3"></div>
                <span className="">Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="border-r-1 border-color m-4 pr-10">
              <div className="">
                <p className="">
                  <span className="text-3xl font-semibold">$55,750.20</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">14%</span>
                </p>
                <p className="text-gray-500 mt-1">
                  Budget
                </p>
              </div>
              <div className="mt-8">
                <p className="">
                  <span className="text-3xl font-semibold">$42,350.20</span>
                </p>
                <p className="text-gray-500 mt-1">
                  Expense
                </p>
              </div>
              <div className="mt-5">
                <SparkLine currentColor="blue" id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color="blue" />
              </div>
              <div className="mt-10 ">
                <Button color="white" bgColor="blue" text="Download Report" borderRadius="10px" />
              </div>
            </div>
            <div className="">
              <Stacked width="320px" height="360px" />
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Ecommerce