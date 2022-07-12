import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getuserPhotos } from '../../store/user'
import EditPhotoForm from '../EditPhotoForm';
import CommentsPage from '../Comments'
import CommentFormPage from '../CommentForm';
import PhotoLikesForm from '../PhotoLikesForm'
import './ProfileTopForm.css';



function ProfileTopPortion() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const statePhotos = useSelector((state) => state.user.entries);
    const photos = Object.values(statePhotos)
    const userInformation = useSelector((state) => state.session);
    const userName = useSelector((state) => state.session.user.username);



    return (
          <div>
            HELLO
         </div>
    )

}

export default ProfileTopPortion;
