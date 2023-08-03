
import { GuestLayout, Login, NotFound, Profile, SignUp} from './components/HomePage/index'
import DefaultLayout from "./components/Layouts/DefaultLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from './components/Views/Dashboard';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './components/Dashboard/pages';

import './App.css';
import HomePage from './components/Views/HomePage';
const router = createBrowserRouter( [
    
    {
        /* require login */
        path:'/',
        element:<DefaultLayout />,
        children: [

            {
                path:'/',
                element:<Navigate to="/dashboard" />
            },
            
            {
                path:'/products',
                element:<HomePage />
            },
            {
                path:'/profile',
                element:<Profile/>
            },
            {
                path:'/dashboard',
                element:<Dashboard />,
                children: [
                    {
                        path: '/dashboard/ecommerce',
                        element: <Ecommerce />
                    },
                    {
                        path: '/dashboard/orders',
                        element: <Orders />
                    },
                    {
                        path: '/dashboard/employees',
                        element: <Employees />
                    },
                    {
                        path: '/dashboard/customers',
                        element: <Customers />
                    },
                    {
                        path: '/dashboard/kanban',
                        element: <Kanban />
                    },
                    {
                        path: '/dashboard/editor',
                        element: <Editor />
                    },
                    {
                        path: '/dashboard/calendar',
                        element: <Calendar />
                    },
                    {
                        path: '/dashboard/color-picker',
                        element: <ColorPicker />
                    },


                    {
                        path: '/dashboard/line',
                        element: <Line />
                    },
                    {
                        path: '/dashboard/area',
                        element: <Area />
                    },
                    {
                        path: '/dashboard/bar',
                        element: <Bar />
                    },
                    {
                        path: '/dashboard/pie',
                        element: <Pie />
                    },
                    {
                        path: '/dashboard/financial',
                        element: <Financial />
                    },
                    {
                        path: '/dashboard/color-mapping',
                        element: <ColorMapping />
                    },
                    {
                        path: '/dashboard/pyramid',
                        element: <Pyramid />
                    },
                    {
                        path: '/dashboard/stacked',
                        element: <Stacked />
                    },
                ]
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