import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authSlice';

// Combine all your reducers
const rootReducer = combineReducers({
    authReducer
});

export default rootReducer;
