

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";

export const actionlogin = (email,role,pseudo,userId) => {
 
    return dispatch => {
      dispatch({
        type: LOGIN,
        payload: {
          email,
          role,
          pseudo,
          userId
         /*  pseudo, */
         
        
      
        }
      });
      sessionStorage.setItem("email", email);console.log(email)
      sessionStorage.setItem("role",role); 
      sessionStorage.setItem("pseudo",pseudo);console.log(pseudo);
      sessionStorage.setItem("id",userId);console.log(userId);
     
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