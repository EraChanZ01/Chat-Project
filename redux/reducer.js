import { combineReducers } from 'redux';
import userReducer from "./slice/userSlice"
import contactReducer from './slice/contactSlice'

const rootReducer = combineReducers({
    userStore: userReducer,
    contactStore: contactReducer,
})

export default rootReducer