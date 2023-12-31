import { useEffect, useState } from 'react'
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
import DeleteOrderModal from '../utils/DeleteOrderModal'
import ShowMessageModal from '../utils/ShowMessageModal'
import InfoAlretTopScreen from '../utils/InfoAlretTopScreen'
import Empty from '../utils/Empty'

const NewCart = () => {
  const wilayas = algerianStates
  const methods = paymentMethods
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hasMessage, setHasMessage] = useState(false)
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
  const infoMsg = infoMessage
  const successAlert = useSelector(selectSuccesAlert)
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [orderId, setOrderId] = useState(id ? id : null)
  const auth = useAuth()
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
          if (data.status !== 'pending') {
            //console.log('look at this '+data.status);
            //console.log(data.status=== 'pending');
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
            status: data.status,
            message: data.message,
            delivery_payment: data.delivery_payment,
            total_price: data.total_price,
            price_payed: data.price_payed
          }
          console.log('this is the form u looking for');
          console.log(form);
          if (form.message) {
            setHasMessage(true)
          }
          if (form.status === 'paid') {
            toast.success('Your have paid your order! it will be delivered soon!')

          }
          if (form.status === 'failed') {
            toast.error('The order payment has been failed! please try later!')
          }
          setFormData(form)
          console.log(form);
          setOrderProducts(data.products)
          setIsLoading(false)
          console.log(form);
        }).catch(error => {
          console.log(error);
          if (error.response.status === 404 || error.response.status === 403) {
            navigate('/notfound')
          }
          setIsLoading(false)
        })
      }
    }
    fetchOrderIfExists()
  }, [id])



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
          description: item.message
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
        navigate('/orders/' + response.data.data.id)
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

    } else if (formData.status === 'confirmed' && formData.payment_method !== 'POSTE') {
      const payload = {
        client: auth.user.firstname + ' ' + auth.user.lastname,
        client_email: auth.user.email,
        invoice_number: id,
        amount: formData.total_price,
        discount: 0,
        back_url: 'https://www.google.com',
        webhook_url: 'https://your-website.com/api/payment-webhook',
        mode: formData.payment_method,
        comment: 'Payment for Order #' + id

      }

      axiosClient.post('/api/proxy-to-chargily', payload).then(response => {
        console.log(response);

        window.location.replace(response.data.checkout_url);
      }).catch(err => {
        console.log(err);
      })
    }

    else {
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
      }
      console.log('this is the update payload');
      console.log(payload);
      await axiosClient.put('/api/orders/' + id, payload).then(response => {
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
      {isLoading ? (
        <div className="min-h-[80vh]">
          <LoadingScreen />
        </div>
      ) : (

        <div className="h-full min-h-screen bg-gray-100 pt-20">
          {formData.message !== '' && hasMessage && (
            <InfoAlretTopScreen text1={'You have a '} linkText={'message'} text2={' from the store considering your order.'} handleLinkClick={toggleModal} toggleAlert={() => { setHasMessage(false) }} />
          )}

          {infoAlert && (
            <InfoAlert title={'How it works?'} message={infoMsg} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setInfoAlert(false)) }} button={false} />
          )}
          {successAlert && (
            <SuccessAlert title={'Your order is penidng!'} message={successMsg + "Your order id is " + orderId} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setSuccessAlert(false)) }} button={false} />
          )}
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          {!id && cartItems.length === 0 ? (
            <Empty text={'Your cart is empty now, you can start shopping from '} linkText={'here!'} linkClick={() => { navigate('/products') }} />
          ) : (

            <div className="mx-auto max-w-[92rem] justify-center px-6 flex space-x-6 xl:px-0 md:flex-col md:justify-between md:items-center">
              <div className="rounded-lg w-2/3 md:w-full">
                {id ?

                  orderProducts.map((item, i) => (
                    <OrderItem key={i} item={item} />
                  ))
                  : cartItems.length > 0 ?
                    cartItems.map((item, i) => (
                      <NewCartItem key={i} item={item} />
                    )) : (
                      <Empty text={'Your cart is empty now, you can start shopping from '} linkText={'here!'} linkClick={() => { navigate('/products') }} />
                    )
                }

              </div>


              <div className="md:mt-6 md:w-full h-full rounded-lg border bg-white p-6 shadow-md mt-0 w-1/2 mx-5">
                {id && (
                  <>
                    {enableEdit && (
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
                        <ConfirmationModal isModalOpen={isModalOpen} toggleModal={toggleModal}
                          component={<DeleteOrderModal text={'Are you sure you want to cancel this order?'} confirmation={'Yes, I\'m sure'} cancel={'No, Keep it'} toggleModal={toggleModal} handleClick={() => { handleDeleteOrder(id) }} />} />
                      </>
                    )}
                    {formData.message && (
                      <ConfirmationModal isModalOpen={isModalOpen} toggleModal={toggleModal} component={<ShowMessageModal title={'You have a message from the store'} message={formData.message} cancelation={'Dismiss'} toggleModal={toggleModal} />} />
                    )}
                  </>
                )}





                {id && (
                  <>
                    <div className="mb-2 flex justify-between">
                      <p className="text-gray-700">Order ID</p>
                      <p className="text-gray-700 font-bold">{formData.id}</p>
                    </div>
                    <div className="mb-2 flex justify-between">
                      <p className="text-gray-700 ">Order Status:</p>
                      <div className=" capitalize" onClick={() => { formData.message !== '' ? toggleModal() : null }}>
                        <span className={formData.status === 'pending' ? 'text-yellow-600 flex items-center justify-between cursor-pointer hover:text-yellow-700' : formData.status === 'confirmed' ? 'text-blue-600 flex items-center justify-between cursor-pointer hover:text-blue-700' : formData.status === 'paid' ? 'text-green-600 flex items-center justify-between cursor-pointer hover:text-green-700' : formData.status === 'canceled' ? 'text-red-600 flex items-center justify-between cursor-pointer hover:text-red-700' : 'text-orange-600 flex items-center justify-between cursor-pointer hover:text-orange-700'}>
                          <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                          </svg>
                          {formData.status} {formData.status === 'failed' ? '(Checkout process failed. Try again)' : formData.message ? ' (You have a message)' : ''}
                        </span>


                      </div>
                    </div>
                  </>
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
                  {id && !enableEdit ? (
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
                      {formData.status === 'confirmed' && formData.payment_method === "POSTE" && (
                        <>

                          <label className="my-4 font-semibold text-gray-900 mb-3" htmlFor="file_input">Upload Payment Recipe</label>
                          <input className=" mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " id="file_input" type="file" />

                        </>
                      )}
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
                {formData.status !== 'paid' && (

                  <button onClick={(e) => { handleCheckout(e) }} className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isButtonDisabled}>{id && enableEdit ? 'Update yout order' : id && formData.status === 'confirmed' || formData.status === 'failed' ? 'Checkout' : 'Send your order'}</button>
                )}

              </div>
            </div >
          )}
        </div >
      )}
    </>
  )
}

export default NewCart
