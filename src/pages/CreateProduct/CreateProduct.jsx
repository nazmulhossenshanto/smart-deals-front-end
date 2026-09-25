import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxios from "../../hooks/useAxios";

const CreateProduct = () => {
  // const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
 const handleCreateProduct = (e) => {
   e.preventDefault();

   const form = e.target;

   const productInfo = {
     title: form.title.value,
     category: form.category.value,
     email: form.seller_email.value,
     price_min: Number(form.price_min.value),
     price_max: Number(form.price_max.value),
     condition: form.condition.value,
     usage: form.usage.value,
     image: form.image.value,
     seller_name: form.seller_name.value,
     seller_contact: form.seller_contact.value,
     seller_image: form.seller_image.value,
     location: form.location.value,
     description: form.description.value,
   };

   //  const fetch = {
   // Create product into database
   // fetch("https://smart-deals-server-wine.vercel.app/products", {
   //   method: "POST",
   //   headers: {
   //     "content-type": "application/json",
   //   },
   //   body: JSON.stringify(productInfo),
   // })
   //   .then((res) => {
   //     if (!res.ok) {
   //       throw new Error("Failed to create product");
   //     }

   //     return res.json();
   //   })
   //   .then((data) => {
   //     console.log("data after create:", data);

   //     Swal.fire({
   //       title: "Product Created!",
   //       text: "Your product has been added successfully.",
   //       icon: "success",
   //       confirmButtonText: "OK",
   //     });

   //     form.reset();
   //   })
   //   .catch((error) => {
   //     console.log("Create product error:", error);

   //     Swal.fire({
   //       title: "Failed!",
   //       text: "Something went wrong. Please try again.",
   //       icon: "error",
   //       confirmButtonText: "OK",
   //     });
   //   });
   // }

   // create product using axios

   axiosSecure.post("/products", productInfo).then((data) => {
     console.log("product created using axiosSecure", data.data);
     if (data.data.insertedId) {
       Swal.fire({
         title: "Product Created!",
         text: "Your product has been added successfully.",
         icon: "success",
         confirmButtonText: "OK",
       });
     }
   });
 };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="flex justify-center items-center my-5">
              <Link
                to="/allProducts"
                className="flex items-center gap-2 w-fit font-bold text-sm md:text-xl "
              >
                <ArrowLeft size={18}  />
                <span>Back To Products</span>
              </Link>
            </div>
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Create New Product
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            Add your product details and start selling on Smart Deals
          </p>
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-5 md:p-8">

            <form onSubmit={handleCreateProduct}>

              {/* Product Information */}
              <h2 className="mb-5 text-xl font-semibold border-b border-base-300 pb-3">
                Product Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Title */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Product Title
                  </legend>

                  <input
                    type="text"
                    name="title"
                    className="input w-full"
                    placeholder="e.g. iPhone 13 Pro Max"
                    required
                  />
                </fieldset>

                {/* Category */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Category
                  </legend>

                  <select
                    name="category"
                    className="select w-full"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a Category
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Others">Others</option>
                  </select>
                </fieldset>

                {/* Minimum Price */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Min Price You Want to Sale (৳)
                  </legend>

                  <input
                    type="number"
                    name="price_min"
                    className="input w-full"
                    placeholder="e.g. 50000"
                    required
                  />
                </fieldset>

                {/* Maximum Price */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Max Price You Want to Sale (৳)
                  </legend>

                  <input
                    type="number"
                    name="price_max"
                    className="input w-full"
                    placeholder="Optional"
                  />
                </fieldset>

                {/* Condition */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Product Condition
                  </legend>

                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value="new"
                        className="radio radio-primary"
                        defaultChecked
                      />
                      <span>Brand New</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value="used"
                        className="radio radio-primary"
                      />
                      <span>Used</span>
                    </label>
                  </div>
                </fieldset>

                {/* Usage */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Product Usage Time
                  </legend>

                  <input
                    type="text"
                    name="usage"
                    className="input w-full"
                    placeholder="e.g. 1 year 3 month"
                  />
                </fieldset>

                {/* Product Image */}
                <fieldset className="fieldset md:col-span-2">
                  <legend className="fieldset-legend">
                    Product Image URL
                  </legend>

                  <input
                    type="url"
                    name="image"
                    className="input w-full"
                    placeholder="https://..."
                    required
                  />
                </fieldset>

              </div>

              {/* Seller Information */}
              <h2 className="mt-8 mb-5 text-xl font-semibold border-b border-base-300 pb-3">
                Seller Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Seller Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Seller Name
                  </legend>

                  <input
                    type="text"
                    name="seller_name"
                    className="input w-full"
                    placeholder="e.g. Md. Rahim Uddin"
                    required
                  />
                </fieldset>

                {/* Seller Email */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Seller Email
                  </legend>

                  <input
                    type="email"
                    name="seller_email"
                    className="input w-full"
                    placeholder="example@gmail.com"
                    required
                  />
                </fieldset>

                {/* Seller Contact */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Seller Contact
                  </legend>

                  <input
                    type="tel"
                    name="seller_contact"
                    className="input w-full"
                    placeholder="e.g. 01711111111"
                    required
                  />
                </fieldset>

                {/* Seller Image */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Seller Image URL
                  </legend>

                  <input
                    type="url"
                    name="seller_image"
                    className="input w-full"
                    placeholder="https://..."
                  />
                </fieldset>

                {/* Location */}
                <fieldset className="fieldset md:col-span-2">
                  <legend className="fieldset-legend">
                    Location
                  </legend>

                  <input
                    type="text"
                    name="location"
                    className="input w-full"
                    placeholder="e.g. Dhanmondi, Dhaka"
                    required
                  />
                </fieldset>

              </div>

              {/* Description */}
              <fieldset className="fieldset mt-5">
                <legend className="fieldset-legend">
                  Simple Description about your Product
                </legend>

                <textarea
                  name="description"
                  className="textarea w-full h-32"
                  placeholder="Describe your product, condition, usage, features etc."
                  required
                ></textarea>
              </fieldset>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-7"
              >
                Create A Product
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;