import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getuserPhotos } from '../../store/user'
import EditPhotoForm from '../EditPhotoForm';
import CommentsPage from '../Comments'
import CommentFormPage from '../CommentForm';
import PhotoLikesForm from '../PhotoLikesForm'
import './UserProfilePage.css';



function UserProfilePage() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const statePhotos = useSelector((state) => state.user.entries);
    const photos = Object.values(statePhotos)
    const userInformation = useSelector((state) => state.session);
    const userId = useSelector((state) => state.session.user.id);
    const id = useParams()?.userId


    useEffect(() => {
        dispatch(getuserPhotos(parseInt(id)))
    }, [dispatch])



    return (
        <div className='ProfilePicturePhotos'>
           <div className='Entire-Photo-Container'>

            {photos.map(photo => {
                return (

                    <div>
                    <div>
                        <figure className='photos-profile-page' style={{backgroundImage: `url(${photo.image})`}} />
                         {/* <img src={photo.image}/> */}
                    </div>

                </div>
                    )
                })}
                </div>
        </div>

    )
}


export default UserProfilePage;
