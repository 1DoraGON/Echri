import React from 'react'

const CartInput = ({type,name,placeholder,value,handleChange}) => {
  return (
    <input
      required
      type={type}
      className=" border hover:border-blue-500 border-slate-400 block w-full p-3 rounded mb-4"
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder} />
  )
}

export default CartInput