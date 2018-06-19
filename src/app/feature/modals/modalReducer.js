import {MODAL_CLOSE, MODAL_OPEN} from './modalConstants'

const initialState = null

export const modalReducer = (state = initialState, action) => {
  switch(action.type) {
    case MODAL_OPEN:
      return {
        action.payload.modalType,
        action.payload.modalProps
      }
    case MODAL_CLOSE:
      return null
    default:
      return state
  }
}

export default modalReducer