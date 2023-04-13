import { configureStore } from '@reduxjs/toolkit';
import userReducer from'../reducers/user';
import cardsReducer from '../reducers/card';
import commentsReducer from '../reducers/comment';


const store = configureStore({
    reducer: {
    
      user: userReducer,
      cards : cardsReducer,
      comments : commentsReducer
    },
    middleware :(getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
