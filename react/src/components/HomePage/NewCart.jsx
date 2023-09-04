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
import { selectInfoAlert, selectModalIsOpen, selectSuccesAlert, setInfoAlert, setModalIsOpen, setSuccessAlert } from '../../app/ThemeSlice'
import SuccessAlert from '../utils/SuccessAlert'
import useAuth from '../../hooks/useAuth'
import CartLabel from '../Cart/CartLabel'
import { useNavigate, useParams } from 'react-router-dom'
import OrderItem from '../Cart/OrderItem'
import ConfirmationModal from '../utils/ConfirmationModal'
import LoadingScreen from '../utils/LoadingScreen'

const NewCart = () => {
  const wilayas = algerianStates
  const methods = paymentMethods
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams();
  const isModalOpen = useSelector(selectModalIsOpen)
  const toggleModal = () => {
    console.log('hi there');
    dispatch(setModalIsOpen(!isModalOpen))
  }

  const [isLoading, setIsLoading] = useState(true)


  const [errors, setErrors] = useState(null)
  const cartItems = useSelector(selectCartItems)
  const infoAlert = useSelector(selectInfoAlert)
  const successAlert = useSelector(selectSuccesAlert)
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [orderId, setOrderId] = useState(id? id : null)
  const auth = useAuth()
  const infoMsg = infoMessage
  const successMsg = successMessage
  const [enableEdit, setEnableEdit] = useState(true)
  const [orderProducts, setOrderProducts] = useState([])

  const total = useSelector(selectCartTotalAmount)
  const [formData, setFormData] = useState({})


  useEffect(() => {
    console.log(id);
    dispatch(setFilterPage(true))
    dispatch(setInfoAlert(true))
    const fetchOrderIfExists = async () => {
      if (!id) {
        setFormData({
          firstname: '',
          lastname: '',
          number: '',
          full_address: '',
          wilaya: '',
          payment_method: '',
          home_delivery: null,
          delivery_payment: null,
        })
        setIsLoading(false)
        dispatch(checkProducts(cartItems))
        dispatch(setTotals())
      } else {
        dispatch(setSuccessAlert(true))
        await axiosClient.get('/api/orders/' + id).then(response => {
          const data = response.data.data
          console.log(data);
          if (JSON.stringify(data.status)!=='pending' ) {
            setEnableEdit(false)
          }
          const form = {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            number: data.phone_number,
            full_address: data.address.full_address,
            wilaya: JSON.parse(data.address.wilaya),
            payment_method: data.payment_method,
            home_delivery: data.home_delivery,
            delivery_payment: data.delivery_payment,
            total_price: data.total_price,
            price_payed: data.price_payed
          }
          setFormData(form)
          console.log(form);
          setOrderProducts(data.products)
          setIsLoading(false)
          console.log(form);
        }).catch(error => {
          console.log(error);
          setIsLoading(false)
        })
      }
    }
    fetchOrderIfExists()
  }, [])



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleCheckout = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (!id) {
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
        status: 'pending',
        firstname: formData.firstname,
        lastname: formData.lastname,
        payment_method: formData.payment_method,
        phone_number: formData.number,
        wilaya: formData.wilaya,
        full_address: formData.full_address,
        price_payed: formData.delivery_payment === "true" ? 400 : total,
        home_delivery: JSON.parse(formData.home_delivery),
        products: products,
      }
      await axiosClient.post('/api/orders', payload).then(response => {
        console.log(response);
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
        console.log(error);
        setButtonDisabled(false);
        if (error.response?.status == 422) {
          setErrors(error.response?.data.errors)
  
        }
      })
      
    } else {
      const payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        payment_method: formData.payment_method,
        phone_number: formData.number,
        wilaya: formData.wilaya,
        full_address: formData.full_address,
        price_payed: formData.delivery_payment === "true" ? 400 : total,
        home_delivery: JSON.parse(formData.home_delivery),
        total_price: formData.total_price,
        status: 'pending',
        //status: 'pending',
      }
      await axiosClient.put('/api/orders/'+id, payload).then(response => {
        console.log(response);
        toast.success('Your order has been Updated successfully!')
        dispatch(setSuccessAlert(true))
        //toast('Hello, this is a toast message!',);
        setErrors(null)
        //setOrderId(response.data.data.id)
        setTimeout(() => {
          setButtonDisabled(false);
        }, 4000);
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scrolling animation
        });
      }).catch(error => {
        console.log(error);
        setButtonDisabled(false);
        if (error.response?.status == 422) {
          setErrors(error.response?.data.errors)
  
        }
      })
    }
  }

  const handleDeleteOrder = async (id) => {
    await axiosClient.delete('/api/orders/' + id).then(response => {
      console.log(response);
      toast.success('Your order has been deleted!')
      toggleModal()
      navigate('/orders')

    })
  }

  //+ 

  return (
    <>
      {isLoading && (
        <LoadingScreen />
      )}
      <div className="h-full min-h-screen bg-gray-100 pt-20">
        {infoAlert && (
          <InfoAlert title={'How it works?'} message={infoMsg} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setInfoAlert(false)) }} button={false} />
        )}
        {successAlert && (
          <SuccessAlert title={'Your order is penidng!'} message={successMsg + "Your order id is " + orderId} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setSuccessAlert(false)) }} button={false} />
        )}
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

        <div className="mx-auto max-w-[92rem] justify-center px-6 flex space-x-6 xl:px-0 md:flex-col md:justify-between md:items-center">
          <div className="rounded-lg w-2/3 md:w-full">
            {id ?

              orderProducts.map((item, i) => (
                <OrderItem key={i} item={item} />
              ))
              :
              cartItems.map((item, i) => (
                <NewCartItem key={i} item={item} />
              ))
            }

          </div>


          <div className="md:mt-6 md:w-full h-full rounded-lg border bg-white p-6 shadow-md mt-0 w-1/2 mx-5">
            {id && (
              <>
                <div className="mb-2 w-full flex justify-end">
                  <div className="self-end">

                    <button
                      id="deleteButton"
                      onClick={toggleModal}
                      type="button"
                      className="text-red-500 hover:text-red-600 rounded-md flex items-center space-x-1 focus:outline-none focus:ring focus:ring-red-200"
                    >
                      <span className='text-xl mr-1'>&times;</span>
                      Cancel Order
                    </button>
                  </div>
                </div>

                <ConfirmationModal id={'deleteOrder'} text={'Are you sure you want to cancel this order?'} confirmation={'Yes, I\'m sure'} cancel={'No, Keep it'} isModalOpen={isModalOpen} toggleModal={toggleModal} handleClick={() => { handleDeleteOrder(id) }} />
              </>
            )}





            {id && (
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Order ID</p>
                <p className="text-gray-700 font-bold">{formData.id}</p>
              </div>
            )}

            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{id ? formData.total_price : total} DZD</p>
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
              {id && enableEdit ? (
                <>
                  <CartLabel value={formData.firstname} label={'Firstname'} />
                  <CartLabel value={formData.lastname} label={'Lastname'} />
                  <CartLabel value={formData.number} label={'Phone Number'} />
                  {formData.wilaya && (
                    <CartLabel value={formData.id + ' - ' + wilayas.find(wilaya => wilaya.id == formData.wilaya).name} label={'Wilaya'} />
                  )}
                  <CartLabel value={formData.full_address} label={'Full Address'} />
                  <CartLabel value={formData.payment_method} label={'Payment Method'} />
                  <CartLabel value={formData.home_delivery ? 'Home Delivery' : 'Yalidine Center'} label={'Delivery Type'} />
                  <CartLabel value={formData.price_payed + ' DZD'} label={'Price Payed'} />
                </>
              ) : (
                <>
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
                </>
              )}

            </div>

            <button onClick={(e) => { handleCheckout(e) }} className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isButtonDisabled}>{id? 'Update yout order' : 'Send your order'}</button>

          </div>
        </div>
      </div>
    </>
  )
}

export default NewCart
