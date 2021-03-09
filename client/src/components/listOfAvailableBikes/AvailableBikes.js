import BlockAvailableBikes from './blockAvailableBikes'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    availableBikes: state.loadBikes.availableBikes
  }
}

export default connect(mapStateToProps)(BlockAvailableBikes)

