import {SubmissionError} from 'redux-form'
import {LOGIN_USER, SIGN_OUT_USER} from './authConstants'
import {closeModal} from './../modals/modalActions'

export const loginUser = (creds) => {
  return async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()

    try {
      await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
      dispatch(closeModal())
    } catch(error) {
      console.log(error)
      throw new SubmissionError({
        _error: "Invalid login information"//error.message
      })
    }
  }
}

export const signOutUser = () => {
  return {
    type: SIGN_OUT_USER
  }
}