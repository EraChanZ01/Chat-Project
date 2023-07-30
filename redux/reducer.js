import { combineReducers } from 'redux';
import userReducer from "./slice/userSlice"

const rootReducer = combineReducers({
    userStore: userReducer
})

export default rootReducer