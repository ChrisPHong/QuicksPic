import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getPhotos, deletePhoto } from '../../store/photo'
import EditPhotoForm from '../EditPhotoForm';
import CommentsPage from '../Comments'
import CommentFormPage from '../CommentForm';
import PhotoLikesForm from '../PhotoLikesForm'
import bulletPoints from './bulletPoints.png'
import './Photos.css';



function PhotosPage() {
    const dispatch = useDispatch();
    // const state = useSelector((state) => state);
    const photoState = useSelector((state) => Object.values(state.photos));
    const allPhotos = Object.values(photoState[0])
    const currentUsername = useSelector((state) => state.session.user.username);
    const userId = useSelector((state) => state.session.user.id);
    const [show, setShow] = useState(false)
    const [caption, setCaption] = useState('')
    const [likes, setLikes] = useState(0)
    const history = useHistory()

    useEffect(() => {
        dispatch(getPhotos(userId))
    }, [dispatch])

    useEffect(() => {

    }, [caption])

    const showEditDeleteForm = () => {
        if (show === false) {
            return setShow(true)
        }
        if (show === true) {
            return setShow(false)
        }
    }

    return (
        <div className='entire-news-feed'>
            {allPhotos.map((photo) => {
                return (
                    <div className='photo-container'>
                        <div className='FullImageContainer'>

                            <div className='post-title-edit-deleteform'>
                                <h2>{photo.username.username}</h2>
                                {photo.userId === userId ?
                                    <div className='Edit-Delete-Photo-Container'>
                                        <button className='bullet-points-button'>
                                            <img className='bullet-points-img' src={bulletPoints} alt='edit-delete-options' onClick={showEditDeleteForm} />
                                        </button>
                                    </div>
                                    : null}
                                {show ?
                                    <div>
                                        {
                                            photo.userId === userId ?
                                                <div>
                                                    <EditPhotoForm photo={photo} />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault()

                                                            let photoId = photo.id
                                                            dispatch(deletePhoto(photoId))


                                                        }}

                                                    >Delete</button>
                                                </div>
                                                : null
                                        }
                                    </div>
                                    : null}
                            </div>
                            <div className='like-and-caption-div'>
                                <img
                                    className='picture-div'
                                    src={photo.image} />

                                <PhotoLikesForm photo={photo} />
                                {photo.photo_users !== 1 ?
                                    <span>{photo.photo_users} likes</span>
                                    : <span>
                                        {photo.photo_users} like
                                    </span>
                                }

                                <span
                                    onChange={(e) => {
                                        setCaption(e.target.value)
                                    }}>{photo.username.username} {photo.caption}</span>
                            </div>
                        </div>
                        <div className='comments-all-div'>
                            {<CommentsPage photo={photo.id} />}
                        </div>
                        <div className='comments-form-div'>
                            {<CommentFormPage photoId={photo.id} />}
                        </div>
                        <p>{photo.createdAt}</p>
                    </div>

                )
            })}
        </div>

    )
}


export default PhotosPage;
