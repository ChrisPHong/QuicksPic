import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getuserPhotos, getFollowerUsers, postProfileFollow } from '../../store/user'
import { getPhotos } from '../../store/photo'
import '../FollowersForm';
import { useParams } from 'react-router-dom';

function FollowProfile() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state?.session?.user?.id);
    const followers = useSelector((state) => state?.user.profile);
    const result = Object.values(followers)[0]
    const array = result?.following_you
    const followId = useParams()?.userId


    useEffect(async () => {
        dispatch(getuserPhotos(followId))
        dispatch(getFollowerUsers())

    }, [dispatch]);



    const areYouFollowing = () => {
        for (let i = 0; i < array?.length; i++) {
            if (array[i].id == userId) {

                return true
            }
        }
        return false

    }

    return (
        <div className='FollowerPostDiv'>
            {userId !== parseInt(followId) ?
                <button className={areYouFollowing() ? 'UnFollowerButton' : 'FollowerButton'}
                    onClick={async (e) => {
                        e.preventDefault()

                        const payload = {
                            userId,
                            followId
                        }
                        await dispatch(postProfileFollow(payload))
                        await dispatch(getFollowerUsers())
                        await dispatch(getPhotos())

                    }}
                >
                    {areYouFollowing() ? 'Unfollow' : 'Follow'}
                </button>




                : null}
        </div >
    )
}


export default FollowProfile;
