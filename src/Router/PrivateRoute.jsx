import { use } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router";

 
const PrivateRoute = ({children}) => {
    const {user, loading} = use(AuthContext);
    if(loading){
        <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    }
    if(!user){
      return  <Navigate to='/login' replace></Navigate>
    }
  return children;
}

export default PrivateRoute