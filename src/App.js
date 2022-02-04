import { useState } from 'react';
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './components/imageGallery/ImageGallery';

import Searchbar from './components/searchbar/Searchbar';

export default function App() {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = name => {
    setImageName(name);
  };

  return (
    <>
      <div className={s.container}>
        <Searchbar onSubmitForm={handleFormSubmit} />
        <ImageGallery imageName={imageName} />
        <ToastContainer autoClose={3000} />
      </div>
    </>
  );
}
