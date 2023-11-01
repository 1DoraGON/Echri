import { useEffect, useRef, useState } from 'react'
import LoadingScreen from '../../utils/LoadingScreen';
import OrderItem from '../../Cart/OrderItem';
import ConfirmationModal from '../../utils/ConfirmationModal';
import CartLabel from '../../Cart/CartLabel';
import { algerianStates, infoMessage, statusMessage } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectInfoAlert, selectModalIsOpen, setInfoAlert, setModalIsOpen } from '../../../app/ThemeSlice';
import { toast } from 'react-hot-toast';
import axiosClient from '../../../api/axios';
import { useParams } from 'react-router-dom';
import MessageModal from '../../utils/MessageModal';
import InfoAlert from '../../utils/InfoAlert';

const Order = () => {
  const text = statusMessage

  const infoAlert = useSelector(selectInfoAlert)
  const infoMsg = infoMessage
  const [isLoading, setIsLoading] = useState(true)
  const messageRef = useRef()
  const wilayas = algerianStates
  const [orderProducts, setOrderProducts] = useState([])
  const dispatch = useDispatch()
  const isModalOpen = useSelector(selectModalIsOpen)
  const [formData, setFormData] = useState({})
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { id } = useParams()
  const toggleModal = () => {
    console.log('hi there');
    dispatch(setModalIsOpen(!isModalOpen))
  }

  const [errors, setErrors] = useState(null)
  useEffect(() => {
    const fetchOrder = async () => {
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
          status: data.status,
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
    dispatch(setInfoAlert(true))
    fetchOrder()
  }, [])


  const handleCancelOrder = async () => {
    toggleModal()
    const payload = { status: 'canceled', message: messageRef.current.value }
    await axiosClient.put('/api/admin/orders/' + id, payload).then(response => {
      console.log(response);
      toast.success('The order has been canceled!')
      setFormData(prev => ({ ...prev, status: 'canceled' }))
      //navigate('/orders')

    })
  }

  const handleConfirmOrder = async () => {
    toggleModal()
    const payload = { status: 'confirmed', message: messageRef.current.value }
    await axiosClient.put('/api/admin/orders/' + id, payload).then(response => {
      console.log(response);
      toast.success('The order has been confirmed, Now the client is able to pay his order!')
      setFormData(prev => ({ ...prev, status: 'confirmed' }))
    }).catch(error => {
      console.log(error);
    })
  }
  return (
    <>
      {isLoading && (
        <LoadingScreen />
      )}
      <div className="h-full min-h-screen bg-gray-100 dark:bg-main-dark-bg pt-20 pb-10">
        {infoAlert && (
          <InfoAlert title={'How it works?'} message={infoMsg} onClick={() => { }} onDismiss={(e) => { e.preventDefault(); dispatch(setInfoAlert(false)) }} button={false} />
        )}

        <h1 className="mb-10 text-center text-2xl font-bold dark:text-gray-200">Order Items</h1>

        <div className="mx-auto max-w-[92rem] justify-center px-6 flex space-x-6 xl:px-0 md:flex-col md:justify-between md:items-center">
          <div className="rounded-lg w-2/3 md:w-full">
            {orderProducts.map((item, i) => (
              <OrderItem key={i} item={item} dark={true} />
            ))
            }

          </div>


          <div className="md:mt-6 md:w-full h-full rounded-lg border bg-white dark:border-none dark:bg-secondary-dark-bg p-6 shadow-md mt-0 w-1/2 mx-5">

            <div className="mb-2 flex justify-between">
              <p className="text-gray-700 dark:text-gray-200">Order ID</p>
              <p className="text-gray-700 dark:text-gray-200 font-bold">{formData.id}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700 dark:text-gray-200">Order Status:</p>
              <div className=" capitalize">
                <span className={formData.status === 'pending' ? 'text-yellow-500' : formData.status === 'confirmed' ? 'text-blue-600' : formData.status === 'paid' ? 'text-green-600' : formData.status === 'canceled' ? 'text-red-600' : ''}>{formData.status}</span>
              </div>
            </div>

            <ConfirmationModal isModalOpen={isModalOpen} toggleModal={toggleModal} component={<MessageModal status={formData.status} text={text} confirmation={'Confirm Order'} cancelation={'Cancel order'} placeholder={'Write your message here.'} reference={messageRef} handleClick={handleConfirmOrder} handleClose={toggleModal} handleCancel={handleCancelOrder} />} />




            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold dark:text-gray-200">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold dark:text-gray-200">{formData.total_price + ' DZD'} </p>
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
              <CartLabel value={formData.price_payed + ' DZD'} label={'Price Paid'} dark={true} />


            </div>
            {formData.status !== 'paid' && (
              <button onClick={toggleModal} className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isButtonDisabled}>Change Order Status</button>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default Order