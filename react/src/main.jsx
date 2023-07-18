import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import Store from './app/Store.js'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import router from './router'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>
      <Toaster position='top-center' reverseOrder={false} />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
