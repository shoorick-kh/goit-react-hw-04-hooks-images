import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import Modal from '../modal/Modal';

export default function ImageGalleryItem({ imageURL, largeImageURL, alt }) {
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags, setTags] = useState('');

  const onClickImage = () => {
    setLargeImage(largeImageURL);
    setTags(alt);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItem__image}
          src={imageURL}
          alt={alt}
          onClick={onClickImage}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal} imgURL={largeImage} tags={tags} />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
