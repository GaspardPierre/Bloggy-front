import api from "../../api";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, UpdateComment } from "../../actions/comment";
import { addComment } from "../../actions/comment";

import "./Comment.css";

// fonction d'ajout, de modification et de suppression de commentaire
export default function Comment({ card_id}) {

  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const user = useSelector((state) => state.user);
  const role = user.role;
  const cardComments = comments.filter((comment) => comment.card_id === card_id);
  const member_id = user.userId;console.log(member_id);
  const author = user.pseudo;
  const content = newComment;
  const [isCommentFormVisible, setCommentFormVisible] = useState(false);
  const [editingCommentIndex, setEditingCommentIndex] = useState(-1);
  const [error, setError] = useState("");
  
  const handleAddComment = () => {
    // rend visible le formulaire de saisie en modifiant l'état correspondant
    setCommentFormVisible(true);
  };

  // action quand l'utilisateur clique sur le bouton "Annuler"
  // annule l'ajout du commentaire
  const handleCancelComment = () => {
    // cache le formulaire de saisie
    setCommentFormVisible(false);
    // efface le contenu du champ de saisie
    setNewComment("");
    // indique que le commentaire en cours d'édition est annulé
    setEditingCommentIndex(-1);
  };


  const handleSubmitComment = async (event) => {
    event.preventDefault();




    try {
      let response;
if (editingCommentIndex === -1) {
       response = await api.post("/api/comment/addComment", {
        member_id,
        author,
        card_id,
        content,
      });
    } else {
      const commentId = cardComments[editingCommentIndex].id;
      response = await api.patch(`/api/comment/${commentId}`, {content, });
    }

      if (response.status === 200) {
       
        if (editingCommentIndex === -1) {
          if (newComment === "") {
            setError("Attention, votre commentaire est vide !");
          } else {
            dispatch(addComment(response.data));
          }
        } else {
          dispatch(UpdateComment(response.data))
          setEditingCommentIndex(-1);
        }
        // on cache le formulaire de saisie
        setCommentFormVisible(false);
        // on efface le contenu du champ de saisie
        setNewComment("");
      }
    } catch (error) {
      console.log(error);
      setError("Error while registering the comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comment/${commentId}`);
      dispatch(deleteComment(commentId));
    } catch (error) {
      console.log("l'erreur est : ", error);
    }
  };
  useEffect(() => {
    console.log("Comments updated:", cardComments);
  }, [cardComments]);
  
  // Gestion de la modif du commentaire
  const handleEditComment = (commentId) => { // On prends l'id du commentaire à modifier)

    // On recherche l'index du commentaire, dont l'id corresponds à l'id du comm à modifier
  const index = cardComments.findIndex((comment) => comment.id === commentId);
    setEditingCommentIndex(index);
    setCommentFormVisible(true);
    setNewComment(cardComments[index].content);
  };

  const handleCloseError = () => {
    setError("");
  };

  return (
    <React.Fragment>
    
      <div className="comment__container">
      {user.role === "visiteur" ? null : (
        <div className="comment__add">
   
          <button className={"comment__add-button"} onClick={handleAddComment}>
            +
          </button>
          <span className="comment__add-content">Ajouter un commentaire</span>
        </div>
        )}

        {/* on affiche le formulaire de champ de saisie et les boutons 'Valider' et 'Annuler*/}
        {isCommentFormVisible && (
          <form className="comment__form" onSubmit={handleSubmitComment}>
            <input
              className="comment__input"
              type="text"
              value={newComment}
              // au clique on récupère la valeur de l'input et on maj sa valeur avec setNewComment
              onChange={(e) => setNewComment(e.target.value)}
            />

            <button
              className="comment__button comment__button--confirm"
              type="submit"
            >
              Valider
            </button>

            <button
              className="comment__button comment__button--cancel"
              onClick={handleCancelComment}
            >
              Annuler
            </button>

            {error && (
              <span
                className="comment__error-message"
                onClick={handleCloseError}
              >
                {error}
              </span>
            )}
          </form>
        )}

        {/* liste des commentaires rangés par index */}
        {/* la fonction map() parcourt les commentaires de la liste */}
        {/* elle les affiche par ordre décroissant d'ajout */}
        {/* TODO: mettre en place l'affichage croissant */}
        {cardComments.map((item) => (
          <div key={item.id} className="comment__list" id={item.id}>
            <div className="comment__content">{item.content}</div>
            {user.role === "visiteur" ? null : (
  <>
            <button
              className="comment__list-button comment__list-button--modify"
              onClick={() => handleEditComment(item.id)}
            >
              Modifier
            </button>

            <button
              className="comment__list-button comment__list-button--delete"
              onClick={() => handleDeleteComment(item.id)}
            >
              Supprimer
            </button>
            </>
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
