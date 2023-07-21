
import { GuestLayout, Login, NotFound, Profile, SignUp} from './components/index'
import DefaultLayout from "./components/Layouts/DefaultLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
const router = createBrowserRouter( [
    
    {
        /* require login */
        path:'/',
        element:<DefaultLayout />,
        children: [

            {
                path:'/',
                element:<Navigate to="/products" />
            },
            
            {
                path:'/products',
                element:<App />
            },
            {
                path:'/profile',
                element:<Profile/>
            }

        ]
    },
        /* guest */
    
    {
        path:'/',
        element:<GuestLayout />,
        children: [
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/signup',
                element:<SignUp />
            },
        ]
    },
    

    {
        path:'/*',
        element:<NotFound />
    },

])

export default router;