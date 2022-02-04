import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, imgURL, tags }) {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModalKeydown);
    return () => {
      window.removeEventListener('keydown', handleCloseModalKeydown);
    };
  });

  const handleCloseModalKeydown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleCloseModalOnClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleCloseModalOnClick}>
      <div className={s.modal}>
        <img className={s.img} src={imgURL} alt={tags} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imgURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
