import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleSignIn = () => {
  const clientId = "96452844927-6hq7j74fa1utblqptncbaghtm1erbfee.apps.googleusercontent.com"

  const login = useGoogleLogin({
    onSuccess: async respose => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            "Authorization": `Bearer ${respose.access_token}`
          }
        })

        console.log(res.data)
      } catch (err) {
        console.log(err)

      }

    }
  });


  return (
    <div>
      <button onClick={login}>
        Continue with google
        <div className="hidden">

      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse.credential);
          var decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded)
        }}
        onError={() => {
          console.log('Login Failed');
        }} />
        </div>
      </button>
    </div>
  );
};

export default GoogleSignIn;
