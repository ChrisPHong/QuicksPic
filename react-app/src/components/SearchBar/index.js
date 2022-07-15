import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useHistory } from 'react-router-dom';

import { getAllUserNames } from '../../store/search';
import './searchbar.css';

function SearchBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const state = useSelector(state => state); // object
    const searchUsernames = useSelector(state => state.search.entries);
    const userNames = Object.values(searchUsernames) // object

    console.log(userNames, '<<<<<<<<<<<<<<<< STATE >>>>>>>>>>>>')



    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);





    useEffect(() => {
        dispatch(getAllUserNames())
    }, [dispatch])


    return (
        <div className='searchbar-box'>
            <input
                type='text'
                name='search-bar'
                placeholder=' Search'
                // onChange={e => setSearchTerm(e.target.value)}
                onBlur={() => setSearchResults('')}
                // value={searchTerm}
            />
            <div className='search-results'>
                <ul>
                    {searchResults?.length > 0 && searchResults?.map(item => (

                        <div className='search-items-dropdown'
                            key={item}
                            onMouseDown={() => {
                                // setSearchTerm('')
                                setSearchResults([])

                                history.push(`/users/${item}`)
                            }}
                        >

                            <p>{item}</p>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar;
