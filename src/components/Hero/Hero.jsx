import { IoIosSearch } from "react-icons/io";

import heroLeft from "../../assets/bg-hero-left.png";
import heroRight from "../../assets/bg-hero-right.png";

const Hero = () => {
  return (
    <section className="relative min-h-125 overflow-hidden bg-linear-to-r from-violet-50 via-white to-cyan-50">

      {/* Left Background Image */}
      <img
        src={heroLeft}
        alt=""
        className="pointer-events-none absolute left-0 top-1/2 w-70 -translate-y-1/2 opacity-70 md:w-87.5"
      />

      {/* Right Background Image */}
      <img
        src={heroRight}
        alt=""
        className="pointer-events-none absolute right-0 top-1/2 w-70 -translate-y-1/2 opacity-70 md:w-87.5"
      />

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-violet-100/40 via-white/20 to-cyan-100/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-125 items-center justify-center px-4">

        <div className="w-full max-w-4xl space-y-5 text-center">

          {/* Heading */}
          <h1 className="text-2xl font-bold leading-tight text-slate-800 sm:text-3xl md:text-5xl">
            Deal Your{" "}
            <span className="text-violet-600">
              Products
            </span>
            <br />
            In A{" "}
            <span className="text-violet-600">
              Smart
            </span>{" "}
            Way!
          </h1>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-sm text-slate-500 sm:text-base">
            SmartDeals helps you sell, resell, and shop from trusted
            local sellers — all in one place!
          </p>

          {/* Search Bar */}
          <div className="mx-auto flex w-full max-w-xl justify-center pt-2">

            <div className="join w-full shadow-md">

              <input
                type="text"
                placeholder="Search For Products, Categories..."
                className="input join-item w-full border-none bg-white focus:outline-none"
              />

              <button className="btn join-item border-none bg-violet-600 text-xl text-white hover:bg-violet-700">
                <IoIosSearch />
              </button>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">

            <button className="btn bg-violet-600 text-white hover:bg-violet-700">
              Watch All Products
            </button>

            <button className="btn btn-outline border-violet-500 text-violet-600 hover:bg-violet-600 hover:text-white">
              Post a Product
            </button>

          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;