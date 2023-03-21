

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";

export const actionlogin = (email,role) => {
 
    return dispatch => {
      dispatch({
        type: LOGIN,
        payload: {
          email,
          role,
         /*  pseudo, */
         
        
      
        }
      });
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("role",role); console.log(role)
     
    }
};

export const actionregister = (pseudo, email/* ,token */) => {
  return {
      type: REGISTER,
      payload: {
          pseudo,
          email,
     
        
      }
  }
};

export const actionlogout = () => {
    return dispatch => {
      dispatch({
        type: LOGOUT
      });
    sessionStorage.clear();
 /*      localStorage.removeItem("token");  */
    /*   localStorage.removeItem("pseudo");  */
    };
};