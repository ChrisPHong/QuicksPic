import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './EditCommentForm.css';
import { editComment, deleteComment, getComments } from '../../store/comment'




function EditCommentsPage({ comment, photoId, setShowModal }) {
    const dispatch = useDispatch();
    const allComments = useSelector((state) => state?.comments);
    const currentComment = allComments.entries[comment.id]
    const userId = useSelector((state) => state?.session?.user?.id);
    const [show, setShow] = useState(false);
    const [newComments, setnewComments] = useState(comment.comments);
    const [errors, setErrors] = useState([]);
    const [display, setDisplay] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        dispatch(getComments(photoId))
        setnewComments(currentComment.comments)

    }, [dispatch, deleted, edited])

    useEffect(() => {
        let error = []
        if (newComments.length > 2200) error.push('Comment length must be less than 2,2000 characters')
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
            await dispatch(editComment(payload))
            await setShowModal(false)

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
        await setDeleted(!deleted)
        await setEdited(!edited)
        await setShowModal(false)
    }

    return (
        <>
            {comment.userId === userId ?
                <div className='editingCommentFormDiv'>
                    <div>
                        <div className='ButtonToDisplay'>
                        </div>

                        <div className='edit-your-comment'>

                            <h3 className='h3title-EditComment'>Edit Your Comment</h3>
                            <form className='form-Edit-Container' onSubmit={onSubmit}>
                                {show ?

                                    errors.length > 0 ?
                                        <>
                                            <h4>Fix Your Errors :</h4>
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
                                    className='commentForm-input-value'
                                    placeholder="Comment..."
                                    value={newComments}

                                    onChange={(e) => { setnewComments(e.target.value) }} />
                                {newComments.length > 2200 ?
                                    <p className='number-length-comments' style={{ color: 'red' }}>{newComments.length} / 2200</p>
                                    :
                                    <p className='number-length-comments'>{newComments.length} / 2200</p>
                                }
                                <button
                                    className='commentEditForm-Button'
                                    type='submit'>Save Changes</button>
                            </form>
                            <div >
                                <button className='deleteButtonCommentEdit'
                                    onClick={deleteFunction}
                                >Delete</button>

                            </div>
                        </div>

                    </div>
                </div>
                : null}

        </>
    )
}


export default EditCommentsPage;
