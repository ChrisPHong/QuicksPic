import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPhotos, deletePhoto } from '../../store/photo'
import './EditPhotoForm.css';
import bulletPoints from './bulletPoints.png'

function EditPhotoForm({ photo }) {
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(true);
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(photo.image)
    const [likes, setLikes] = useState(photo.photo_users)
    const [imageLoading, setImageLoading] = useState(false)
    const [display, setDisplay] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const dispatch = useDispatch();
    
    let userId = useSelector((state) => state.session?.user?.id)
    const id = photo.id



    useEffect(() => {
        const error = [];
        if (caption.length > 2200) error.push('Caption length must be less than 2,2000 characters')
        if (caption.length < 1) error.push('You must have at least 1 character in the caption field')
        if (!caption.replace(/\s/g, '').length) {
            error.push('Please provide a caption that does not only contain spaces');
        }
        if (image === null) error.push('You must upload an image in the format of png or jpg')

        setErrors(error)
    }, [caption, image])


    const onSubmit = async (e) => {
        e.preventDefault();

        if (errors.length > 0) {
            setShow(true)
            return
        }
        if (errors.length === 0) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("user_id", userId)
            formData.append("caption", caption)
            formData.append("photo_users", likes)
            formData.append("id", id)

            dispatch(editPhotos(formData, id))
            showEditForm()
            setShow(false)


        }

    }


    const deleteFunction = async (photoId) => {
        await dispatch(deletePhoto(photoId))
        await setDeleted(!deleted)
        await showEditForm()
    }

    useEffect(() => {
        setCaption(photo.caption)
    }, [deleted])


    const showEditForm = () => {
        if (display === false) {
            return setDisplay(true)
        }
        if (display === true) {
            return setDisplay(false)
        }
    }


    return (
        <>
            {userId === photo.userId ?

                <div className='PhotoFormDiv'>
                    <div className='ButtonToDisplay'>
                        <button className='bullet-points-button'>
                            <img className='bullet-points-img' src={bulletPoints} alt='edit-delete-options' onClick={showEditForm} />
                        </button>
                    </div>
                    {display ?
                    <>
                        <form className='photoform' onSubmit={onSubmit}>
                            <h4>Edit Photo</h4>
                            {show ?

                                errors.length > 0 ?
                                    <>
                                        <h4>Please Fix These Errors:</h4>
                                        <ul className='errorsArray'>{errors.map(error => {
                                            return (
                                                <>
                                                    <li className='EditPhotoFormErrorItem'
                                                        key={error}>{error}</li>
                                                </>
                                            )
                                        })}
                                        </ul>
                                    </>
                                    : null

                                : null}
                            <input
                                name="caption"
                                type='text'
                                className='input-values'
                                required
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder='Caption' />

                            <button className='Submit-Button' type='submit'>Submit</button>
                        </form>
                        <div className='Delete-Button-Container'>
                        <button className='Delete-Button'
                            onClick={async (e) => {
                                e.preventDefault()
                                let photoId = photo.id
                                await deleteFunction(photoId)


                            }}

                        >Delete</button>
                    </div>
                    </>
                        : null}

                </div>
                : null}
        </>
    )
}

export default EditPhotoForm;
