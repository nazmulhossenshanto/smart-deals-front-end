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
  const {image , condition, usage, description } = product;
  const handleBidSubmit = (e)=>{
    e.preventDefault();
    console.log('bid submited');
    bidModalRef.current.close();
  }
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
              <p className="font-bold"><span className="text-primary">Condition :</span> {condition}</p>
              <p className="  font-bold"><span className="text-primary">Usage Time :</span> {usage}</p>
            </div>
            <div className="divider"></div>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        {/* Right content */}
        <div className="flex-1">
          <button onClick={handleModal} className="text-white bg-primary  rounded-full px-3 py-1">
            I want to buy this product
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
                        <label className="label text-black font-semibold">Buyer Name</label>
                        <input
                          type="text"
                          className="input" readOnly
                          defaultValue={user.displayName}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="label text-black font-semibold">Buyer Email</label>
                        <input
                          type="text"
                          className="input" 
                          defaultValue={user.email}
                          placeholder="buyer email"
                        />
                      </div>
                    </div>
                    <label className="label text-black font-semibold">Place Your Price</label>
                    <input type="text" className="input" placeholder="price" />
                    <label className="label text-black font-semibold">Contact Info</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Your info"
                    />
                  </fieldset>
                  <div className="flex justify-end gap-5">
                    <button  className="btn btn-outline border-primary text-white bg-primary mt-4">Cancel</button>
                    <button  className="btn btn-outline border-primary text-white bg-primary mt-4">Submit Bid</button>
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
