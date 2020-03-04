import { combineReducers } from 'redux'
// repair
import fetchReducer from './repair/reducers/fetchReducer'
import fetchCheckForGeneralUseReducer from './repair/reducers/fetchCheckForGeneralUseReducer'
import fetchCheckForAntdReducer from './repair/reducers/fetchCheckForAntdReducer'
import fetchSchemeReducer from './repair/reducers/fetchSchemeReducer'
import targetMenuReducer from './repair/reducers/targetMenuReducer'
import targetInnReducer from './repair/reducers/targetInnReducer'
import drawerReducer from './repair/reducers/drawerReducer'
// tech
import techTechnologyReducer from './tech/reducers/techTechnologyReducer'
import techTargetMenuReducer from './tech/reducers/techTargetMenuReducer'
import techTargetTimeStampReducer from './tech/reducers/techTargetTimeStampReducer'
import techDrawerReducer from './tech/reducers/techDrawerReducer'
import techShpFactReducer from './tech/reducers/techShpFactReducer'
import techTypeReducer from './tech/reducers/techTypeReducer'

export default combineReducers({
    // repair
    fetchReducer,
    fetchCheckForGeneralUseReducer,
    fetchCheckForAntdReducer,
    fetchSchemeReducer,
    targetMenuReducer,
    targetInnReducer,
    drawerReducer,
    // tech
    techTechnologyReducer,
    techTargetMenuReducer,
    techTargetTimeStampReducer,
    techDrawerReducer,
    techShpFactReducer,
    techTypeReducer
})
