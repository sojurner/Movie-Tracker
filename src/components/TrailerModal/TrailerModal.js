import React from 'react';
import Modal from 'react-responsive-modal';

import './TrailerModal.css';

export const TrailerModal = ({
  displayModal,
  trailer,
  onCloseModal,
  error
}) => {
  return (
    <Modal open={displayModal} center onClose={onCloseModal}>
      {trailer && (
        <iframe
          className="modal-trailer"
          title="modal-trailer"
          src={trailer}
          width="1200"
          height="800"
        />
      )}
      {error && (
        <div className="error-modal">
          <h1 className="error-msg">{error}</h1>
          <i className="far fa-frown" />
        </div>
      )}
    </Modal>
  );
};
