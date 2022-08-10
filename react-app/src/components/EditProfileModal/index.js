import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import {useSelector} from 'react-redux'
import bulletPoints from './bulletPoints.png'
import EditProfileForm from '../ProfileTopEditForm';



function EditProfileModal({ userInfo }) {
    const [showModal, setShowModal] = useState(false);
    let userId = useSelector((state) => state.session?.user?.id)

    return (
        <>
            {userId === userInfo?.id ?
                <>
                    <button className='PhotoFormButton' onClick={() => setShowModal(true)}><img className='bullet-points-img' src={bulletPoints} alt='edit-delete-options' /></button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <EditProfileForm userInfo={userInfo} setShowModal={setShowModal} />
                        </Modal>
                    )}
                </>
                : null}
        </>
    );
}

export default EditProfileModal;
