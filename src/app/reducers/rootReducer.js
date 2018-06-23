import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import {reducer as toastrReducer} from 'react-redux-toastr'
import testReducer from '../feature/testarea/testReducer'
import eventReducer from './../feature/event/eventReducer'
import modalReducer from './../feature/modals/modalReducer'
import authReducer from './../feature/auth/authReducer'
import asyncReducer from './../feature/async/asyncReducer'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: formReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer
})

export default rootReducer