import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './PageNotFound.css';
import { useHistory, useParams } from 'react-router-dom';


function PageNotFound(){
    return(
        <div className='PageNotFound'>
            <div className='pageNoteFOundText'> Page Not Found</div>
            <div className='pageNoteFOundText'> 404 </div>
        </div>
    )
}


export default PageNotFound;
