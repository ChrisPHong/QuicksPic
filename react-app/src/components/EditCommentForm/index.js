import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import './EditCommentForm.css';
import { getComments } from '../../store/comment'



function EditCommentsPage({ comment }) {
    const dispatch = useDispatch();
    const commentsState = useSelector((state) => state.comments);
    const state = useSelector((state) => state);
    const userId = useSelector((state) => state.session.user.id);
    const [show, setShow] = useState('hidden')
    const [caption, setCaption] = useState('')



    useEffect(() => {
    }, [dispatch])

    useEffect(() => {

    }, [caption])

    return (
        <div className='entire-comments-picture'>
            <form>

            </form>
        </div>

    )
}


export default EditCommentsPage;
