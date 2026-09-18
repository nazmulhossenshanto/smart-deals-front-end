import { use } from "react";
import Product from "../Product/Product";

 
const LatestProducts = ({latestProductsPromise}) => {
  const latestProduct = use(latestProductsPromise);
  console.log(latestProduct);
  return (
    <div className="max-w-11/12 mx-auto my-10">
      <h1 className="text-center text-2xl font-bold my-5">Recent <span className="text-primary">Products</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          latestProduct.map(product=><Product key={product._id} product={product}></Product>)
        }
      </div>
    </div>
  )
}

export default LatestProducts;