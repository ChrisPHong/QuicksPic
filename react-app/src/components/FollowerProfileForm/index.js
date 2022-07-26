import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { postFollow, getuserPhotos, getFollowerUsers, postProfileFollow } from '../../store/user'
import {getPhotos, getFollowersPictures} from '../../store/photo'
import '../FollowersForm';
import { useParams } from 'react-router-dom';

function FollowProfile() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state?.session?.user?.id);
    const followers = useSelector((state) => state?.user.profile);
    const result = Object.values(followers)[0]
    const array = result?.following_you
    const followId = useParams()?.userId

    // console.log(followers, '<<<<<<<<<<<<<<<<< FOLLOWERS')
    // console.log(result, '<<<<<<<<<<<<<<<<< result')
    // console.log(array, '<<<<<<<<<<<<<<<<< array')

    useEffect(() => {
        dispatch(getFollowerUsers())
        dispatch(getuserPhotos(followId))

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
                        await dispatch(getPhotos(userId))

                    }}
                >
                    {areYouFollowing() ? 'Unfollow' : 'Follow'}
                </button>




                : null}
        </div >
    )
}


export default FollowProfile;
