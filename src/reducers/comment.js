import { DELETE_COMMENT, FETCH_COMMENTS_SUCCESS, UPDATE_COMMENT } from "../actions/comment";
import { FETCH_COMMENTS_FAILURE } from "../actions/comment";
import { ADD_COMMENT } from "../actions/comment";

export const initialState = {
    comments: [],
    loading: false,
    error: null,
  };

  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COMMENTS_SUCCESS:
        return { ...state, comments: action.payload, loading: false, error: null };
      case FETCH_COMMENTS_FAILURE:
        return {
          ...state,
          comments: [],
          loading: false,
          error: "Failed to fetch comments",
        };
        case ADD_COMMENT :{
          const newComment = action.payload;
        
          return { ...state,
            comments :[...state.comments,newComment ] };}
          

          case UPDATE_COMMENT : { 

            // Si on modifie un comment : On map dans comment , tous les commentaires et l'id des commentaires qui correspondent à l'id du commentaire que l'on modifie, on le met dans comment, ensuite on retourne l'ancien state et tous les commentaires modifiés

         const updatedComment = action.payload;
         const updatedComments = state.comments.map((comment) => comment.id === updatedComment.id ? updatedComment : comment
         );
         return {
          ...state,
          comments : updatedComments,};
         }

       case DELETE_COMMENT :
          return {
              ...state,
              // On filtre les cards qui n'ont pas l'id de la card supprimée
              comments :[...state.comments.filter(comment => comment.id !== action.id), ]
             
          }
  
      default:
        return state;
    }
  };
  
  export default commentsReducer;
  
