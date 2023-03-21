import api from '../../api';
import React, { useState/* , useEffect, useRef */ } from 'react';
import './Comment.css';

// fonction d'ajout, de modification et de suppression de commentaire
export default function Comment({ id, ...props }) {

  // State
  // liste des commentaires existants
  const [comments, setComments] = useState([]);
  // nouveau commentaire
  const [newComment, setNewComment] = useState('');
  // affichage ou non du champ de saisie d'un commentaire
  const [isCommentFormVisible, setCommentFormVisible] = useState(false);
  // édition ou non d'un commentaire
  const [editingCommentIndex, setEditingCommentIndex] = useState(-1);
  // écouter le click, sur le boutton "ajouter un commentaire"
  // const [isActive, setIsActive] = useState(false);
  // focus
  // const inputRef = useRef(null);
  // message d'erreur
  const [error, setError] = useState("");

  // // focus
  // useEffect(() => {
  //   inputRef.current.focus();
  //   }, []);

  // action quand l'utilisateur clique sur le bouton "Ajouter un commentaire"
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
    setNewComment('');
    // indique que le commentaire en cours d'édition est annulé
    setEditingCommentIndex(-1);
  };

  // action quand l'utilisateur clique sur le bouton "Valider" pour soumettre le formulaire de saisie
  const handleSubmitComment = async (event) => {
    // empêche le comportement par défaut du formulaire d'être exécuté (recharge de la page)
    event.preventDefault();

    try {

      const response = await api.post('/api/comments/addComment', { newComment });
      console.log(response.status);

      if (response.status === 200) {

        // si aucun commentaire n'est actuellement en cours d'édition 
        // c'est donc que l'utilisateur soumet un nouveau commentaire
        if (editingCommentIndex === -1) {

          if (newComment === '') {
            setError("Attention, votre commentaire est vide !");
          } else {
            // ajoute le commentaire dans la liste des commentaires
            // en créant une nouvelle copie de la liste existante pour y ajouter le nouveau commentaire
            setComments([...comments, newComment]);
            // si un commentaire est en cours d'édition
            // donc l'utilisateur soumet une modification d'un commentaire existant
          }
          
        
        } else {
          // on crée une nouvelle copie de la liste des commentaires existants
          const newComments = [...comments];
          // on remplace le commentaire à l'index correspondant en cours d'édition par le nouveau commentaire
          newComments[editingCommentIndex] = newComment;
          // on met à jour la liste avec la nouvelle copie qui contient les modifs
          setComments(newComments);
          // indique le l'édition du commentaire est terminée
          setEditingCommentIndex(-1);
        }
          // on cache le formulaire de saisie
          setCommentFormVisible(false);
          // on efface le contenu du champ de saisie
          setNewComment('');
          
      } else {
        console.log(response)
      }

    } catch (error) {
      console.log(error);
      setError('Error while registering the comment');
    }
    
  };

  // action quand l'utilisateur clique sur bouton "Modifier" d'un commentaire existant
  // elle préremplit le champ de saisie avec le contenu du commentaire à éditer
  const handleEditComment = (index) => {
    // maj l'état de 'editingCommentIndex' avec l'index du commentaire à modifier
    setEditingCommentIndex(index);
    // maj l'état de 'commentFormVisible' sur 'true' pour afficher le formulaire de champ de saisie
    setCommentFormVisible(true);
    // maj l'état de 'newComment' en affichant le contenu du commentaire dans le champ de saisie pour que l'utilisateur puisse le modifier
    setNewComment(comments[index]);
  };

  // action quand l'utilisateur clique sur 'Supprimer' d'un commentaire existant
  // elle supprime le commentaire de la liste
  const handleDeleteComment = (index) => {
    // on crée une nouvelle copie de la liste des commentaires existants
    const newComments = [...comments];
    // supprimer le commentaire à l'index indiqué (à partir de l'index 1)
    newComments.splice(index, 1);
    // maj la liste avec la nouvelle copie qui contient les modifs
    setComments(newComments);
  };

  const handleCloseError = () => {
    setError("");
  }


  return (

    <React.Fragment>

      <div className='comment__container'>

        <div className='comment__add'>
            {/* l'utilisateur clique sur le bouton 'Ajouter un commentaire' */}
            <button className={"comment__add-button"} onClick={handleAddComment}>+</button>
            {/* <button className={`comment__add-button ${isActive ? 'active' : ''}`} onClick={handleAddComment}>+</button> */}
            <span className='comment__add-content'>Ajouter un commentaire</span>
        </div>
            
        {/* on affiche le formulaire de champ de saisie et les boutons 'Valider' et 'Annuler*/}
        {isCommentFormVisible && (

            <form className='comment__form' onSubmit={handleSubmitComment} >

              <input 
                className='comment__input'
                type='text'
                value={newComment}
                // au clique on récupère la valeur de l'input et on maj sa valeur avec setNewComment
                onChange={(e) => setNewComment(e.target.value)}
              />

              <button className='comment__button comment__button--confirm' type='submit'>
                  Valider
              </button>

              <button className='comment__button comment__button--cancel' onClick={handleCancelComment}>
                  Annuler
              </button>

              {error && (
                <span className='comment__error-message' onClick={handleCloseError}>
                  {error}
                </span>)
              }

            </form>
        )}

            {/* liste des commentaires rangés par index */}
            {/* la fonction map() parcourt les commentaires de la liste */}
            {/* elle les affiche par ordre décroissant d'ajout */}
            {/* TODO: mettre en place l'affichage croissant */}
            {comments.map((comment, index) => (

              <div key={index} className='comment__list' >

                <div className='comment__content'>
                    {comment}
                </div>

                <button className='comment__list-button comment__list-button--modify' onClick={() => handleEditComment(index)}>
                    Modifier
                </button>

                <button className='comment__list-button comment__list-button--delete' onClick={() => handleDeleteComment(index)}>
                    Supprimer
                </button>

              </div>

            ))}

      </div>

    </React.Fragment>

  );
    
}