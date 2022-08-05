import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PhotoForm from '../Photoform';
import createPost from './createPost.png'


function PhotoFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='PhotoFormButton' onClick={() => setShowModal(true)}><img className='photo-Form-logo' alt='logo-quicksPic' src={createPost} /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PhotoForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default PhotoFormModal;
