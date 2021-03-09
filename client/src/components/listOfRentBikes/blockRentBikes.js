import React from 'react'
import {Button} from "react-bootstrap";
import axios from "axios";


let ownRound = function (num, decimalPlaces) {
  let d = decimalPlaces || 0;
  let m = Math.pow(10, d);
  let n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
  let i = Math.floor(n),
    f = n - i;
  let e = 1e-8; // Allow for rounding errors in f
  let r = (f > 0.5 - e && f < 0.5 + e) ?
    ((i % 2 == 0) ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
};

const BlockRentBikes = ({rentBikes}) => {

  const handleUnrent = async(id)=>{
    const isSure = window.confirm("Are you sure that you want to cancel rent")
    if(isSure) {
      await axios.put("/api/unrentBike", {id: id}).catch(err => alert(err.response.data.message))
      window.location.reload(false)
    }
  }

  const ListOfRentBikes = () => {
    //console.log(rentBikes)
    return rentBikes.map(bike => {
      return (
        <div className='row my-3 p-4 bg-light rounded' key={bike._id}>
          <div className='col-md d-flex flex-column justify-content-center'>
            <p className='lead m-0 p-0'>{`${bike.name} | ${bike.type} | ($${bike.price} * ${bike.rent_hours}h) = $${ownRound(bike.price*bike.rent_hours, 3)} ${bike.rent_hours > 20 ? "- 50% = $"+ownRound((bike.price*bike.rent_hours)/2, 3) : ""}`}</p>
          </div>
          <div className='col-lg-2'>
            <div className='row'>
              {/*<div className='col-lg mx-3'></div>*/}
              <Button variant='danger' className='col mx-3' onClick={() => handleUnrent(bike._id)}>Cancel rent</Button>
            </div>
          </div>
        </div>
      )
    })
  }
  let sum = 0
  rentBikes.forEach(bike => bike.rent_hours > 20 ? sum+=(bike.price*bike.rent_hours)/2 : sum+=(bike.price*bike.rent_hours))
    return (
      <div className="listOfRentBikes">
        <div>
          <h4>🤩Your rent({rentBikes.length})(Total: ${ownRound(sum, 3)})</h4>
        </div>
        <div>
          <ListOfRentBikes/>
        </div>
      </div>
    )
}

export default BlockRentBikes