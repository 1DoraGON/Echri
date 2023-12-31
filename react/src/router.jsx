
import { ClientOrders, GuestLayout, Login, NewCart, NotFound, Product, Profile, SignUp } from './components/HomePage/index'
import DefaultLayout from "./components/Layouts/DefaultLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from './components/Views/Dashboard';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, ProductCreate, Products, Order } from './components/Dashboard/pages';

import './App.css';
import HomePage from './components/Views/HomePage';
import ClientLayout from './components/Layouts/ClientLayout';
import RequireAdmin from './components/Permissions/RequireAdmin';
import TotalSalesTest from './components/Dashboard/pages/TotalSalesTest';
const router = createBrowserRouter([

    {
        path: '/products',
        element: <ClientLayout />,
        children: [
            {
                path: '/products',
                element: <HomePage />
            },
            {
                path: '/products/:id',
                element: <Product />
            },
        ]
    },
    {
        /* require login */
        path: '/',
        element: <DefaultLayout />,
        children: [

            {
                path: '/',
                element: <Navigate to="/products" />
            },
            {
                path: '/sales',
                element: <TotalSalesTest />
            },
            {
                path: '/',
                element: <ClientLayout />,
                children: [

                    {
                        path: '/cart',
                        element: <NewCart />
                    },
                    {
                        path: '/orders',
                        element: <ClientOrders />
                    },
                    {
                        path: '/orders/:id',
                        element: <NewCart />
                    },
                    {
                        path: '/profile',
                        element: <Profile />
                    },
                ]
            },

            {
                path: '/dashboard',
                element: <RequireAdmin />,
                children: [
                    {
                        path: '/dashboard/',
                        element: <Dashboard />,
                        children: [
  
                            {
                                path: '/dashboard/ecommerce',
                                element: <Ecommerce />
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

                            /* Product management */
                            {
                                path: '/dashboard/products',
                                element: <Products />
                            },
                            {
                                path: '/dashboard/products/create',
                                element: <ProductCreate />
                            },
                            {
                                path: '/dashboard/products/:productId/update', // Dynamic route with :productId parameter
                                element: <ProductCreate />
                            },
                            /* Order management */
                            {
                                path: '/dashboard/orders',
                                element: <Orders />
                            },
                            {
                                path: '/dashboard/orders/:id',
                                element: <Order />
                            },
                            {
                                path: '/dashboard/products/:productId/update', // Dynamic route with :productId parameter
                                element: <ProductCreate />
                            },
                        ]
                    },
                ]
            }

        ]
    },
    /* guest */

    {
        path: '/',
        element: <GuestLayout />,
        children: [

            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },

        ]
    },


    {
        path: '/404',
        element: <NotFound />
    },
    {
        path: '/*',
        element: <NotFound />
    },

])

export default router;