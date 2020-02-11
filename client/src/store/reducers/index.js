import { combineReducers } from 'redux'
import fetchReducer from './fetchReducer'
import fetchCheckReducer from './fetchCheckReducer'
import fetchSchemeReducer from './fetchSchemeReducer'
import targetMenuReducer from './targetMenuReducer'
import targetInnReducer from './targetInnReducer'
import drawerReducer from './drawerReducer'

export default combineReducers({
    fetchReducer,
    fetchCheckReducer,
    fetchSchemeReducer,
    targetMenuReducer,
    targetInnReducer,
    drawerReducer
})
