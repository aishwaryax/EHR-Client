const initState = {
    authDetails: null,
    authError: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            return {
                ...state,
                authDetails: null,
                authError: action.err
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                authDetails: action.data,
                authError: null
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                authError: null,
                authDetails: null
            }
        default:
            return state
    }
}
export default authReducer