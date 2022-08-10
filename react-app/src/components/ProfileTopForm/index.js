import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getuserPhotos, getFollowerUsers} from '../../store/user'
import { useParams } from 'react-router-dom';
import FollowProfile from '../FollowerProfileForm'
import EditProfileForm from '../ProfileTopEditForm'
import EditProfileModal from '../EditProfileModal'

import './ProfileTopForm.css';



function ProfileTopPortion() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const id = Number(useParams()?.userId)
    const userInfo = useSelector((state) => state?.user?.profile)[id];
    const statePhotos = useSelector((state) => state.user.entries);
    const photos = Object.values(statePhotos)
    const userId = useSelector((state) => state.session.user.userId);

    useEffect(() => {
        dispatch(getuserPhotos(parseInt(id)))
        dispatch(getFollowerUsers())
    }, [dispatch, id])
    return (
        <div className='Entire-Container'>

            <div className='Entire-Container-profile-top'>

                <div className='profilePicture-profilePage'>
                    <figure className='Photos-Picture-Top' style={{ backgroundImage: `url(${userInfo?.profile})` }} />
                </div>
                <div className='User-information-Entire-Container'>
                    <div className='followerButtonProfile'>
                        <EditProfileModal userInfo={userInfo}/>
                        <FollowProfile />
                    </div>
                    <div className='username-container'>{userInfo?.username}

                    </div>
                    <div className='posts-followers-following-div'>
                        <div className='infomation'>
                            <div className='posts'>
                                <span className='boldFont text'>{photos?.length}</span>
                                <span className='text textSizeProfile'> posts</span>

                            </div>
                        </div>
                        <div className='followers infomation'>
                            <div>
                                <span className='boldFont'>{userInfo?.following_you?.length}</span>
                                <span className='profileInfoText text textSizeProfile'> followers</span>
                            </div>
                        </div>
                        <div className='following-div infomation'>
                            <div>
                                <span className='boldFont'>
                                    {userInfo?.followers?.length}
                                </span>
                                <span className='text textSizeProfile'> following</span>
                            </div>

                        </div>
                    </div>
                    <div className='userInformation-container'>

                        <p className='user-name-p-tag user-name-bold'>{userInfo?.name}</p>
                        <p className='user-name-p-tag'>{userInfo?.bio}</p>
                        <a className='user-name-a-tag website-user' href={`${userInfo?.website}`}>{userInfo?.website}</a>
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
