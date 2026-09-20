import { use, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const ProductDetails = () => {
  const { user } = use(AuthContext);
  const bidModalRef = useRef(null);
  const handleModal = () => {
    bidModalRef.current.showModal();
  };
  const product = useLoaderData();
  const {image, condition, usage, description,
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
  const handleBidSubmit = async(e) => {
    e.preventDefault();
    const name = user.displayName;
    const email = user.email;
    const price = e.target.price.value;
    const contactInfo = e.target.contact.value;
    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      bid_price: price,
      contact_info: contactInfo,
      status: 'pending'
    };
    const res = await fetch('http://localhost:3000/bids',{
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newBid)
    });
    const data =  await res.json();
    console.log('after place a bid', data);
    
    bidModalRef.current.close();
  };
  return (
    <div className="max-w-11/12 mx-auto my-10">
      {/* product info */}
      <div className="flex flex-col md:flex-row justify-between gap-5">
        {/* Left Content */}
        <div className="flex-1">
          {/* image div */}
          <div>
            <img className="rounded-lg object-cover" src={image} alt="" />
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
                          defaultValue={user.displayName}
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
                          defaultValue={user.email}
                          placeholder="buyer email"
                        />
                      </div>
                    </div>
                    <label className="label text-black font-semibold">
                      Place Your Price
                    </label>
                    <input name="price" type="text" className="input" placeholder="price" />
                    <label className="label text-black font-semibold">
                      Contact Info
                    </label>
                    <input name="contact"
                      type="text"
                      className="input"
                      placeholder="Your info"
                    />
                  </fieldset>
                  <div className="flex justify-end gap-5">
                    <button className="btn btn-outline border-primary text-white bg-primary mt-4">
                      Cancel
                    </button>
                    <button className="btn btn-outline border-primary text-white bg-primary mt-4">
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
    </div>
  );
};

export default ProductDetails;
