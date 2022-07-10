import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editPhotos } from '../../store/photo'
import './EditPhotoForm.css';

function EditPhotoForm({ photo }) {
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(true);
    const [caption, setCaption] = useState(photo.caption)
    const [image, setImage] = useState(photo.image)
    const [likes, setLikes] = useState(photo.photo_users)
    const [imageLoading, setImageLoading] = useState(false)

    const dispatch = useDispatch();

    let userId = useSelector((state) => state.session?.user?.id)
    const id = photo.id
    // console.log(photo, "<<<<<<<<<<<<<<< PHOTO IMAGE")




    useEffect(() => {
        const error = [];
        if (caption.length < 1) error.push('You must have at least 1 character in the caption field')
        if (!caption.replace(/\s/g, '').length) {error.push('Please provide a caption that does not only contain spaces');
          }
        // if (caption.trim() === ' ') error.push('Provide more than spaces in the caption field')
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
            setShow(false)


        }

    }
    // Debating if a user should update their picture or not
    // const updateImage = (e) =>{
    //     const file = e.target.files[0];
    //     setImage(file)

    // }


    useEffect(() => {

    }, [onSubmit])

    return (
        <div className='PhotoFormDiv'>
            <form className='photoform' onSubmit={onSubmit}>
                <h2>Edit Your Photo</h2>
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
