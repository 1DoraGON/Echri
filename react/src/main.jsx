import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import Store from './app/Store.js'
import { Toaster } from 'react-hot-toast'

import {GoogleOAuthProvider} from '@react-oauth/google';
import { registerLicense } from '@syncfusion/ej2-base';
import App from './App'
//import '@syncfusion/ej2-base/styles/material.css'; // Choose the appropriate theme (e.g., material.css, bootstrap.css, etc.)
//import '@syncfusion/ej2-react-popups/styles/material.css'; // Choose the appropriate theme (e.g., material.css, bootstrap.css, etc.)

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5bdkRiXnxZcn1VQWlb');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <GoogleOAuthProvider clientId="96452844927-6hq7j74fa1utblqptncbaghtm1erbfee.apps.googleusercontent.com">
        <Toaster position='top-center' reverseOrder={false} />
        <App />
        
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
