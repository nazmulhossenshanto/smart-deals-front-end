import { Suspense } from "react"
import Hero from "../components/Hero/Hero"
import LatestProducts from "../components/LatestProducts/LatestProducts"

 
const Home = () => {
  const latestProductsPromise = fetch(
    "https://smart-deals-server-wine.vercel.app/latest-products",
  ).then((res) => res.json());
  return (
    <div>
      {/*  */}
      <Hero></Hero>
       
        <Suspense fallback={<h1>Loading Latest Product...</h1>}>
          <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
        </Suspense> 
    </div>
  )
}

export default Home