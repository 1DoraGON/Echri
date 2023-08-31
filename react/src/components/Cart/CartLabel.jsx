import React, { useEffect } from 'react'

const CartLabel = ({value}) => {
  useEffect(()=>{
    console.log(value);
  },[])
  return (
    <div className="block border text-lg text-black hover:border-blue-500 border-slate-400 w-full p-3 rounded mb-4"
    >
      {value}
    </div>
  )
}

export default CartLabel