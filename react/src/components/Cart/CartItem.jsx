import React from 'react'
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from 'react-redux';
import { setDecreaseQTY, setIncreaseQTY, setRemoveItemFromCart } from '../../app/CartSlice';
import { truncate } from 'lodash';
import { toast } from 'react-hot-toast';

const CartItem = ({ item: { id, name, description, main_image, price, cartQuantity } }) => {
  const dispatch = useDispatch()
  const onRemoveItem = () => {
    dispatch(setRemoveItemFromCart({
      id, name
    }))
    toast.success(`${name} removed from Cart`)

  }
  const onIncreaseQTY = () => {
    dispatch(setIncreaseQTY({
      id, name, cartQuantity
    }))
  }
  const onDecreaseQTY = () => {
    dispatch(setDecreaseQTY({
      id, name, cartQuantity
    }))
  }
  const STORAGE_URL = import.meta.env.VITE_REACT_APP_STORAGE_URL;

  return (
    <>
      <div className="flex items-center justify-between w-full px-5">
        <div className="flex items-center gap-5">
          <div className={`bg-blue-100 shadow-lg relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center`}>
            <img src={STORAGE_URL + main_image} alt={`img/cart-item/${id}`} className='w-36 h-20 object-fill lg:w-28' />
            <div className='absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded'>
              {price} DZD
            </div>

          </div>
          <div className="grid items-center gap-4 ">
            <div className="grid items-center leading-none ">
              <h1 className="font-medium text-lg text-slate-900 lg:text-sm">{truncate(name, { length: 30 })}</h1>
              <p className="text-sm text-slate-800 lg:text-xs">{description} </p>
            </div>
            <div className="flex items-center justify-around w-[8rem]">
              <button type="button" onClick={onDecreaseQTY} className='bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90'>
                <MinusIcon className='w-5 h-5 lg:w-4 lg:h-5 text-white stroke-[2]' />
              </button>
              <div className="bg-theme-cart rounded text-white font-medium lg:text-xm w-7 h-6 lg:h-5 lg:w-6 flex items-center justify-center ">{cartQuantity}</div>
              <button type="button" onClick={onIncreaseQTY} className='bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90'>
                <PlusIcon className='w-5 h-5 lg:w-4 lg:h-5 text-white stroke-[2]' />
              </button>
            </div>
          </div>
        </div>
        <div className="grid items-center gap-5">
          <div className="grid items-center justify-end">
            <h1 className="text-sm font-semibold text-slate-600 lg:text-base">{price * cartQuantity} DZD</h1>
          </div>
          <div className="grid items-center justify-end">
            <button type="button" onClick={onRemoveItem} className='bg-theme-cart rounded p-1 lg:p-0.5 grid items-center justify-items-center'>
              <TrashIcon className='w-5 h-5 text-white' />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem