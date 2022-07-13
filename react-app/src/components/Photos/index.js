import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getPhotos, deletePhoto } from '../../store/photo'
import EditPhotoForm from '../EditPhotoForm';
import CommentsPage from '../Comments'
import CommentFormPage from '../CommentForm';
import PhotoLikesForm from '../PhotoLikesForm'
import bulletPoints from './bulletPoints.png'
import PhotoDisplay from '../PhotoDisplay';
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
                            <PhotoDisplay photo={photo} />
                        </div>
                    </div>
                )
            })}
        </div>

    )
}


export default PhotosPage;
