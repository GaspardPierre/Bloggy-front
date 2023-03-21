import { memo, useState, useEffect } from "react";
import EditionVideo from "../EditionVideo/EditionVideo";
import api from "../../api";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Comment from "../Comment/Comment";
import { deleteCard } from "../../actions/card";
import "./Card.css";


const Card = function Card({
  id,
  author,
  description,
  type,
  url,
  memberId,
 
}) {
  const dispatch = useDispatch() ;
  const cards = useSelector ((state) => state.cards);
  const isUser = useSelector((state) => state.user.role);
  const [showFileInput, setShowFileInput] = useState(false);
  /*  Le bouton "afficher" de EditionImage doit être caché par défault */
  const [showModifyButton, setShowModifyButton] = useState(false);

  // utilisé pour l'affichage conditionnel selon le role

  /* State */

  const [authorName, setAuthorName] = useState(author);
  const [editDescription, setEditDescription] = useState(description);
  const [uploaded_file, setUploaded_file] = useState("");
  const [typeMedia, setTypeMedia] = useState(type);
  const [urlMedia, setUrlMedia] = useState(url);

  const cardId = id;
  const membId = memberId;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {}, [urlMedia, editDescription]);

  const handleFileInput = (event) => {
    setUrlMedia(URL.createObjectURL(event.target.files[0]));
    setUploaded_file(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setEditDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("author", authorName);
    formData.append("uploaded_file", uploaded_file);
    formData.append("description", editDescription);
    formData.append("url", urlMedia);
    formData.append("type", typeMedia);

    formData.append("member_id", membId);

    /*  On log les entrées du formData pour vérifier ce que l'on envoie au back */

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await api.patch(`/card/${id}`, formData);
      console.log(response.data);
    } catch (error) {
      console.log("l'erreur est :", error);
    }
  };
  // Modale de confirmation à la suppression de la carte

  const handleDelete = async () => {
    try {

  await api.delete(`/card/${id}`);
  dispatch(deleteCard(id));     

    } catch (error) {
      console.log("l'erreur est :", error);
    }
  };

  useEffect(() => {
   
   
  }, [cards]);
  return (
    <>
      <div className="card__container">
        <div className="card__header">
          {isUser === "visiteur" ? null : (
            <div className="card__bouton-container">
              <button
                className={`card__button card__button--modify ${
                  showModifyButton ? "valider-active" : ""
                }`}
                onClick={() => {
                  setShowFileInput(!showFileInput);
                  setShowModifyButton(!showModifyButton);
                }}
              >
                {showModifyButton ? "Valider" : "Modifier"}
              </button>

              <button
                className="card__button card__button--cancel"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
        <div className="card__content">
          <form
            className="edition__form"
            onSubmit={handleSubmit}
            type={type}
            id={id}
          >
            <div className="edition__image__container">
              {/*  Modifier la vidéo ou image*/}
              {type === "video" ? (
                <EditionVideo
                  url={
                    urlMedia !== url
                      ? urlMedia
                      : `http://localhost:5000/${urlMedia}`
                  }
                  className="edition_video"
                />
              ) : (
                <img
                  src={
                    urlMedia !== url
                      ? urlMedia
                      : `http://localhost:5000/${urlMedia}`
                  }
                  media={type}
                  type="file"
                  className="edition__image"
                />
              )}

              <span className="image__author">{author}</span>
            </div>

            {showFileInput && (
              <input
                name="file"
                className="edition__image__upload"
                type="file"
                onChange={handleFileInput}
              />
            )}

            {showModifyButton && (
              <button
                onClick={() => setShowFileInput(!showFileInput)}
                className="edition__button__image--modify"
              ></button>
            )}
            <p className="description">{editDescription}</p>

            {showModifyButton && (
              <div className="edition__button__container">
                <button type="submit" className="edition__description__button">
                  Valider les modifications
                </button>

                {/*   On clique sur "MOdifier la description", on affiche l'input de saisie en dessous de  la description */}

                <input
                  type="text"
                  className="edition__input__description"
                  name="description"
                  value={editDescription}
                  onChange={handleDescriptionChange}
                  id={id}
                />
              </div>
            )}
          </form>

          <Comment key={id} author={author}></Comment>
        </div>
      </div>
    </>
  );



};

Card.propTypes = {
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Card;