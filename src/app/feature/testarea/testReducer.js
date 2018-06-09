import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./TestConstants";
import { createReducer } from './../../common/util/reducerUtil'

const initialState = {
  data: 2
}

export const incrementCounter = (state, payload) => {
  return {
    ...state,
    data: state.data + 1
  }
}

export const decrementCounter = (state, payload) => {
  return {
    ...state,
    data: state.data - 1
  }
}

const testReducer = (state=initialState, action) => {
  switch(action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + 1
      }
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - 1
      }
    default:
      return state
  }
}

export default testReducer