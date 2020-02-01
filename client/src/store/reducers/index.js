import { combineReducers } from 'redux'
import fetchReducer from './fetchReducer'
import targetMenuReducer from './targetMenuReducer'
import drawerReducer from './drawerReducer'

export default combineReducers({
    fetchReducer,
    targetMenuReducer,
    drawerReducer
})
