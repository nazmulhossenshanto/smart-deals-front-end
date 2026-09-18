import { useLoaderData } from "react-router"
import Product from "../Product/Product";

 
const AllProducts = () => {
    const allProducts = useLoaderData();
    console.log(allProducts);

  return (
    <div className="max-w-11/12 mx-auto my-10">
         <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold my-5">All <span className="text-primary">Products</span></h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          allProducts.map(product=><Product onsale='On Sale' key={product._id} product={product}></Product>)
        }
      </div>
    </div>
  )
}

export default AllProducts