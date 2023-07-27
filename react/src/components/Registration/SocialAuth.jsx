import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import { LoginSocialFacebook } from "reactjs-social-login";
const SocialAuth = () => {

  const FacebookId="242567552035675"
  const [img,setImg] = useState('')
  const login = useGoogleLogin({
    onSuccess: async respose => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${respose.access_token}`
          }
        })

        console.log(res);
        setImg(res.data.picture)
      } catch (err) {
        console.log(err)

      }

    }
  });


  return (
    <>
    <img src={img} alt="" />
      <button onClick={login} type="button" className="button-theme py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ">
        <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
          </path>
        </svg>
        Sign in with Google

      </button>
      <LoginSocialFacebook
        appId={FacebookId}
        onResolve={(response) => {
          console.log(response);
          setImg(response.data.picture.data.url)
          console.log(img);
          //setProfile(response.data);
        }}
        onReject={(error) => {
          console.log(error);
        }}
      >

        <button type="button" className="button-theme py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ">
          <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z">
            </path>
          </svg>
          Sign in with Facebook
        </button>
      </LoginSocialFacebook>

    </>
  );
};

export default SocialAuth;
