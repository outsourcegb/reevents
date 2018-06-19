import {MODAL_CLOSE, MODAL_OPEN} from './modalConstants'

export const openModal = (modalType, modalProps) => {
  return {
    type: MODAL_OPEN,
    payload: {
      modalType,
      modalProps
    }
  }
}

export const closeModal = (modalType) => {
  return {
    type: MODAL_CLOSE
  }
}