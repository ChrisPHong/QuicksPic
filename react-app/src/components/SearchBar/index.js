import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';
import emptyHeart from './emptyHeart.png'
import { getuserPhotos } from '../../store/user'
import { getAllUserNames } from '../../store/search';
import './searchbar.css';

function SearchBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state);
    const searchUsernames = useSelector(state => state.search.entries);
    const userNames = Object.values(searchUsernames)
    const ids = userNames.map(id => id['id'])
    const usernames = userNames.map(username => username['username'])

    const profilepicture = userNames.map(pic => {

        return pic['profilePic']})


    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const names = ids.map((id, index) => {
        return `${id}* ${usernames[index]}* ${profilepicture[index]}`
    })





    useEffect(() => {
        dispatch(getAllUserNames())

    }, [dispatch])

    useEffect(() => {
        const result = names.filter(name => {
            console.log(name, "<<<<<<<<<<<<<<<<<<< NAME")
            console.log(name.split('*')[1], "<<<<<<<<<<<<<<<<<<< NAME")
          return name.split('*')[1].toLowerCase().includes(search.toLowerCase())});
        setSearchResults(result)

        if (!result || search === '') {
            setSearchResults('')
        }
    }, [search])


    return (
        <div className='searchbar-box'>
            <input
                type='text'
                name='search-bar'
                placeholder=' Search'
                onChange={e => setSearch(e.target.value)}
                onBlur={() => setSearchResults('')}
                value={search}
            />
            <div className='search-results'>
                <ul>
                    {searchResults?.length > 0 && searchResults?.map(userInfo => (

                        <div className='search-items-dropdown'
                            key={userInfo}
                            onMouseDown={async () => {
                                setSearch('')
                                setSearchResults([])
                                await dispatch(getuserPhotos(parseInt(userInfo.split('*')[0])))
                                await history.push(`/users/${parseInt(userInfo.split('*')[0])}`)
                            }}
                        >

                            <div className='search-result-container'>
                            <figure className='img-testing' style={{backgroundImage: `url(${userInfo.split('*')[2]})`}} />
                                <p className='user-name-p-tag'>{userInfo.split('*')[1]}</p>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;
