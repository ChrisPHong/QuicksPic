import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PhotoForm from '../Photoform';
import EditPhotoForm from '../EditPhotoForm'
import { useSelector } from 'react-redux'
import bulletPoints from './bulletPoints.png'
import EditCommentsPage from '../EditCommentForm'




function EditCommentFormModal({ photo, comment, photoId }) {
    const [showModal, setShowModal] = useState(false);
    let userId = useSelector((state) => state.session?.user?.id)


    return (
        <>
            {userId === comment.userId ?
                <>
                    <button className='PhotoFormButton' onClick={() => setShowModal(true)}><img className='bullet-points-img' src={bulletPoints} alt='edit-delete-options' /></button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <EditCommentsPage photo={photo} comment={comment} photoId={photoId} setShowModal={setShowModal} />
                        </Modal>
                    )}
                </>
                : null}
        </>
    );
}

export default EditCommentFormModal;
