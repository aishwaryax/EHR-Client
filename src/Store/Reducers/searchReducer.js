const initState = {
    searchUserDetails: null,
    searchUserError: null
}

const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case "SEARCHUSER_ERROR":
            return {
                ...state,
                searchUserDetails: null,
                searchUserError: action.err
            }
        case "SEARCHUSER_SUCCESS":
            return {
                ...state,
                searchUserDetails: action.data,
                searchUserError: null
            }
        default:
            return state
    }
}
export default searchReducer