import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {  
  const {user, signOutUser} = use(AuthContext);
  const handleSignOut = ()=>{
   signOutUser()
    .then(() => {
      console.log("User signed out successfully"); 
    })
    .catch((error) => {
      console.log("Sign out error:", error);
    });
  };

  const links = (
    <>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li> 
      <li>
        <NavLink to='/allProducts'>All Products</NavLink>
      </li> 
      {user && <li>
        <NavLink to='/myProducts'>My Product</NavLink>
      </li>} 
      {
        user && <li>
        <NavLink to='/myBids'>My Bids</NavLink>
      </li>
      } 
      {
        user && <li>
        <NavLink to='/createProduct'>Create Product</NavLink>
      </li>
      } 
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm mt-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl"><span className="text-black font-bold text-2xl">Smart</span><span className="text-violet-600 font-bold text-2xl">Deals</span></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end flex  items-center gap-5">
        {
          user ? <button onClick={handleSignOut} className="btn">Logout</button> : <Link className="btn" to='/login'>Login</Link>
        }
        <Link className="btn" to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
