import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setDecreaseQTY, setDescription, setIncreaseQTY, setQTY, setRemoveItemFromCart } from '../../app/CartSlice'

const NewCartItem = ({ item: { id, name, tags, main_image, price, cartQuantity } }) => {
  const QTYRef = useRef()
  const descriptionRef = useRef()
  const dispatch = useDispatch()
  const onRemoveItem = () => {
    dispatch(setRemoveItemFromCart({
      id, name
    }))
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
  const handleChangeQTY = () => {
    const QTY = QTYRef.current.value
    if (QTY) {
      dispatch(setQTY({
        id, name, QTY
      }))

    }
  }
  const handleChangeDescription = () => {
    const description = descriptionRef.current.value
    if (description) {
      dispatch(setDescription({
        id, name, description
      }))

    }
  }
  const STORAGE_URL = 'http://127.0.0.1:8000/storage/'
  return (
    <div className="sm:justify-between md:flex-col mb-6 rounded-lg bg-white p-6 shadow-md flex justify-start">
      <img src={STORAGE_URL + main_image} alt={`img/cart-item/${id}`} className="bg-slate-200 md:w-full h-28 self-center md:h-auto rounded-lg w-40" />
      <div className="ml-4 flex w-full justify-between sm:ml-0 sm:flex-none sm:w-auto">
        <div className="sm:mt-5 mt-0 w-[60%]">
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>
          <div className="flex justify-start items-start w-full flex-wrap">
            {tags?.split('||').map((tag, index) => (
              <div key={index} className="bg-blue-200 p-1 m-1 rounded-lg flex items-center">
                <span className="text-xs">{tag}</span>
              </div>
            ))}
          </div>

          <textarea onChange={handleChangeDescription} ref={descriptionRef} rows="2" style={{ resize: 'none' }} id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Describe your order, (size, color ...)"></textarea>
        </div>
        <div className="mt-4 sm:flex sm:justify-between sm:space-x-0 sm:space-y-0 space-y-6 sm:mt-0 block space-x-6">
          <div className="flex items-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={onDecreaseQTY}> - </span>
            <input ref={QTYRef} onChange={handleChangeQTY} className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={cartQuantity} min="1" />
            <span onClick={onIncreaseQTY} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm font-semibold">{price * cartQuantity} DZD</p>
            <button type='button' onClick={onRemoveItem}>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCartItem