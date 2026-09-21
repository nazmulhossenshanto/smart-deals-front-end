import { use, useEffect, useRef, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const [bids, setBids] = useState([]);
  const { user } = use(AuthContext);
  const bidModalRef = useRef(null);
  const handleModal = () => {
    bidModalRef.current.showModal();
  };
  const product = useLoaderData();
  const {
    image,
    condition,
    usage,
    description,
    title,
    price_min,
    price_max,
    category,
    created_at,
    _id,
    location,
    seller_contact,
    seller_image,
    seller_name,
    status,
  } = product;
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const name = user.displayName;
    const email = user.email;
    const price = Number(e.target.price.value);
    const contactInfo = e.target.contact.value;
    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: price,
      contact_info: contactInfo,
      status: "pending",
    };
    const res = await fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    });
    const data = await res.json();
    if(data.insertedId){
      bidModalRef.current.close();
      // sweet alert
      Swal.fire({
  title: "Successed!",
  text: "Your bid has been placed.",
  imageUrl: user?.photoURL,
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: user.displayName
});
newBid._id = data.inserteId;
const newBids = [...bids, newBid];
newBids.sort((a, b)=> a.bid_price - b.bid_price)
setBids(newBids)
    }
    console.log(data);

    
  };

  // fetch bids for this product
  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBids(data);
      });
  }, [_id]);
  return (
    <div className="w-11/12 max-w-6xl mx-auto my-6 md:my-10">
      {/* product info */}
      <div className="flex flex-col md:flex-row justify-between gap-5">
        {/* Left Content */}
        <div className="flex-1">
          {/* image div */}
          <div className="w-full">
            <img
              src={image}
              alt={title}
              className="w-full h-60 sm:h-64 md:h-80 lg:h-150 object-cover rounded-lg"
            />
          </div>
          {/* content div */}
          <div>
            <h1 className="text-xl font-bold my-3">Product Description</h1>
            <div className="flex justify-between">
              <p className="font-bold">
                <span className="text-primary">Condition :</span> {condition}
              </p>
              <p className="  font-bold">
                <span className="text-primary">Usage Time :</span> {usage}
              </p>
            </div>
            <div className="divider"></div>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        {/* Right content */}
        <div className="flex-1 space-y-5">
          {/* Product Title + Category */}
          <div>
            <div>
              <Link
                to="/allProducts"
                className="flex items-center gap-2 w-fit text-sm"
              >
                <ArrowLeft size={18} />
                <span>Back To Products</span>
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h1>

            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm">
              {category}
            </span>
          </div>

          {/* Price */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h2 className="text-2xl font-bold text-green-600">
              ${price_min} - ${price_max}
            </h2>

            <p className="text-gray-600 mt-1">Price starts from</p>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Product Details
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Product ID:</span> {_id}
              </p>

              <p>
                <span className="font-semibold">Posted:</span>{" "}
                {new Date(created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Seller Information
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={seller_image}
                alt={seller_name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold">{seller_name}</h3>

                <p className="text-sm text-gray-500">{product.email}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>

              <p>
                <span className="font-semibold">Contact:</span> {seller_contact}
              </p>

              <p className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>

                <span className="px-3 py-1 rounded-full bg-yellow-400 text-black text-xs">
                  {status === "pending" ? "On Sale" : status}
                </span>
              </p>
            </div>
          </div>

          {/* Buy Button */}
          <button
            onClick={handleModal}
            className="w-full text-white bg-primary rounded-md px-3 py-3 font-semibold hover:opacity-90 transition"
          >
            I Want Buy This Product
          </button>
          {/* Modal Open */}
          <dialog
            ref={bidModalRef}
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center my-3">
                Give seller your offered price!
              </h3>
              <div className="">
                <form onSubmit={handleBidSubmit} method="dialog">
                  <fieldset className="fieldset space-y-2">
                    <div className="flex justify-between gap-5">
                      <div className="space-y-2">
                        <label className="label text-black font-semibold">
                          Buyer Name
                        </label>
                        <input
                          type="text"
                          className="input"
                          readOnly
                          defaultValue={user?.displayName}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="label text-black font-semibold">
                          Buyer Email
                        </label>
                        <input
                          type="text"
                          className="input"
                          defaultValue={user?.email}
                          placeholder="buyer email"
                        />
                      </div>
                    </div>
                    <label className="label text-black font-semibold">
                      Place Your Price
                    </label>
                    <input
                      name="price"
                      type="text"
                      className="input"
                      placeholder="price"
                    />
                    <label className="label text-black font-semibold">
                      Contact Info
                    </label>
                    <input
                      name="contact"
                      type="text"
                      className="input"
                      placeholder="Your info"
                    />
                  </fieldset>
                  <div className="flex justify-end gap-5">
                    <button
                      type="button"
                      onClick={() => bidModalRef.current.close()}
                      className="btn btn-outline border-primary text-white bg-primary mt-4"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-outline border-primary text-white bg-primary mt-4"
                    >
                      Submit Bid
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
          {/* Modal Close */}
        </div>
      </div>
      {/* bids for this product */}
      <div>
        <h1 className="text-2xl font-bold mt-10">
          Bids For This Product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h1>
        {/* bids for this product */}

      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          SL No.
        </th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bid Price</th>
        <th>Actions</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        bids.map((bid, index)=><tr key={bid._id}>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center  gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src={bid?.buyer_image} alt="" />
            <h1>{bid.buyer_name}</h1>
          </div>
        </td>
        <td>
          {bid?.buyer_email} 
        </td>
        <td>$ {bid.bid_price}</td>
        <th >
         <div className="flex gap-2">
           <button className="btn  btn-outline btn-success btn-xs">Accept Offer</button>
          <button className="btn  btn-outline btn-warning btn-xs">Reject Offer</button>
         </div>
        </th>
      </tr>)
      }
    </tbody> 
  </table>
</div>


      </div>
    </div>
  );
};

export default ProductDetails;
