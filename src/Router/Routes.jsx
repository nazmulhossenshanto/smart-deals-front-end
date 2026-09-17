import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index : true,
                Component: Home
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/allProducts', 
                element: <h1>all product</h1>
            },
            {
                path: '/myProducts', 
                element: <h1>my Product</h1>
            },
            {
                path: '/myBids', 
                element: <h1>my Bids</h1>
            },
            {
                path: '/createProduct', 
                element: <h1>create Product</h1>
            }, 
        ]
    }
])