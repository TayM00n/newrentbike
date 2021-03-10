import React from 'react'
import {Form, Button} from "react-bootstrap";
import {useState} from 'react'
import axios from "axios";


const BlockNewBike = ()=>{
  const listBikeType = [
    "Mountain",
    "Hybrid/Comfort",
    "Road",
    "Triathlon/Time Trial",
    "BMX/Trick",
    "Commuting",
    "Cyclocross",
    "Track Bike/Fixed Gear",
    "Tandem",
    "Adult Trike",
    "Folding",
    "Kids",
    "Beach Cruiser",
    "Recumbent",
    "Custom"]

  const initState = {
    name: "",
    type: "Custom",
    price: 1,
  }

  const [state, setState] = useState(initState)

  const handleOnSubmit = async () => {
    await axios.post("/api/createNewBike", {...state}).then(()=>window.location.reload(false)).catch(err =>alert(err.response.data.message))
  }

  return(
    <div className='createNewBlock'>
      <div>
        <h4>🤑Create new bike</h4>
      </div>
      <div className='content '>
        <Form className="formContainer row rounded my-3 p-4">
          <Form.Group className="col-md">
            <Form.Label htmlFor="bikeName">Bike Name</Form.Label>
            <Form.Control
              id="bikeName"
              type="text"
              placeholder="Name"
              value = {state.name}
              onChange={(e) => setState({...state, name: e.target.value})}/>
          </Form.Group>
          <Form.Group className="col-md">
            <Form.Label htmlFor='bikeType'>Bike Type</Form.Label>
            <Form.Control
              id="bikeType"
              as='select'
              onChange={(e) => setState({...state, type: e.target.value})}>
              {listBikeType.map((item, index) => <option key={index}>{item}</option>)}
            </Form.Control>
          </Form.Group>
          <Form.Group className="col-lg-2">
            <Form.Label htmlFor='bikePrice'>Rent Price</Form.Label>
            <Form.Control
              id='bikePrice'
              type="number"
              placeholder="0.0$"
              min="1"
              value={state.price}
              onChange={(e) => setState({...state, price: e.target.value})}/>
          </Form.Group>
          <Form.Group className="d-flex flex-column justify-content-end col-lg-2">
            <Button variant="success" onClick={handleOnSubmit}>Create</Button>
          </Form.Group>
        </Form>
      </div>

    </div>
  )
}

export default BlockNewBike
