import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getPhotos, deletePhoto } from '../../store/photo'

import './LikesDisplay.css';



function LikesDisplayPage({ likes }) {
    const dispatch = useDispatch();
    const photoState = useSelector((state) => Object.values(state.photos));
    const currentUser = useSelector(state => state?.session?.user);
    const userId = useSelector((state) => state.session.user.id);
    console.log(likes, "<<<<<<< THE PEOPLE LIKE PHOTOS")
    const history = useHistory();

    return (
        <>
            <div className='likes-display-container'>
        <h3 className='likes-h3-title'>Likes</h3>
        {likes.length < 1 ?
        <>
        <div className='likes-h3-title adding-padding'>There are no likes for this photo. . .</div>
        <div className='likes-h3-title adding-padding'>But you can be the first!</div>
        </>
        :<>
                {likes.map((like, i) => {
                    return (
                        <>
                            <div key={i} onClick={()=>{
                                history.push(`/users/${like.id}`)

                            }} className='profile-container'>
                                <div>
                                    <figure className='like-follower-image' style={{backgroundImage: `url(${like.profilePic})`}}/>

                                </div>
                                <div className='username-title-like'>
                                    {like.username}
                                </div>
                            </div>
                        </>
                    )
                })}
                </>
            }
            </div>

        </>
    )
}


export default LikesDisplayPage;
