import { useEffect, useRef, useState } from 'react'
import LoadingScreen from '../../utils/LoadingScreen';
import OrderItem from '../../Cart/OrderItem';
import ConfirmationModal from '../../utils/ConfirmationModal';
import CartLabel from '../../Cart/CartLabel';
import { algerianStates } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalIsOpen, setModalIsOpen } from '../../../app/ThemeSlice';
import { toast } from 'react-hot-toast';
import axiosClient from '../../../api/axios';
import { useParams } from 'react-router-dom';
import MessageModal from '../../utils/MessageModal';

const Order = () => {
  const text = 'Confirm the order means you should ship it to the specified address, and you can leace a message to the client here, leave it empty if you don\'t want to say anything.'
  const [isLoading, setIsLoading] = useState(true)
  const messageRef = useRef()
  const wilayas = algerianStates
  const [orderProducts, setOrderProducts] = useState([])
  const dispatch = useDispatch()
  const isModalOpen = useSelector(selectModalIsOpen)
  const [formData, setFormData] = useState({})
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const {id} = useParams()
  const toggleModal = () => {
    console.log('hi there');
    dispatch(setModalIsOpen(!isModalOpen))
  }

  const [errors, setErrors] = useState(null)
  useEffect(()=>{
    const fetchOrder = async () =>{
      await axiosClient.get('/api/orders/' + id).then(response => {
        const data = response.data.data
        console.log(data);
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
    fetchOrder()
  },[])
  const handleSave = ()=>{

  }

  const handleDeleteOrder = async (id) => {
    await axiosClient.delete('/api/orders/' + id).then(response => {
      console.log(response);
      toast.success('Your order has been deleted!')
      toggleModal()
      //navigate('/orders')

    })
  }

  return (
    <>
    {isLoading && (
      <LoadingScreen />
    )}
    <div className="h-full min-h-screen bg-gray-100 dark:bg-main-dark-bg pt-20 mb-10">
{/*       {infoAlert && (
        <InfoAlert title={'How it works?'} message={infoMsg} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setInfoAlert(false)) }} button={false} />
      )}
      {successAlert && (
        <SuccessAlert title={'Your order is penidng!'} message={successMsg + "Your order id is " + orderId} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setSuccessAlert(false)) }} button={false} />
      )} */}
      <h1 className="mb-10 text-center text-2xl font-bold dark:text-gray-200">Order Items</h1>

      <div className="mx-auto max-w-[92rem] justify-center px-6 flex space-x-6 xl:px-0 md:flex-col md:justify-between md:items-center">
        <div className="rounded-lg w-2/3 md:w-full">
          {orderProducts.map((item, i) => (
              <OrderItem key={i} item={item} dark={true} />
            ))
          }

        </div>


        <div className="md:mt-6 md:w-full h-full rounded-lg border bg-white dark:border-none dark:bg-secondary-dark-bg p-6 shadow-md mt-0 w-1/2 mx-5">
          
              <div className="mb-2 w-full flex justify-end">
                <div className="self-end">

                  <button
                    id="deleteButton"
                    onClick={toggleModal}
                    type="button"
                    className="text-red-500 hover:text-red-600 rounded-md flex items-center space-x-1 focus:outline-none"
                  >
                    <span className='text-xl mr-1'>&times;</span>
                    Cancel Order
                  </button>
                </div>
              </div>

              <ConfirmationModal id={'deleteOrder'} text={''} confirmation={'Yes, I\'m sure'} cancel={'No, Keep it'} isModalOpen={isModalOpen} toggleModal={toggleModal} handleClick={() => { handleDeleteOrder(formData.id) }} component={<MessageModal text={text} confirmation={'Confirm Order'} placeholder={'Write your message here.'} reference={messageRef} handleClick={()=>{}} handleClose={toggleModal} />} />

          
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700 dark:text-gray-200">Order ID</p>
              <p className="text-gray-700 dark:text-gray-200 font-bold">{formData.id}</p>
            </div>
        

          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold dark:text-gray-200">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold dark:text-gray-200">{formData.total_price+ ' DZD'} </p>
              <p className="text-sm text-gray-700 dark:text-gray-200">including VAT</p>
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

              
                <CartLabel value={formData.firstname} label={'Firstname'} dark={true} />
                <CartLabel value={formData.lastname} label={'Lastname'} dark={true} />
                <CartLabel value={formData.number} label={'Phone Number'} dark={true} />
                {formData.wilaya && (
                  <CartLabel value={formData.id + ' - ' + wilayas.find(wilaya => wilaya.id == formData.wilaya).name} label={'Wilaya'} dark={true} />
                )}
                <CartLabel value={formData.full_address} label={'Full Address'} dark={true} />
                <CartLabel value={formData.payment_method} label={'Payment Method'} dark={true} />
                <CartLabel value={formData.home_delivery ? 'Home Delivery' : 'Yalidine Center'} label={'Delivery Type'} dark={true} />
                <CartLabel value={formData.price_payed + ' DZD'} label={'Price Payed'} dark={true} />
              

          </div>

          <button onClick={(e) => { handleSave(e) }} className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isButtonDisabled}>Confirm Order</button>
          <button onClick={toggleModal} className={`mt-2 w-full rounded-md bg-red-500 py-1.5 font-medium text-blue-50 hover:bg-red-600 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isButtonDisabled}>Cancel Order</button>

        </div>
      </div>
    </div>
  </>
  )
}

export default Order