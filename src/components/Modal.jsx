import React, { useEffect } from 'react';
import basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleImageClick = () => {
    const instance = basicLightbox.create(`<img src="${image.largeImageURL}" alt="${image.tags}" />`);
    instance.show();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal">
        <img src={image.webformatURL} alt={image.tags} onClick={handleImageClick} />
      </div>
    </div>
  );
};

export default Modal;
