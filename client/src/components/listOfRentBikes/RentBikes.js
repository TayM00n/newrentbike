import BlockRentBikes from './blockRentBikes'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    rentBikes: state.loadBikes.rentBikes
  }
}

export default connect(mapStateToProps)(BlockRentBikes)

