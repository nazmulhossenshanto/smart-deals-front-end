import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user?.email]);
  return (
    <div>
      <h1 className="my-10 text-center text-4xl font-bold">
        MyBids : <span className="text-primary">{bids.length}</span>
      </h1>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          SL No.
        </th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bid Price</th>
        <th>Actions</th>
        <th></th>
      </tr>
    </thead>
    <tbody >
      {/* row 1 */}
      {
        bids.map((bid, index)=><tr key={bid._id}>
        <th>
          {index + 1}
        </th>
        <td>
          <div className="flex items-center  gap-3">
            <img className="h-10 w-10 rounded-full object-cover" src={bid?.buyer_image} alt="" />
            <h1>{bid.buyer_name}</h1>
          </div>
        </td>
        <td>
          {bid?.buyer_email} 
        </td>
        <td>$ {bid.bid_price}</td>
        <td className="bg-yellow-400 btn btn-xs rounded-full">{bid.status}</td>
        <th >
         <div className="flex gap-2">
           <button className="btn  btn-outline btn-warning btn-xs">Remove Bid</button>
         </div>
        </th>
      </tr>)
      }
    </tbody> 
  </table>
</div>
    </div>
  );
};

export default MyBids;
