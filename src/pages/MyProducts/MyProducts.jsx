import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    fetch(
      `https://smart-deals-server-wine.vercel.app/products?email=${user.email}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not fetch products");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.log("fatching products error", error);
      });
  }, [user.email]);
  return (
    <div className="max-w-11/12 mx-auto shadow-2xl my-10 pt-5">
      <h1 className="my-5 text-center text-4xl font-bold">
        MyProducts : <span className="text-primary">{products?.length}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product Image</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products?.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center  gap-3">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product?.image}
                      alt=""
                    />
                    <h1>{product.title}</h1>
                  </div>
                </td>
                <td>{product?.category}</td>
                <td>$ {product?.price_min}</td>
                <td>
                  {" "}
                  <span className="badge badge-warning badge-sm rounded-full">
                    {product.status || 'pending'}
                  </span>
                </td>
                <th>
                  <div className="flex gap-2">
                    {/* onClick={()=>handleRemoveBid(products._id)}  */}
                    <button className="btn  btn-outline btn-info btn-xs">
                      Edit
                    </button>
                    <button className="btn  btn-outline btn-warning btn-xs">
                      Delete
                    </button>
                    <button className="btn  btn-outline btn-success btn-xs">
                      Make Sold
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
