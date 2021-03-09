import {TYPES} from "../TYPES";

const initState = {
  rentBikes:[],
  availableBikes: []
}

const loadBikes = (state = initState, action) => {
  switch(action.type){
    case TYPES.LOAD_BIKES: {
      return{
        ...state,
        rentBikes: action.bikes.filter(item => item.isRent === true),
        availableBikes: action.bikes.filter(item => item.isRent !== true)
      }
    }

    default: {
      return state
    }
  }
}

export default loadBikes