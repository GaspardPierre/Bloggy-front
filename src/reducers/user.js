import { LOGIN, LOGOUT, REGISTER } from '../actions/user';

const initialState = {
    isLoggedIn: false,
    email: '',
    pseudo: '',
    role: '',
    userId: ''
   
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                email: action.payload.email,
                pseudo: action.payload.pseudo,
           role:action.payload.role,  
           userId:action.payload.userId 
         
              
              
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                email: '',
                pseudo: '',
                role:'',
                userId:''
              
          
            }
        case REGISTER:
            return {
                ...state,
                isLoggedIn: true,
                email: action.payload.email,
                pseudo: action.payload.pseudo,
          
              
            }
        default:
            return state
    }
}

export default reducer
