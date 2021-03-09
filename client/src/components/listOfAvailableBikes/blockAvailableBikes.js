import React, {useState} from 'react'
import {Button, FormControl, FormLabel} from "react-bootstrap";
import axios from "axios";

const BlockAvailableBikes = ({availableBikes}) => {
  const isAvailable = (bikes, id) => bikes.filter(bike => bike._id === id).length > 0

  const handleRentBike = async (id, bikes) =>{
    if(bikes.length === 1 || !isAvailable(bikes, id)) {
      await axios.put("/api/rentBike", {id: id, rent_hours: bikes[0].rent_hours}).catch(err => alert(err.response.data.message))
    }else{
      for (const bike of bikes) {
        if (id === bike._id) {
          await axios.put("/api/rentBike", {id: bike._id, rent_hours: bike.rent_hours}).catch(err => alert(err.response.data.message))
        }
      }
    }
    window.location.reload(false)
  }

  const handleDeleteBike = async(id) => {
    const isSure = window.confirm("Are you sure that you want to delete this bike")
    if(isSure){
      await axios.delete("/api/deleteBike", {data: {id: id}}).catch(err => alert(err.response.data.message))
      window.location.reload(false)
    }


  }

  const ListOfAvailableBikes = () => {
    const [rentHours, setRentHours] = useState([{_id: 0, rent_hours: 1}])
    const handleRentTime = (curBikeId, e) => {
      rentHours.forEach(bike => {
        if(rentHours.length > 1)
          if(bike._id === curBikeId){
            bike.rent_hours = +e.target.value
          } else {
            if(bike._id !== 0 && !isAvailable(rentHours, curBikeId)) setRentHours([...rentHours, {_id: curBikeId, rent_hours: +e.target.value}])
          }
        else setRentHours([...rentHours, {_id: curBikeId, rent_hours: +e.target.value}])
      })

    }
    let HOURS = [];
    for(let i = 1; i <= 24; i++) HOURS.push(i)
    return availableBikes.map(bike => {
      return (
        <div className='row my-3 p-4 bg-light rounded' key={bike._id}>
          <div className='col-md-5 d-flex flex-column justify-content-center'>
            <p className='lead m-0 p-0'>{`${bike.name} | ${bike.type} | $${bike.price}`}</p>
          </div>
          <div className='col d-flex flex-column justify-content-center'>
            <div className='row p-2 border rounded my-1'>
              <FormLabel className='col my-auto'>Rent time</FormLabel>
              <FormControl as='select' className='col-lg my-auto' onChange={(e) => handleRentTime(bike._id, e)}>
                {HOURS.map((hour, index) => <option key={hour} value={hour}>{hour}</option>)}
              </FormControl>
            </div>
          </div>
          <div className='col-md-4 d-flex flex-column justify-content-center'>
            <div className='row'>
              <Button variant='primary' className='col mx-3' onClick={()=> handleRentBike(bike._id, [...rentHours])}>Rent</Button>
              <Button variant='danger' className='col mx-3' onClick={() => handleDeleteBike(bike._id)}>Delete</Button>
            </div>
          </div>
        </div>
      )
    })
  }

    return (
      <div className="listOfRentBikes">
        <div>
          <h4>🚲Available Bikes({availableBikes.length})</h4>
        </div>
        <div>
          <ListOfAvailableBikes />
        </div>
      </div>
    )
}

export default BlockAvailableBikes