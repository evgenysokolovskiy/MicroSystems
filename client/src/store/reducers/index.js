import { combineReducers } from 'redux'
import fetchReducer from './fetchReducer'
import fetchCheckReducer from './fetchCheckReducer'
import targetMenuReducer from './targetMenuReducer'
import targetInnReducer from './targetInnReducer'
import loadingReducer from './loadingReducer'
import drawerReducer from './drawerReducer'

export default combineReducers({
    fetchReducer,
    fetchCheckReducer,
    targetMenuReducer,
    targetInnReducer,
    loadingReducer,
    drawerReducer
})
