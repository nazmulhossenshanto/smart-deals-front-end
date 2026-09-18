import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

 
const RootLayout = () => {
  return (
    <div>
        <header>
            <Navbar></Navbar>
        </header>
        <section >
          <Outlet></Outlet>
        </section>
    </div>
  )
}

export default RootLayout