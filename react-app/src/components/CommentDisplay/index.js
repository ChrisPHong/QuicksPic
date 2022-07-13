import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './CommentDisplay.css';
import { getComments, deleteComment } from '../../store/comment'
import EditCommentsPage from '../EditCommentForm';
import CommentLikeForm from '../CommentLikesForm'
import bulletPoints from './bulletPoints.png'




function CommentDisplay({ photoId, comment }) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);

    // useEffect(() => {

    // }, [dispatch, comment])
    return (
        <div className='One-Comment-Container'>
            <div>
                <div className='Comment-Container-Whole'>
                    <div className='comment-username-div'>
                        {comment.username.username}
                    </div>
                    <div className='comment-comment-div'>
                        <div className='one-comment-div'>
                            {comment.comments}
                        </div>
                        <div className='Likes-Form-Div'>
                            < CommentLikeForm comment={comment} />
                        </div>
                    </div>
                </div>
            </div>

            {userId === comment.userId ?
                <div className='EditCommentPage'>
                    <EditCommentsPage comment={comment} photoId={photoId}/>
                    {/* <div className='deleteButtonCommentEdit'>
                        <button
                            onClick={async (e) => {
                                await dispatch(deleteComment(comment.id))
                                await dispatch(getComments(photoId))
                            }}
                        >Delete</button>

                    </div> */}
                </div>
                : null}
            <div className='timeframe-commentLikes-Container'>
                <div className='commentDatePosted'>{comment.createdAt}</div>
                {comment.commentLikes === 1 ?
                    <div className='comment-likes'>{comment.commentLikes} like</div>
                    :
                    <div className='comment-likes'>{comment.commentLikes} likes</div>
                }
            </div>


        </div>

    )
}


export default CommentDisplay;
