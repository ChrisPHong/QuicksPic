import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postPhotos} from '../../store/photo'
import './EditPhotoform.css';

function EditPhotoForm() {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)

    const dispatch = useDispatch();

    let userId = useSelector((state) => state.session?.user?.id)
    console.log(userId, "<<<<<<<<<<< USER ID >>>>>>>>>>>>")


    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("user_id", userId)
        formData.append("caption", caption)
        if (errors.length > 0) {
            setShow(true)
            return
        }
        if (errors.length === 0) {
            const payload = {
                userId,
                caption,
                image
            }
            dispatch(postPhotos(formData))
            // console.log(payload, "<<<<<<<<<<<<<< form Data >>>>>>>>>>>>")
            console.log(formData, "<<<<<<<<<<<<<< form Data >>>>>>>>>>>>")
            setCaption('')
            setImage(null)
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
                <h2>Post Your Photos!</h2>
                <input
                    name="caption"
                    type='text'
                    required
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder='Caption' />

                <input
                name="image"
                type="file"
                accept="image/*"
                onChange={updateImage}

                />
                <button type='submit'>Submit</button>
            </form>

        </div>
    )
}

export default EditPhotoForm;
