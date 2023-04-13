import api from"../api";

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const fetchComments = () => {
    // L'ACTION fetch cards  appelle  l'api et renvoie soit succes avec toutes les cartes en payload soit une erreur 
    
        return async (dispatch) => {
            try {
                
                const response = await api.get("/comment");
                console.log(response.data);
                dispatch ( { type : FETCH_COMMENTS_SUCCESS, payload : response.data });
           
                
            } catch (error) {
                console.log(error ("je ne récupère pas les comments"));
                dispatch({ type : FETCH_COMMENTS_FAILURE});
                
            }
        };
    };
    // L'action addCard prends la nouvelle carte en paramètre et retourne le type d'action et la nouvelle carte en payload
    export const addComment = (newComment) => ({
        type : ADD_COMMENT,
        payload: newComment,
    
    });
    export const deleteComment = (id) => ({
        type : DELETE_COMMENT,id
        
    
    });
    export const UpdateComment = (updatedComment) => ({
        type : UPDATE_COMMENT,
        payload : updatedComment
        
    
    });
    
    