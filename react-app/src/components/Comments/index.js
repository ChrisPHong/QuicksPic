import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './Comments.css';
import { getComments, deleteComment } from '../../store/comment'
import EditCommentsPage from '../EditCommentForm';
import CommentLikeForm from '../CommentLikesForm'
import bulletPoints from './bulletPoints.png'
import CommentDisplay from '../CommentDisplay'




function CommentsPage({ photoId }) {
    const dispatch = useDispatch();
    const commentsState = useSelector((state) => state.comments);
    const allComments = Object.values(commentsState)[0]
    const comments = Object.values(allComments)


    useEffect(() => {
        dispatch(getComments(photoId))
    }, [dispatch])



    return (
        <div className='entire-comments-picture'>
            {comments.map(comment => {
                return (
                    <>
                    < CommentDisplay comment={comment} photoId={photoId}/>
                    </>
                )
            })}
        </div>

    )
}


export default CommentsPage;
