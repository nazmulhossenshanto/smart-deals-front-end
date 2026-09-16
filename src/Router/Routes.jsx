import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";

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
                element: <h1>login</h1>
            },
            {
                path: '/register',
                element: <h1>Register</h1>
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