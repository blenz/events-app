import { MODAL_OPEN, MODAL_CLOSE } from '../actions/modalActions';

const modalReducer = (state = null, { type, payload }) => {
  switch (type) {
    case MODAL_OPEN:
      return {
        modalType: payload.modalType,
        modalProps: payload.modalProps
      };
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
