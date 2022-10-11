import authReducer from './authReducer'

import { combineReducers } from 'redux'
import { meNavReducer } from './meReducer'
import fetchReducer from './fecthReducer'
import registerReducer from './registerReducer'
import searchReducer from './searchReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    meNav: meNavReducer,
    fetch: fetchReducer,
    register: registerReducer,
    search: searchReducer
})

export default rootReducer