import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import { Provider } from 'react-redux'
import Store from './app/Store.js'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import {GoogleOAuthProvider} from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <GoogleOAuthProvider clientId="96452844927-6hq7j74fa1utblqptncbaghtm1erbfee.apps.googleusercontent.com">
        <Toaster position='top-center' reverseOrder={false} />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
