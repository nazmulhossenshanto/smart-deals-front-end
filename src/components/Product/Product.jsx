import { Link } from "react-router";

const Product = ({ product }) => {
  const { _id, title, usage, price_min, price_max, image, status } = product;
  return (
    <div className="card bg-base-100 shadow-lg space-y-3 hover:scale-105 px-2 py-4">
      <figure className="w-full">
        <img
          className="w-full aspect-3/3 object-cover rounded-lg  shadow-lg"
          src={image}
          alt={`${title} photo`}
        />
      </figure>
      <div>
        <p className="bg-primary/40  rounded-full w-fit px-2 py-1">{status}</p>
      </div>
      <div className=" flex flex-col min-h-36.25  p-0">
        <h2 className="text-xl font-semibold">
          {title} [ {usage} ]
        </h2>
        <p className="text-primary font-semibold">
          $ {price_min} - {price_max}
        </p>
        <div className=" mt-auto ">
          <Link
            to={`/productDetails/${_id}`}
            className=" w-full btn btn-outline border-primary text-primary hover:bg-primary/80 hover:text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
