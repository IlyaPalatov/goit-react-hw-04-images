import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Spinner from './Spinner';
import { fetchImages } from './api';

import '../styles.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(false);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImagesFromApi = async () => {
      setIsLoading(true);

      try {
        const data = await fetchImages(searchQuery, page);
        const hasMore = data.length >= 12;

        setImages(prevImages => [...prevImages, ...data]);
        setIsLoading(false);
        setHasMoreImages(hasMore);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchImagesFromApi();
  }, [searchQuery, page]);

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Spinner />}
      {hasMoreImages && <Button onClick={handleLoadMore} />}
      {selectedImage && <Modal image={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
