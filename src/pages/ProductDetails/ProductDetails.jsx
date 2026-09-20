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
  console.log(product);
  const handleBidSubmit = (e)=>{
    e.preventDefault();
    console.log('bid submited');
  }
  return (
    <div className="max-w-11/12 mx-auto my-10">
      {/* product info */}
      <div className="flex flex-col md:flex-row justify-between ">
        <div></div>
        <div>
          <button onClick={handleModal} className="text-white bg-primary">
            I want to buy this product
          </button>
          {/* Modal */}
          <dialog
            ref={bidModalRef}
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Give seller your offered price!
              </h3>
              <div className="">
                <form onSubmit={handleBidSubmit} method="dialog">
                  <fieldset className="fieldset">
                    <div className="flex justify-between gap-5">
                      <div>
                        <label className="label text-black font-semibold">Buyer Name</label>
                        <input
                          type="text"
                          className="input" readOnly
                          defaultValue={user.displayName}
                          placeholder="Your name"
                        />
                      </div>
                      <div>
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
                  <button  className="btn btn-neutral mt-4">Login</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {/* bids for this product */}
    </div>
  );
};

export default ProductDetails;
