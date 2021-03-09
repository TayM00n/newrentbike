import {loadBikes} from "../../store/actions";
import BlockNewBike from './blockNewBike'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        rentBikes: state.loadBikes.rentBikes,
        availableBikes: state.loadBikes.availableBikes
    }
}


const mapDispatchToProps = (dispatch) => ({
    loadBikes: (bikes) => {
        dispatch(loadBikes(bikes))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BlockNewBike)

