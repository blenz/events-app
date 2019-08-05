export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export const openModal = (modalType, modalProps) => {
  return {
    type: MODAL_OPEN,
    payload: {
      modalType,
      modalProps
    }
  };
};

export const closeModal = (modalType, modalProps) => {
  return {
    type: MODAL_CLOSE,
    payload: {
      test: 'casc'
    }
  };
};
