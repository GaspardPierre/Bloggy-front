import api from"../api";

export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';


export const fetchCards = () => {
// L'ACTION fetch cards  appelle  l'api et renvoie soit succes avec toutes les cartes en payload soit une erreur 

    return async (dispatch) => {
        try {
            
            const response = await api.get("/card");
            console.log(response.data);
            dispatch ( { type : FETCH_CARDS_SUCCESS, payload : response.data });
       
            
        } catch (error) {
            console.log(error);
            dispatch({ type : FETCH_CARDS_FAILURE});
            
        }
    };
};
// L'action addCard prends la nouvelle carte en paramètre et retourne le type d'action et la nouvelle carte en payload
export const addCard = (newCard) => ({
    type : ADD_CARD,
    payload: newCard,

});
export const deleteCard = (id) => ({
    type : DELETE_CARD,id
    

});
