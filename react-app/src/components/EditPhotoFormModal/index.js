import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PhotoForm from '../Photoform';
import EditPhotoForm from '../EditPhotoForm'
import {useSelector} from 'react-redux'
import bulletPoints from './bulletPoints.png'




function EditPhotoFormModal({ photo }) {
    const [showModal, setShowModal] = useState(false);
    let userId = useSelector((state) => state.session?.user?.id)


    return (
        <>
            {userId === photo.userId ?
                <>
                    <button className='PhotoFormButton' onClick={() => setShowModal(true)}><img className='bullet-points-img' src={bulletPoints} alt='edit-delete-options' /></button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <EditPhotoForm photo={photo} setShowModal={setShowModal} />
                        </Modal>
                    )}
                </>
                : null}
        </>
    );
}

export default EditPhotoFormModal;
