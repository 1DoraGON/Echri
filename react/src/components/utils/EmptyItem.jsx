import React from 'react'

const EmptyItem = () => {
  return (
    <div className="animate-pulse max-w-sm bg-blue-100 shadow-lg rounded-lg overflow-hidden my-10 transition-all duration-700 ease-in-out w-full hover:scale-105">
      <div className="px-4 py-2">
        <h1 className="text-gray-900 font-bold text-xl lg:text-lg lg:leading-5 leading-5 lg:h-16 h-14 uppercase"></h1>
        <p className="text-gray-600 leading-3 h-12 text-sm mt-1"></p>
      </div>
      <div className="h-56 w-full bg-gray-700"></div>
      <div className="flex items-center justify-between h-12 px-4 py-2 bg-gray-900">
        <h1 className="text-gray-200 font-bold text-xl"></h1>
        <button className="px-3 py-1 w-28 h-6 bg-blue-100 hover:bg-white text-sm text-gray-900 font-semibold rounded"></button>
      </div>
    </div>
  )
}

export default EmptyItem