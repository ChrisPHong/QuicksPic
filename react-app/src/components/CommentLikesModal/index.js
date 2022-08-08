import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LikesDisplay from '../LikesDisplay';
// import './CommentDisplayModal.css'
import CommentDisplayLikesPage from '../CommentLikesDisplay'

function CommentDisplayModal({likes}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    {likes.length == 1 ?
      <button className='LikeModal-Button' onClick={() => setShowModal(true)}>like</button>
    :
      <button className='LikeModal-Button' onClick={() => setShowModal(true)}>likes</button>
    }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentDisplayLikesPage likes={likes} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CommentDisplayModal;
