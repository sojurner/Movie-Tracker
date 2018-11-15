import React from 'react';
import Modal from 'react-responsive-modal';

import './TrailerModal.css';

export const TrailerModal = ({ displayModal, trailer, onCloseModal }) => {
  return (
    <Modal open={displayModal} center onClose={onCloseModal}>
      <iframe
        className="modal-trailer"
        title="modal-trailer"
        src={trailer}
        width="800"
        height="500"
      />
    </Modal>
  );
};
