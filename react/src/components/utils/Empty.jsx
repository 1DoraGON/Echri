import React from 'react'

const Empty = ({text,linkClick,linkText}) => {
  return (
    <div className='flex items-center justify-center mt-10'>
      <div className="text-4xl text-slate-700 font-semibold text-center">
        <span>{text}</span>
        <button className='border-b-2 border-slate-700 hover:text-slate-600 hover:border-slate-600' type='button' onClick={linkClick}>{linkText}</button>
      </div>

    </div>
  )
}

export default Empty