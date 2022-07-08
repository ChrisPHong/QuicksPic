import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './Comments.css';
import { getComments } from '../../store/comment'



function CommentsPage({ photo }) {
    const dispatch = useDispatch();
    const commentsState = useSelector((state) => state.comments);
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const allComments = Object.values(commentsState)[0]
    const comments = Object.values(allComments)
    const [show, setShow] = useState('hidden')
    const [caption, setCaption] = useState('')

    console.log('<<<<<<<<<<< PHOTO', photo)


    console.log(allComments, "<<<<<<<<<<<<<<<<< all comments")
    useEffect(() => {
        dispatch(getComments(photo))
    }, [dispatch])

    useEffect(() => {

    }, [caption])

    return (
        <div className='entire-comments-picture'>
            {comments.map(comment => {
                return (
                    <>
                        {comment.photoId === photo ?
                            <div>

                                <div>
                                    {comment.comments}
                                </div>
                                <div>
                                    {comment.createdAt}
                                </div>

                            </div>
                            : null}
                    </>
                )
            })}
        </div>

    )
}


export default CommentsPage;
