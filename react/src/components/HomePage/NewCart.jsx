import React, { useEffect, useState } from 'react'
import NewCartItem from '../Cart/NewCartItem'
import { useDispatch, useSelector } from 'react-redux'
import { checkProducts, selectCartItems, selectCartTotalAmount, setTotals } from '../../app/CartSlice'
import CartInput from '../Cart/CartInput'
import { algerianStates, infoMessage, paymentMethods, successMessage } from '../utils/constants'
import paymentImage from '../../data/payment_image.jpg'
import axiosClient from '../../api/axios'
import { setFilterPage } from '../../app/ProductsSlice'

import { toast } from 'react-hot-toast';
import InfoAlert from '../utils/InfoAlert'
import { selectInfoAlert, selectSuccesAlert, setInfoAlert, setSuccessAlert } from '../../app/ThemeSlice'
import SuccessAlert from '../utils/SuccessAlert'
import useAuth from '../../hooks/useAuth'

const NewCart = () => {
  const wilayas = algerianStates
  const methods = paymentMethods
  const dispatch = useDispatch()
  const [errors, setErrors] = useState(null)
  const cartItems = useSelector(selectCartItems)
  const infoAlert = useSelector(selectInfoAlert)
  const successAlert = useSelector(selectSuccesAlert)
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [orderId,setOrderId] = useState(null)
  const auth = useAuth()
  const infoMsg = infoMessage
  const successMsg = successMessage
  useEffect(() => {
    dispatch(setFilterPage(true))
    dispatch(setTotals())
    dispatch(setInfoAlert(true))
    dispatch(checkProducts(cartItems))
  }, [])



  const total = useSelector(selectCartTotalAmount)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    number: '',
    full_address: '',
    wilaya: '',
    payment_method: '',
    home_delivery: null,
    delivery_payment: null,
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleCheckout = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    console.log(formData);
    const products = cartItems.map((item) => {
      const newItem = {
        id: item.id,
        quantity: item.cartQuantity,
        description: item.description
      }
      return newItem
    })
    const payload = {
      user_id: auth?.user?.id,
      total_price: total,
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone_number: formData.number,
      wilaya: formData.wilaya,
      full_address: formData.full_address,
      price_payed: formData.delivery_payment === "true" ? 400 : total,
      home_delivery: JSON.parse(formData.home_delivery),
      status: 'pending',
      products: products,
    }
    await axiosClient.post('/api/orders', payload).then(response => {
      console.log(response);
      axiosClient.get('/api/orders/'+response.data.data.id).then(response=>{
        console.log(response);
      })
      toast.success('Your order has been sent successfully it\'s pending now!')
      dispatch(setSuccessAlert(true))
      //toast('Hello, this is a toast message!',);
      setErrors(null)
      setOrderId(response.data.data.id)
      setTimeout(() => {
        setButtonDisabled(false);
      }, 4000);
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling animation
      });
    }).catch(error => {
      //console.log(error);
      setButtonDisabled(false);
      if (error.response?.status == 422) {
        setErrors(error.response?.data.errors)

      }
    })
  }
  return (


    <>

      <div className="h-full min-h-screen bg-gray-100 pt-20">
        {infoAlert && (
          <InfoAlert title={'How it works?'} message={infoMsg} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setInfoAlert(false)) }} button={false} />
        )}
        {successAlert && (
          <SuccessAlert title={'Your order is penidng!'} message={successMsg+"Your order id is "+orderId} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setSuccessAlert(false)) }} button={false} />
        )}
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
            <div className="">

              {errors &&
                <ul className='alert'>
                  {Object.keys(errors).map(key => (
                    <li key={key}>{errors[key][0]}</li>
                  ))}
                  <p key={errors}></p>
                </ul>}
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
                <a href={paymentImage} download="payment_image.jpg">

                  <button className='text-blue-500 font-semibold border border-b-blue-500 hover:text-blue-600' type='button'>Please print this to pay your order!</button>
                </a>)}

              <h3 className="my-4 font-semibold text-gray-900">Select Delivery Type</h3>
              <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                <li className="w-full border-b border-gray-200 rounded-t-lg">
                  <div className="flex items-center pl-3">
                    <input onChange={handleInputChange} id="list-radio-delivery-type-1" type="radio" value={true} name="home_delivery" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="list-radio-delivery-type-1" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Home Delivery </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg">
                  <div className="flex items-center pl-3">
                    <input onChange={handleInputChange} id="list-radio-delivery-type-2" type="radio" value={false} name="home_delivery" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="list-radio-delivery-type-2" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Yalidine center</label>
                  </div>
                </li>
              </ul>
              <h3 className="my-4 font-semibold text-gray-900">Select When To pay</h3>
              <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                <li className="w-full border-b border-gray-200 rounded-t-lg">
                  <div className="flex items-center pl-3">
                    <input onChange={handleInputChange} id="list-radio-delivery-payment-1" type="radio" value={true} name="delivery_payment" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="list-radio-delivery-payment-1" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Pay only delivery taxes (pay your order when received) </label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 rounded-t-lg">
                  <div className="flex items-center pl-3">
                    <input onChange={handleInputChange} id="list-radio-delivery-payment-2" type="radio" value={false} name="delivery_payment" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                    <label htmlFor="list-radio-delivery-payment-2" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">Pay everything (order and delivery)</label>
                  </div>
                </li>
              </ul>
            </div>

            <button onClick={(e) => { handleCheckout(e) }} className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isButtonDisabled}>Send your order</button>

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