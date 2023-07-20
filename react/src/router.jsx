
import App from "./App";
import SignUp from "./components/Registration/SignUp";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dahsboard from "./views/Dahsboard";
import Login from "./views/login";
import Notfound from "./views/Notfound";
import UserForm from "./views/UserForm";
import Users from "./views/users";
import Signup from "./views/signup";

const router = createBrowserRouter( [
    
    {
        path:'/',
        element:<DefaultLayout />,
        children: [

            {
                path:'/',
                element:<Navigate to="/users" />
            },
            
            {
                path:'/users',
                element:<Users />
            },
            {
                path:'/users/new',
                element:<UserForm key="userCreate" />
            },
            {
                path:'/users/:id',
                element:<UserForm key="userUpdate"/>
            },
            {
                path:'/dashboard',
                element:<Dahsboard />
            },

        ]
    },
    
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
                element:<Signup />
            },
        ]
    },
    

    {
        path:'/*',
        element:<Notfound />
    },

])

export default router;