import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '../Dashboard/components';
//import { userProfileData } from '../../data/dummy'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import useAuth from '../../hooks/useAuth';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdPassword } from 'react-icons/md';
import { BsPencil } from 'react-icons/bs';
import { AtSymbolIcon } from '@heroicons/react/24/outline'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useState } from 'react';
import axiosClient from '../../api/axios';
import ConfirmationModal from '../utils/ConfirmationModal';
import ModifyPasswordModal from '../utils/ModifyPasswordModal';
const Profile = () => {
  const auth = useAuth()
  const STORAGE_URL = import.meta.env.VITE_REACT_APP_STORAGE_URL;
  const [image, setImage] = useState(null)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const handleImageModify = () => {
    // Trigger a click event on the input field
    const inputElement = document.getElementById('image');
    if (inputElement) {
      inputElement.click();
    }
  }

  const handleImageChange = async (event) => {
    // Handle the image change
    const selectedImage = event.target.files[0];
    console.log(STORAGE_URL + auth.user.picture);
    // You can set the selected image to state here and send a request to your backend
    setImage(selectedImage);
    const formData = new FormData()
    formData.append('_method', 'put');
    formData.append('picture',selectedImage)
    await axiosClient.post('/api/user/changeImage',formData).then(response=>{
      console.log(response);
    }).catch(error=>{
      console.log(error);
    })
    // Example of sending a request to your backend
    // Replace 'yourBackendEndpoint' with your actual endpoint
    // fetch('yourBackendEndpoint', {
    //   method: 'POST',
    //   body: selectedImage, // You may need to format the image data based on your backend requirements
    // })
    // .then(response => {
    //   // Handle the response
    // })
    // .catch(error => {
    //   // Handle errors
    // });
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const userProfileData = [
    {
      icon: <AiOutlineShoppingCart className='w-8 h-8' />,
      title: 'My Orders',
      desc: 'All the orders with their details',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
    {
      icon: <MdPassword onClick={toggleModal} className='w-8 h-8' />,
      title: 'Modify Password',
      desc: 'Change your password',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
    },
    {
      icon: <AiOutlineShoppingCart className='w-8 h-8' />,
      title: 'My Orders',
      desc: 'All the orders with their details',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
    },
    /*     {
          icon: <BsShield />,
          title: 'My Inbox',
          desc: 'Messages & Emails',
          iconColor: 'rgb(0, 194, 146)',
          iconBg: 'rgb(235, 250, 242)',
        },
        {
          icon: <FiCreditCard />,
          title: 'My Tasks',
          desc: 'To-do and Daily Tasks',
          iconColor: 'rgb(255, 244, 229)',
          iconBg: 'rgb(254, 201, 15)',
        }, */
  ];

  return (
    <div className="nav-item absolute right-1 top-16 bg-white p-8 rounded-lg w-96">
      <ConfirmationModal isModalOpen={isModalOpen} toggleModal={toggleModal} component={<ModifyPasswordModal isButtonDisabled={false} />} />
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          <div className="relative w-24 h-24 rounded-full">
            <img
              className="rounded-full h-full w-full"
              src={image ? URL.createObjectURL(image) : (auth.user.is_social_auth && !auth.user.picture.startsWith('user_images') ? auth.user.picture : STORAGE_URL + auth.user.picture)}
              alt="user-profile"
            />
            <div className="absolute top-1 right-1">
              <BsPencil
                onClick={handleImageModify}
                className='w-5 h-5 text-white bg-slate-700 hover:bg-slate-900 rounded-full p-1 cursor-pointer'
              />
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
                hidden
              />
            </div>
          </div>
        </div>


        <div>
          <p className="font-semibold text-xl"> {auth.user.firstname + ' ' + auth.user.lastname} </p>
          {/* <p className="text-gray-500 text-sm">  Administrator   </p> */}
          <p className="text-gray-500 text-sm font-semibold"> {auth.user.email} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold ">{item.title}</p>
              <p className="text-gray-500 text-sm"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={'black'}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>

  );
};

export default Profile;
