import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './EditCommentForm.css';
import { editComment, deleteComment, getComments } from '../../store/comment'
import bulletPoints from './bulletPoints.png'




function EditCommentsPage({ comment, photoId }) {
    const dispatch = useDispatch();
    const allComments = useSelector((state) => state?.comments);
    const currentComment = allComments.entries[comment.id]
    const userId = useSelector((state) => state?.session?.user?.id);
    const [show, setShow] = useState(false);
    const [newComments, setnewComments] = useState(currentComment.comments);
    const [errors, setErrors] = useState([]);
    const [display, setDisplay] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);
    // console.log('<<<<<<<<<<<<< ALL COMMENT', allComments)

    // console.log('current COMMENT >>>>>>>>>>>>>', currentComment)
    useEffect(() => {
        dispatch(getComments(photoId))
        setnewComments(currentComment.comments)

    }, [dispatch, deleted, edited])

    useEffect(() => {
        let error = []
        if (newComments.length < 1) error.push("Please put a comment with at least one character")
        if (!newComments.replace(/\s/g, '').length) error.push('Please provide a comment that does not only contain spaces');
        setErrors(error)

    }, [newComments])


    const onSubmit = async (e) => {
        e.preventDefault()
        if (errors.length > 0) {
            setShow(true)
            return
        }

        if (errors.length === 0) {
            const payload = {
                user_id: comment.userId,
                photo_id: comment.photoId,
                id: comment.id,
                comments: newComments,

            }
            // let editedComment;
            // try {
            //     editedComment = await dispatch(editComment(payload))
            // } catch (error) {

            // }
            // if (editedComment) {
            //     console.log(editedComment, '<<<<<<<<<<<<<<<<<<<< EDITED COMMENT')
            //     editedTrueOrFalse()
            //     showEditForm()
            // }

        }
    }

    const editedTrueOrFalse = () => {
        if (edited === false) {
            return setEdited(true)
        }
        if (edited === true) {
            return setEdited(false)
        }
    }

    const showEditForm = () => {
        if (display === false) {
            return setDisplay(true)
        }
        if (display === true) {
            return setDisplay(false)
        }
    }

    const deleteFunction = async () => {
        await dispatch(deleteComment(comment.id))
        setDeleted(!deleted)
        showEditForm()
    }

    return (
        <>
            {comment.userId === userId ?
                <div className='editingCommentFormDiv'>
                    <div>
                        <div className='ButtonToDisplay'>
                            <button className='bullet-points-button'>
                                <img className='bullet-points-img' src={bulletPoints} alt='edit-delete-options' onClick={showEditForm} />
                            </button>
                        </div>
                        {display ?
                            <div>

                                <h2>Edit your Comment</h2>
                                <form onSubmit={onSubmit}>
                                    {show ?

                                        errors.length > 0 ?
                                            <>
                                                <h4>Fix Errors Before Posting:</h4>
                                                <ul className='errorsArray'>{errors.map(error => {
                                                    return (
                                                        <>
                                                            <li className='CommentFormErrorItem'
                                                                key={error}>{error}</li>
                                                        </>
                                                    )
                                                })}
                                                </ul>
                                            </>
                                            : null

                                        : null}
                                    <input
                                        placeholder="Comment..."
                                        value={newComments}

                                        onChange={(e) => { setnewComments(e.target.value) }} />
                                    <button type='submit'>Save Changes</button>
                                </form>
                                <div className='deleteButtonCommentEdit'>
                                    <button
                                        onClick={deleteFunction}
                                    >Delete</button>

                                </div>
                            </div>
                            : null}
                    </div>
                </div>
                : null}

        </>
    )
}


export default EditCommentsPage;
