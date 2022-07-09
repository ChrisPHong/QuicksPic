import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './CommentForm.css';
import {postComment} from '../../store/comment'



function CommentFormPage({photoId}) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const [show, setShow] = useState(false)
    const [comments, setComments] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
    }, [dispatch])

    useEffect(() => {
        const error = [];

        if (comments.length < 1) error.push('Please put a comment with at least one character')
        setErrors(error)




    }, [comments])

    const onSubmit = (e) =>{
        e.preventDefault()
        if(errors.length > 0){
            setShow(true)
            return
        }

        if(errors.length === 0){
            const payload = {
                user_id: userId,
                photo_id: photoId,
                comments,

            }
            dispatch(postComment(payload))
            return setComments('')
        }
    }

    return (
        <div className='entire-comments-picture'>
            <form onSubmit={onSubmit}>
            <input
            value={comments}
            placeholder="Comment..."
            onChange={e =>{setComments(e.target.value)}}/>
            <button type='submit'>Post</button>
            </form>
        </div>

    )
}


export default CommentFormPage;
