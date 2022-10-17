import { useState, useEffect } from 'react';
import ProfileTopPortion from '../ProfileTopForm';
import UserProfilePage from '../UserProfilePage';
import './ProfilePage.css'

function ProfilePage (){

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() =>{
        window.scrollTo(0,0)
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false)
        }, 1000)
    }, [])

    return (
        <>
        {isLoading ?

            <div className='loading-ctn'>
                <div className='loading'></div>

            </div>
            :
            <>
            <ProfileTopPortion />
            <UserProfilePage />
            </>
            }
            </>
    )
}

export default ProfilePage;
