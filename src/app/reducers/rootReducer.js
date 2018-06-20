import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import testReducer from '../feature/testarea/testReducer'
import eventReducer from './../feature/event/eventReducer'
import modalReducer from './../feature/modals/modalReducer'
import authReducer from './../feature/auth/authReducer'

const rootReducer = combineReducers({
  form: formReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer
})

export default rootReducer