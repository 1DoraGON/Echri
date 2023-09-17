import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '../Dashboard/components';
import { userProfileData } from '../../data/dummy'
//import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../../data/avatar.jpg';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const auth = useAuth()
  const STORAGE_URL = import.meta.env.VITE_REACT_APP_STORAGE_URL;

  return (
    <div className="nav-item absolute right-1 top-16 bg-white p-8 rounded-lg w-96">
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
        <img
          className="rounded-full h-24 w-24"
          src={auth.user.is_social_auth? auth.user.picture : STORAGE_URL + auth.user.picture }
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl"> {auth.user.firstname + ' ' + auth.user.lastname} </p>
          <p className="text-gray-500 text-sm">  Administrator   </p>
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
