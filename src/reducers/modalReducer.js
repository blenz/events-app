import { MODAL_OPEN, MODAL_CLOSE } from '../actions/modalActions';

const modalReducer = (state = null, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps
      };
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
