import { combineReducers } from 'redux'
import fetchReducer from './fetchReducer'
import fetchCheckForGeneralUseReducer from './fetchCheckForGeneralUseReducer'
import fetchCheckReducer from './fetchCheckReducer'
import fetchSchemeReducer from './fetchSchemeReducer'
import targetMenuReducer from './targetMenuReducer'
import targetInnReducer from './targetInnReducer'
import drawerReducer from './drawerReducer'

export default combineReducers({
    fetchReducer,
    fetchCheckForGeneralUseReducer,
    fetchCheckReducer,
    fetchSchemeReducer,
    targetMenuReducer,
    targetInnReducer,
    drawerReducer
})
