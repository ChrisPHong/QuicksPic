import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getuserPhotos } from '../../store/user'
import { useParams } from 'react-router-dom';
import FollowProfile from '../FollowerProfileForm'

import './ProfileTopForm.css';



function ProfileTopPortion() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userInfo = useSelector((state) => state?.user?.profile);
    const userInfos = Object.values(userInfo);
    const userInformation = userInfos[userInfos.length - 1];
    const statePhotos = useSelector((state) => state.user.entries);
    const photos = Object.values(statePhotos)
    const userId = useSelector((state) => state.session.user.userId);
    const id = useParams()?.userId


    console.log(userInformation, "<<<<<<<<<<<<<<<<<<<< User info")
    useEffect(() => {
        dispatch(getuserPhotos(parseInt(id)))

    }, [dispatch])
    return (
        <div className='Entire-Container'>

            <div className='Entire-Container-profile-top'>

                <div className='profilePicture-profilePage'>
                    <figure className='Photos-Picture-Top' style={{ backgroundImage: `url(${userInformation?.profile})` }} />
                    {/* <img className='Profile-Picture-Top' src={`${userInformation?.profile}`} /> */}
                </div>
                <div className='User-information-Entire-Container'>
                    <div className='followerButtonProfile'>
                    <FollowProfile />
                    </div>
                    <div className='username-container'>{userInformation?.username}

                    </div>
                    <div className='posts-followers-following-div'>
                        <div className='infomation'>
                            <div className='posts'>
                                <span className='boldFont text'>{photos.length}</span>
                                <span className='text textSizeProfile'> posts</span>

                            </div>
                        </div>
                        <div className='followers infomation'>
                            <div>
                                <span className='boldFont'>{userInformation?.following_you.length}</span>
                                <span className='profileInfoText text textSizeProfile'> followers</span>
                            </div>
                        </div>
                        <div className='following-div infomation'>
                            <div>
                                <span className='boldFont'>
                                    {userInformation?.followers.length}
                                </span>
                                <span className='text textSizeProfile'> following</span>
                            </div>

                        </div>
                    </div>
                    {/* <div className='bio-name-description'>This is all the bio, name, and description

                        <div>bio</div>
                        <div>desciption</div>
                    </div> */}
                </div>
            </div>
        </div>
    )

}

export default ProfileTopPortion;
