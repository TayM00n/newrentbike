import {TYPES} from '../TYPES'

export const loadBikes = (bikes) => ({
    type:TYPES.LOAD_BIKES,
    bikes
})