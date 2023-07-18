import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartTotalAmount, setTotals } from '../../app/CartSlice'

const CartItems = ({cartItems}) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setTotals())
    
  },[])
  const totalAmount = useSelector(selectCartTotalAmount)
  return (
    <>
      <div className=''>
        <div className="flex items-center justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[80vh] scroll-smooth scroll-hidden pt-8 pb-11">
          {cartItems?.map((item,i)=>(
            <CartItem key={i} item={item} />
          ))}
        </div>

        <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center ">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold uppercase">SubTotal</h1>
            <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">${totalAmount}</h1>
          </div>
          <div className="grid items-center gap-2">
            <p className="text-sm font-medium text-center">Taxes and Shipping Will Calculate At Shipping</p>
            <button type="button" className="button-theme bg-theme-cart text-white">Check Out</button>
          </div>
        </div>


      </div>
    </>

  )
}

export default CartItems