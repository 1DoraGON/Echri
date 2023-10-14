import React, { useRef, useState } from 'react'
import CartInput from '../Cart/CartInput'
import axiosClient from '../../api/axios';

const ModifyPasswordModal = ({ toggleModal }) => {
  const [form, setForm] = useState({
    current: '',
    new: '',
    confirmation: ''
  })
  const [errors, setErrors] = useState(false)
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const handleClick = async () => {
    const payload = {
      current_password: form.current,
      new_password: form.new,
      new_password_confirmation: form.confirmation,
    }
    setIsButtonDisabled(true);

    await axiosClient.put('/api/user/updatePassword', payload).then(response => {

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 4000);
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling animation
      });
      console.log(response);
      toggleModal()
    }).catch(error => {
      setIsButtonDisabled(false);
      console.log(error);
      if (!error.response.status === 422) {
        toggleModal()
      } else {
        setErrors(error.response.data.errors)
      }
    })
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-opacity-80"
    >
      <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow ">


        <div className="flex-row justify-center gap-5 items-center">
          <p className="text-center font-semibold">Change Password</p>
          {errors && (
            <ul className="alert">
              {Object.keys(errors).map((key) => (
                <li key={key}>{errors[key][0]}</li>
              ))}
            </ul>
          )}
          <div className="flex-row items-center justify-between">
            <label htmlFor="current" className="my-4 font-semibold text-gray-900">
              Current Password
            </label>
            <CartInput
              type="password"
              name="current"
              placeholder="Your current password"
              value={form.current}
              handleChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex-row items-center justify-between">
            <label htmlFor="new" className="my-4 font-semibold text-gray-900">
              New Password
            </label>
            <CartInput
              type="password"
              name="new"
              placeholder="Your new password"
              value={form.new}
              handleChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="flex-row items-center justify-between">
            <label htmlFor="confirmation" className="my-4 font-semibold text-gray-900">
              Confirm Password
            </label>
            <CartInput
              type="password"
              name="confirmation"
              placeholder="Confirm your password"
              value={form.confirmation}
              handleChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mt-6 space-x-4 flex justify-between items-center">
            <button
              onClick={handleClick}
              className={`w-1/2 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Submit
            </button>
            <button
              onClick={toggleModal}
              className="w-1/2 rounded-md bg-gray-200 py-1.5 font-medium text-gray-700 hover:bg-gray-300"
            >
              Discard
            </button>
          </div>
        </div>

      </div>
    </div>

  )
}

export default ModifyPasswordModal