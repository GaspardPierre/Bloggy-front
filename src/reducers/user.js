import { LOGIN, LOGOUT, REGISTER } from '../actions/user';

const initialState = {
    isLoggedIn: false,
    email: '',
    token: '',
    role: '',
   
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                email: action.payload.email,
          /*        token: action.payload.token, */
           role:action.payload.role,  
              
              
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                email: '',
                token: '',
                role:'',
              
          
            }
        case REGISTER:
            return {
                ...state,
                isLoggedIn: true,
                email: action.payload.email,
                token: action.payload.token,
          
              
            }
        default:
            return state
    }
}

export default reducer
