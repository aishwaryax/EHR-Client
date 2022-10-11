const initState = {
    meNavDetails: null,
    meNavError: null
}

const meNavReducer = (state = initState, action) => {
    switch (action.type) {
        case "MENAV_ERROR":
            return {
                ...state,
                meNavDetails: null,
                meNavError: action.err
            }
        case "MENAV_SUCCESS":
            return {
                ...state,
                meNavDetails: action.data,
                meNavError: null
            }
        default:
            return state
    }
}
export { meNavReducer }