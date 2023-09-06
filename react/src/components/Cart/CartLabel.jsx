import React, { useEffect } from 'react'

const CartLabel = ({ value, label, dark }) => {
  useEffect(() => {
    console.log(value);
  }, [])
  return (
    <>
      <h3 className={`my-4 font-semibold text-gray-900 ${dark? 'dark:text-gray-200': ''}`}>{label}</h3>

      <div className={`block border text-lg text-black hover:border-blue-500 border-slate-400 w-full p-3 rounded mb-4 ${dark? 'dark:text-gray-200 dark:border-slate-400': ''}`}
      >
        {value}
      </div>
    </>
  )
}

export default CartLabel