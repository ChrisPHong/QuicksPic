import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPhotos } from '../../store/photo'
import './Photoform.css';

function PhotoForm() {
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(false);
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)

    const dispatch = useDispatch();

    let userId = useSelector((state) => state.session?.user?.id)


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

            dispatch(postPhotos(formData))
            setCaption('')
            setImage(null)
            setShow(false)
        }

    }
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file)

    }

    useEffect(() => {
        const error = [];
        if (caption.length > 2200) error.push('Caption length must be less than 2,2000 characters')
        if (caption.length < 1) error.push('You must have at least 1 character in the caption field')
        if (image === null) error.push('You must upload an image in the format of png or jpg')
        if (!caption.replace(/\s/g, '').length) error.push('Please provide a caption that does not only contain spaces')
        setErrors(error)
    }, [caption, image])


    useEffect(() => {

    }, [onSubmit])

    return (
        <div className='PhotoFormDiv'>
            <form className='photoform' onSubmit={onSubmit}>

                <h2>Post Your Photos!</h2>
                {show ?

                    errors.length > 0 ?
                        <>
                            <h4>Please Fix These Errors:</h4>
                            <ul className='errorsArray'>{errors.map(error => {
                                return (
                                    <>
                                        <li className='PhotoFormErrorItem'
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

export default PhotoForm;
