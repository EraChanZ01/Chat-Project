import { configureStore } from '@reduxjs/toolkit';
import { initSocket } from "../pages/api/ws/socketInit"
import rootReducer from './reducer'

const store = configureStore({
    reducer: rootReducer,
});

initSocket(store)

export default store;