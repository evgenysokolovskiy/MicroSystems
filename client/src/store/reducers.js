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
import techTypesReducer from './tech/reducers/techTypesReducer'
import techCardsReducer from './tech/reducers/techCardsReducer'
import techJoinTechnologyFactReducer from './tech/reducers/techJoinTechnologyFactReducer'
import techDiameterReducer from './tech/reducers/techDiameterReducer'
import techInconstancyDimensionReducer from './tech/reducers/techInconstancyDimensionReducer'
import techPressureSpeedReducer from './tech/reducers/techPressureSpeedReducer'
import techQualityProductionReducer from './tech/reducers/techQualityProductionReducer'
import techMtimeReducer from './tech/reducers/techMtimeReducer'
import techTargetMenuReducer from './tech/reducers/techTargetMenuReducer'
import techTargetTimeStampReducer from './tech/reducers/techTargetTimeStampReducer'
import techTargetTimeStampDataReducer from './tech/reducers/techTargetTimeStampDataReducer'
import techDrawerReducer from './tech/reducers/techDrawerReducer'
import techTypeReducer from './tech/reducers/techTypeReducer'
import techCardNumberReducer from './tech/reducers/techCardNumberReducer'
// laboratory
import labPercentReducer from './laboratory/reducers/labPercentReducer'
import labAmountReducer from './laboratory/reducers/labAmountReducer'
import labSourceReducer from './laboratory/reducers/labSourceReducer'
import labTargetMenuReducer from './laboratory/reducers/labTargetMenuReducer'
import labParamReducer from './laboratory/reducers/labParamReducer'
import labPropReducer from './laboratory/reducers/labPropReducer'

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
    techTypesReducer,
    techCardsReducer,
    techJoinTechnologyFactReducer,
    techDiameterReducer,
    techInconstancyDimensionReducer,
    techPressureSpeedReducer,
    techQualityProductionReducer,
    techMtimeReducer,
    techTargetMenuReducer,
    techTargetTimeStampReducer,
    techTargetTimeStampDataReducer,
    techDrawerReducer,
    techTypeReducer,
    techCardNumberReducer,
    //laboratory
    labPercentReducer,
    labAmountReducer,
    labSourceReducer,
    labTargetMenuReducer,
    labParamReducer,
    labPropReducer
})
