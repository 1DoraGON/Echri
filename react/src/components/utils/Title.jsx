import React from 'react'

const Title = ({ title }) => {
  return (
    <>
      <h1 className='text-5xl lg:text-5xl md:text-3xl font-bold text-slate-900 filter drop-shadow-lg'>{title}</h1>
    </>
  )
}

export default Title