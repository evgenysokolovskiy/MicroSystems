import { combineReducers } from 'redux'
import fetchReducer from './fetchReducer'
import fetchCheckForGeneralUseReducer from './fetchCheckForGeneralUseReducer'
import fetchCheckForAntdReducer from './fetchCheckForAntdReducer'
import fetchSchemeReducer from './fetchSchemeReducer'
import targetMenuReducer from './targetMenuReducer'
import targetInnReducer from './targetInnReducer'
import drawerReducer from './drawerReducer'

export default combineReducers({
    fetchReducer,
    fetchCheckForGeneralUseReducer,
    fetchCheckForAntdReducer,
    fetchSchemeReducer,
    targetMenuReducer,
    targetInnReducer,
    drawerReducer
})
