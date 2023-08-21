import React from 'react'

const EmptyCategory = () => {
  return (
    <div className="animate-pulse h-full bg-gray-200 relative grid items-center gap-4 pb-2 rounded-lg shadow shadow-slate-200 ring-1 ring-slate-200">
      <div className="flex items-center justify-center">
        <div className='w-full h-48 bg-slate-100 shadow-md shadow-slate-200 rounded-tl-lg rounded-tr-lg'>

        </div>
      </div>
      <div className="flex items-center justify-between w-full px-4">
        {/*                     <div className="flex-items-center gap-0.5">
        <HeartIcon className='icon-style text-red-500 w-5 h-5' /> <span className='text-xs font-bold'>{val.like}</span>
      </div>
      <div className="flex-items-center gap-0.5">
        <ClockIcon className='icon-style w-4 h-4 text-black ' /> <span className='text-xs font-bold'>{val.time}</span>
      </div>
      <div className="flex-items-center gap-0.5">
        <HashtagIcon className='icon-style text-blue-600' /> <span className='text-xs font-bold text-blue-600'>{val.by}</span>
      </div> */}

      </div>
      <div className="grid items-center justify-items-start px-4">
        <h1 className='text-base font-semibold lg:text-sm'></h1>
        <p className='text-sm text-justify lg:text-xs h-28 lg:h-24'></p>
      </div>
      <div className="flex items-center justify-center px-4 w-full">
        <button type='button'className='w-full h-8 bg-slate-900 bg-gradient-to-b from-slate-800 to-black shadow-md shadow-black text-center text-slate-100 py-1.5 button-theme'></button>
      </div>
    </div>
  )
}

export default EmptyCategory