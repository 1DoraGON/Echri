import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./components/Registration/SignUp";

const router = createBrowserRouter( [
    
    {
        path:'/',
        element:<App />,
/*         children: [

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

        ] */
    },
    
    {
        path:'/login',
        element:<SignUp />,
/*         children: [
            {
                path:'/login',
                element:<Login />
            },
            {
                path:'/signup',
                element:<Signup />
            },
        ] */
    },
    

/*     {
        path:'/*',
        element:<Notfound />
    }, */

])

export default router;