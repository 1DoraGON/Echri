
import { GuestLayout, Login, NotFound, Profile, SignUp} from './components/index'
import DefaultLayout from "./components/Layouts/DefaultLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from './components/Dashboard/Dashboard';
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
                element:<App />
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
                        path: '/dashboard/orders',
                        element: <h1>orders</h1>
                    },
                    {
                        path: '/dashboard/employees',
                        element: <h1>employees</h1>
                    },
                    {
                        path: '/dashboard/customers',
                        element: <h1>customers</h1>
                    },
                    {
                        path: '/dashboard/kanban',
                        element: <h1>kanban</h1>
                    },
                    {
                        path: '/dashboard/editor',
                        element: <h1>editor</h1>
                    },
                    {
                        path: '/dashboard/calendar',
                        element: <h1>calendar</h1>
                    },
                    {
                        path: '/dashboard/color-picker',
                        element: <h1>color-picker</h1>
                    },


                    {
                        path: '/dashboard/line',
                        element: <h1>line</h1>
                    },
                    {
                        path: '/dashboard/area',
                        element: <h1>area</h1>
                    },
                    {
                        path: '/dashboard/bar',
                        element: <h1>bar</h1>
                    },
                    {
                        path: '/dashboard/pie',
                        element: <h1>pie</h1>
                    },
                    {
                        path: '/dashboard/financial',
                        element: <h1>financial</h1>
                    },
                    {
                        path: '/dashboard/color-mapping',
                        element: <h1>color-mapping</h1>
                    },
                    {
                        path: '/dashboard/pyramid',
                        element: <h1>pyramid</h1>
                    },
                    {
                        path: '/dashboard/stacked',
                        element: <h1>stacked</h1>
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