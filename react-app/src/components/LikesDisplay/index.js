import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './LikesDisplay.css';

function LikesDisplayPage({ likes }) {
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
                        <div key={i}>
                            <div  onClick={()=>{
                                history.push(`/users/${like.id}`)

                            }} className='profile-container'>
                                <div>
                                    <figure className='like-follower-image' style={{backgroundImage: `url(${like.profilePic})`}}/>

                                </div>
                                <div className='username-title-like'>
                                    {like.username}
                                </div>
                            </div>
                        </div>
                    )
                })}
                </>
            }
            </div>

        </>
    )
}


export default LikesDisplayPage;
