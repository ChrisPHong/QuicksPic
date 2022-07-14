const GET_ALL_USERNAME = 'search/GET'


export const getUserNames = (usernames) =>{
    return {type: GET_ALL_USERNAME,
    usernames}
}



export const getAllUserNames = (payload) => async (dispatch) => {
    const response = await fetch(`/api/comments/${payload}`, {
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
            newState = { ...state, entries: action.search}
            return newState

        default:
            return state
    }
}

export default searchReducer
