import NewBike from "./components/createNewBike/NewBike";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import RentBikes from "./components/listOfRentBikes/RentBikes";
import AvailableBikes from "./components/listOfAvailableBikes/AvailableBikes";
import {useEffect} from "react";
import {loadBikes} from "./store/actions";
import axios from "axios";



function App({dispatch}) {

  const fetchData = async() => {
    try{
      const res = await axios("/api/bikes").catch(err => alert(err.response.data.message))
      const data = await res.data.bikes
      dispatch(loadBikes(data))
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=> {
    fetchData()
  })

  return (
    <div className="App">
      <div>
        <h1 >Awesome Bike Rental</h1>
      </div>
        <NewBike/>
        <RentBikes/>
        <AvailableBikes/>
    </div>
  );
}

export default App;
