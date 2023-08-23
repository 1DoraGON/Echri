import React, { useEffect, useState } from 'react'
import NewCartItem from '../Cart/NewCartItem'
import { useDispatch, useSelector } from 'react-redux'
import { checkProducts, selectCartItems, selectCartTotalAmount, setTotals } from '../../app/CartSlice'
import CartInput from '../Cart/CartInput'
import { algerianStates, paymentMethods } from '../utils/constants'

const NewCart = () => {
  const wilayas = algerianStates
  const methods = paymentMethods
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTotals())

  }, [])
  const cartItems = useSelector(selectCartItems)
  useEffect(() => {
    //console.log(cartItems);
    dispatch(checkProducts(cartItems))
  }, [])
  const total = useSelector(selectCartTotalAmount)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    number: '',
    full_address: '',
    wilaya: '',
    payment_method: ''
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (


    <>
      <div className="h-full min-h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-[92rem] justify-center px-6 flex space-x-6 xl:px-0 md:flex-col md:justify-between md:items-center">
          <div className="rounded-lg w-2/3 md:w-full">
            {cartItems.map((item, i) => (
              <NewCartItem key={i} item={item} />
            ))}

          </div>

          <div className="md:mt-6 md:w-full h-full rounded-lg border bg-white p-6 shadow-md mt-0 w-1/2 mx-5">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$129.99</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{total} DZD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <div className="flex-row justify-between my-5">
              <CartInput type={'text'} name={'firstname'} placeholder={'Firstname'} value={formData.firstname} handleChange={handleInputChange} />
              <CartInput type={'text'} name={'lastname'} placeholder={'Lastname'} value={formData.lastname} handleChange={handleInputChange} />
              <CartInput type={'number'} name={'number'} placeholder={'Number'} value={formData.number} handleChange={handleInputChange} />
              <select onChange={handleInputChange} className='block border hover:border-blue-500 border-slate-400 w-full rounded p-3  mb-4' name='wilaya' value={formData.wilaya} >
                {formData.wilaya === '' && (<option selected>Select Your Wilaya</option>)}
                {wilayas.map((wilaya, i) => (
                  <option key={i} value={wilaya.id}>{wilaya.id + ' - ' + wilaya.name}</option>
                ))}
              </select>
              <CartInput type={'text'} name={'full_address'} placeholder={'Full Address'} value={formData.full_address} handleChange={handleInputChange} />


              <select onChange={handleInputChange} className='block border hover:border-blue-500 border-slate-400 w-full rounded p-3  mb-4' name='payment_method' value={formData.payment_method} >
                {formData.payment_method === '' && (<option selected>Select Your Payment Method</option>)}
                {methods.map((method, i) => (
                  <option key={i} value={method.id}>{method.name}</option>
                ))}
              </select>
              {formData.payment_method === 'POSTE' && (
                <>
                <button className='text-blue-500 font-semibold border border-b-blue-500 hover:text-blue-600' type='button'>Please print this to pay your order!</button>
                </>
              )}
            </div>

            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default NewCart
/* 
<div className="h-screen bg-gray-100 pt-20">
<h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
<div className="mx-auto max-w-5xl justify-center px-6 flex md:flex space-x-6 md:space-x-6 px-0">
  <div className="rounded-lg w-2/3">
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md flex justify-start">
      <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="sm:w-full rounded-lg w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
          <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">259.000 ₭</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md flex">
      <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" className="sm:w-full rounded-lg w-40" />
      <div className="ml-4 flex w-full justify-between">
        <div className=" mt-0">
          <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
          <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
        </div>
        <div className=" justify-between space-y-6 mt-0 block space-x-6">
          <div className="flex items-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">259.000 ₭</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div className=" h-full rounded-lg border bg-white p-6 shadow-md mt-0 w-1/3">
    <div className="mb-2 flex justify-between">
      <p className="text-gray-700">Subtotal</p>
      <p className="text-gray-700">$129.99</p>
    </div>
    <div className="flex justify-between">
      <p className="text-gray-700">Shipping</p>
      <p className="text-gray-700">$4.99</p>
    </div>
    <hr className="my-4" />
    <div className="flex justify-between">
      <p className="text-lg font-bold">Total</p>
      <div className="">
        <p className="mb-1 text-lg font-bold">$134.98 USD</p>
        <p className="text-sm text-gray-700">including VAT</p>
      </div>
    </div>
    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
  </div>
</div>

</div> */