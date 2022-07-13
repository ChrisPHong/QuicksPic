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
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        dispatch(getComments(photoId))
    }, [dispatch])

    const showComments = () => {
        if (display === false) {
            return setDisplay(true)
        }
        if (display === true) {
            return setDisplay(false)
        }
    }

    return (
        <div className='entire-comments-picture'>
            <button className='view-all-comments' onClick={showComments}>{display ? "Hide All Comments" : "View All Comments"}</button>
            {comments.map(comment => {
                return (
                    <>
                    {display ?
                    < CommentDisplay comment={comment} photoId={photoId}/>
                    : null}
                    </>
                )
            })}
        </div>

    )
}


export default CommentsPage;
