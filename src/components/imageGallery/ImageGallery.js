import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../imageGalleryItem/ImageGalleryItem';
import Button from '../button/Button';
import Loader from '../loader/Loader';
import fetchImage from '../services/fetchImage';

export default function ImageGallery({ imageName }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [hits, setHits] = useState([]);

  useEffect(() => {
    if (imageName) {
      setStatus('pending');
      setPage(1);

      fetchImage(imageName, 1)
        .then(images => {
          if (images.hits.length === 0) {
            setImages([]);
            setHits(images.hits);
            setStatus('resolved');
            return toast.error('No data on this request!');
          }
          setImages(images.hits);
          setHits(images.hits);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
      scrollPage();
    }
  }, [imageName]);

  useEffect(() => {
    if (page > 1) {
      setStatus('pending');

      fetchImage(imageName, page)
        .then(imgs => {
          if (imgs.hits.length === 0) {
            setImages([]);
            setStatus('resolved');
            return toast.error('No data on this request!');
          }
          setImages(() => [...images, ...imgs.hits]);
          setHits(imgs.hits);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
      scrollPage();
    }
  }, [page]);

  const scrollPage = () => {
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight + 5000,
        behavior: 'smooth',
      });
    }, 500);
  };

  const onClickMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      {status === 'idle' && <></>}
      {status === 'rejected' && <h2>{error.message}</h2>}
      {(status === 'resolved' || status === 'pending') && (
        <ul className={s.ImageGallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              imageURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              alt={image.tags}
            />
          ))}
        </ul>
      )}

      {status === 'pending' && <Loader />}
      {hits.length === 12 && <Button onClickMore={onClickMore} />}
    </>
  );
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
