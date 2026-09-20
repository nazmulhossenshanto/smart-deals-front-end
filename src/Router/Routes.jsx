import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllProducts from "../components/AllProducts/AllProducts";
import PrivateRoute from "./PrivateRoute";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

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
                loader: ()=> fetch('http://localhost:3000/products').then(res=>res.json()),
                element: <AllProducts></AllProducts>
            },
            {
                path: '/myProducts', 
                element: <PrivateRoute><h1>my Product</h1></PrivateRoute>
            },
            {
                path: '/productDetails/:id',
                loader: ({params})=> fetch(`http://localhost:3000/products/${params.id}`),
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
            },
            {
                path: '/createProduct', 
                element: <h1>create Product</h1>
            },
            {
                path: '/myBids', 
                element: <PrivateRoute><h1>my Bids</h1></PrivateRoute>
            }, 
        ]
    }
])