import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

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
  const handleRemoveBid = (id)=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){
    fetch(`http://localhost:3000/bids/${id}`,{
      method: 'DELETE'
    })
    .then(res=> res.json())
    .then(data => {
      console.log('bid after delete', data);
      setBids((prevBids)=>prevBids.filter(bid=> bid._id !== id))
      // show alert
         Swal.fire({
    title: "Deleted!",
    text: "Your bid has been deleted.",
    icon: "success"
  });
  
    })
    .catch(error =>{
      console.log('delete bid error', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the bid. Please try again.",
        icon: "error"
      })
    })
  }
  
});
  }
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
        <th>Status</th>
        <th>Actions</th>
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
        <td  > <span className="badge badge-warning badge-sm rounded-full">
    {bid.status}
  </span></td>
        <th >
         <div >
           <button onClick={()=>handleRemoveBid(bid._id)} className="btn  btn-outline btn-warning btn-xs">Remove Bid</button>
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
