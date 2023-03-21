import { configureStore } from '@reduxjs/toolkit';
import userReducer from'../reducers/user';
import cardsReducer from '../reducers/card';


const store = configureStore({
    reducer: {
    
      user: userReducer,
      cards : cardsReducer
    }
});

export default store;
