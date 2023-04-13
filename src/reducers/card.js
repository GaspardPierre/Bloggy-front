import { DELETE_CARD, FETCH_CARDS_SUCCESS } from "../actions/card";
import { FETCH_CARDS_FAILURE } from "../actions/card";
import { ADD_CARD } from "../actions/card";



//le state de départ//
export const initialState = {
  cards: [],
  loading: false,
  error: null,
};
 //le cardreducer prens en parametre le state initial et une action , il retourne un nouveau state//
const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS_SUCCESS:
      return { ...state, cards: action.payload, loading: false, error: null };
    case FETCH_CARDS_FAILURE:
      return {
        ...state,
        cards: [],
        loading: false,
        error: "Failed to fetch cards",
      };
      case ADD_CARD :
        return { ...state,
        cards : [...state.cards, action.payload]};
     case DELETE_CARD :
        return {
            ...state,
            // On filtre les cards qui n'ont pas l'id de la card supprimée
            cards :[...state.cards.filter(card => card.id !== action.id), ]
           
        }

    default:
      return state;
  }
};

export default cardsReducer;
