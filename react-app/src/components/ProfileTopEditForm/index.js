import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileTopEditForm.css';
import { useParams } from 'react-router-dom'
import { patchUserProfile, getFollowerUsers } from '../../store/user'


function EditProfileForm({ userInfo, setShowModal }) {
    const [errors, setErrors] = useState([]);
    const [show, setShow] = useState(true);
    const [bio, setBio] = useState('')
    const [website, setWebsite] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [imageLoading, setImageLoading] = useState(false)

    const dispatch = useDispatch();
    const profileId = Number(useParams()['userId'])
    let userId = useSelector((state) => state.session?.user?.id)


    useEffect(() => {
        dispatch(getFollowerUsers())
        setBio(userInfo?.bio)
        setWebsite(userInfo?.website)
        setName(userInfo?.name)

    }, [dispatch, userInfo])

    useEffect(() => {
        const error = [];
        if (website?.length > 2200) error.push('Website length must be less than 2,2000 characters')
        if (bio?.length > 150) error.push('150 character max limit')
        setErrors(error)
    }, [website, name, image, bio])

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file)

    }

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
            formData.append("bio", bio)
            formData.append("website", website)
            formData.append("name", name)
            // formData.append("userId", userId)
            console.log(formData, "<<<<<<<<<<<<<<< FORM DATA IN THE COMPO")

            // await dispatch(editPhotos(formData, id))
            await dispatch(patchUserProfile(formData, userId))
            await dispatch(getFollowerUsers())
            await setShowModal(false)

            setShow(false)


        }

    }

    // useEffect(() => {
    // }, [])

    return (
        <>
            {profileId == userId ?

                <div className='ProfileEditDiv'>
                    <div className='ButtonToDisplay'>
                    </div>

                    <>
                        <form className='editProfileForm' onSubmit={onSubmit}>
                            <h4 className='Edit-Profile-tag'>Edit Profile</h4>
                            {show ?

                                errors.length > 0 ?
                                    <>
                                        <h4>Please Fix These Errors:</h4>
                                        <ul className='errorsArray'>{errors.map((error, idx)=> {
                                            return (
                                                <>
                                                    <div key={idx}>

                                                        <li className='EditPhotoFormErrorItem'
                                                            key={error}>{error}</li>
                                                    </div>
                                                </>
                                            )
                                        })}
                                        </ul>
                                    </>
                                    : null

                                : null}
                            <div className='input-values-container-profile-edit'>
                                <div className='label-input-edit-profile-container'>

                                    <label className='label-profile-edit'>Website</label>
                                    <input
                                        name="website"
                                        type='text'
                                        className='input-values-profile'
                                        required
                                        value={website}
                                        onChange={(e) => setWebsite(e.target.value)}
                                        placeholder='Website' />
                                </div>
                                <div className='label-input-edit-profile-container'>
                                    <label className='label-profile-edit'>
                                        Bio
                                    </label>

                                    <input
                                        name="bio"
                                        type='text'
                                        className='input-values-profile'
                                        required
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder='Bio' />
                                </div>
                                <div className='label-input-edit-profile-container'>

                                    <label className='label-profile-edit'>Name</label>
                                    <input
                                        name="name"
                                        type='text'
                                        className='input-values-profile'
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Name' />
                                </div>

                            </div>

                            <div className='label-input-edit-profile-container'>
                                <label className='label-profile-edit'>Image</label>
                                <input
                                    className='file-input-value-form'
                                    name="image"
                                    type="file"
                                    accept="image/png, image/jpg, image/gif, image/jpeg"
                                    onChange={updateImage}

                                />

                            </div>
                            <button className='Submit-Button-EditForm' type='submit'>Submit</button>
                        </form>
                    </>

                </div>
                : null}
        </>
    )

}
export default EditProfileForm;
