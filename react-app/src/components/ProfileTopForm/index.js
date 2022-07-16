import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getuserPhotos } from '../../store/user'
import EditPhotoForm from '../EditPhotoForm';
import CommentsPage from '../Comments'
import CommentFormPage from '../CommentForm';
import PhotoLikesForm from '../PhotoLikesForm'
import './ProfileTopForm.css';



function ProfileTopPortion() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userInfo = useSelector((state) => state?.user?.info);
    const userInformation = Object.values(userInfo)[0];
    const statePhotos = useSelector((state) => state.user.entries);
    const photos = Object.values(statePhotos)
    const userName = useSelector((state) => state.session.user.username);


    return (
        <div className='Entire-Container'>

            <div className='Entire-Container-profile-top'>

                <div className='profilePicture-profilePage'>
                    <img src='' />
                    Profile PIcture
                </div>
                <div className='User-information-Entire-Container'>
                    <div className='username-container'>{userInformation?.username}</div>
                    <div className='posts-followers-following-div'>
                        <div>
                            <div className='posts'>{photos.length} posts</div>
                        </div>
                        <div className='followers'>
                            <div>{userInformation?.following_you.length} followers</div>
                        </div>
                        <div className='following-div'>
                            <div>{userInformation?.followers.length} following</div>

                        </div>
                    </div>
                    <div className='bio-name-description'>This is all the bio, name, and description

                        <div>bio</div>
                        <div>desciption</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProfileTopPortion;
