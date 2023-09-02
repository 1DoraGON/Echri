import React, { useEffect } from 'react'

const CartLabel = ({ value, label }) => {
  useEffect(() => {
    console.log(value);
  }, [])
  return (
    <>
      <h3 className="my-4 font-semibold text-gray-900">{label}</h3>

      <div className="block border text-lg text-black hover:border-blue-500 border-slate-400 w-full p-3 rounded mb-4"
      >
        {value}
      </div>
    </>
  )
}

export default CartLabel