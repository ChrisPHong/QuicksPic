const GET_ALL_USERNAME = 'search/GET'


export const getUserNames = (usernames) =>{
    return {type: GET_ALL_USERNAME,
    usernames}
}



export const getAllUserNames = () => async (dispatch) => {
    const response = await fetch(`/api/search/`, {
        method: 'GET',
    })
    if (response.ok) {
        const usernames = await response.json()
        dispatch(getUserNames(usernames))
    }

}


const initialState = { entries: {}, isLoading: true }

const searchReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_USERNAME:
            newState = { ...state, entries: {...state.entries}}
            action.usernames.map(username => {newState.entries[username.id] = username})
            return newState


        default:
            return state
    }
}

export default searchReducer
