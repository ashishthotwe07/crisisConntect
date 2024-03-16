import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authSlice';
import { notificationReducer } from './reducers/notificationSlice';

// Combine all your reducers
const rootReducer = combineReducers({
    authReducer,
    notificationReducer,
   
    
});

export default rootReducer;
