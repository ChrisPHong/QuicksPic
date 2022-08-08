import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LikesDisplay from '../LikesDisplay';
import './LikesDisplayModal.css'

function LikesDisplayModal({likes}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {likes?.length == 1 ?
      <button className='LikeModal-Button' onClick={() => setShowModal(true)}>like</button>
    :
      <button className='LikeModal-Button' onClick={() => setShowModal(true)}>likes</button>
    }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LikesDisplay likes={likes} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default LikesDisplayModal;
