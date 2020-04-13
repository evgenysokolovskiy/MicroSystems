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
import techJoinTechnologyFactReducer from './tech/reducers/techJoinTechnologyFactReducer'
import techQualityProductionReducer from './tech/reducers/techQualityProductionReducer'
import techIntervalReducer from './tech/reducers/techIntervalReducer'
import techTargetMenuReducer from './tech/reducers/techTargetMenuReducer'
import techTargetTimeStampReducer from './tech/reducers/techTargetTimeStampReducer'
import techTargetTimeStampDataReducer from './tech/reducers/techTargetTimeStampDataReducer'
import techDrawerReducer from './tech/reducers/techDrawerReducer'
import techTypeReducer from './tech/reducers/techTypeReducer'
import techCardNumberReducer from './tech/reducers/techCardNumberReducer'

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
    techJoinTechnologyFactReducer,
    techQualityProductionReducer,
    techIntervalReducer,
    techTargetMenuReducer,
    techTargetTimeStampReducer,
    techTargetTimeStampDataReducer,
    techDrawerReducer,
    techTypeReducer,
    techCardNumberReducer
})
