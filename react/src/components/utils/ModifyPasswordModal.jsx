import React, { useRef, useState } from 'react'
import CartInput from '../Cart/CartInput'

const ModifyPasswordModal = ({isButtonDisabled }) => {
  const [form,setForm] = useState({
    current: '',
    new: '',
    confirmation: ''
  })
  const [errors,setErrors] = useState([])
  
  const handleClick = () => {

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div className='flex-row justify-center gap-5 items-center '>
      <p className='text-center font-semibold'>Change Password</p>
      <div className="flex-row items-center justify-between">
        <label htmlFor="current" className='my-4 font-semibold text-gray-900'>Current Password</label>
        <CartInput type={'text'} name={'current'} placeholder={'Your current password'} value={form.current} handleChange={e=>handleInputChange(e)} />
      </div>
      <div className="flex-row items-center justify-between">
        <label htmlFor="new" className='my-4 font-semibold text-gray-900'>New Password</label>
        <CartInput type={'text'} name={'new'} placeholder={'Your new password'} value={form.new} handleChange={e=>handleInputChange(e)} />
      </div>
      <div className="flex-row items-center justify-between">
        <label htmlFor="confirmation" className='my-4 font-semibold text-gray-900'>New Password</label>
        <CartInput type={'text'} name={'confirmation'} placeholder={'Confirm your password'} value={form.confirmation} handleChange={e=>handleInputChange(e)} />
      </div>
      <button onClick={handleClick} className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} >Submit</button>
    </div>
  )
}

export default ModifyPasswordModal