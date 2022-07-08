import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editPhotos} from '../../store/photo'
import './EditPhotoForm.css';

function EditPhotoForm({photo}) {
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const [caption, setCaption] = useState(photo.caption)
    const [image, setImage] = useState(photo.image)
    const [likes, setLikes] = useState(photo.photo_users)
    const [imageLoading, setImageLoading] = useState(false)

    const dispatch = useDispatch();

    let userId = useSelector((state) => state.session?.user?.id)
    const id = photo.id
    // console.log(photo, "<<<<<<<<<<<<<<< PHOTO IMAGE")




    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("user_id", userId)
        formData.append("caption", caption)
        formData.append("photo_users", likes)
        formData.append("id", id)

        if (errors.length > 0) {
            setShow(true)
            return
        }
        if (errors.length === 0) {
            const payload = {
                userId,
                caption,
                id
            }
            dispatch(editPhotos(formData, id))

        }

    }
    const updateImage = (e) =>{
        const file = e.target.files[0];
        setImage(file)

    }

    useEffect(() => {

    }, [onSubmit])

    return (
        <div className='PhotoFormDiv'>
            <form className='photoform' onSubmit={onSubmit}>
                <h2>Edit Your Photo</h2>
                <input
                    name="caption"
                    type='text'
                    required
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder='Caption' />

                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default EditPhotoForm;
