import React, { useState } from "react";
import Header from "../Header/Header";
import Card from "../Card/Card";
import ModaleCreateCard from "../Modale/ModaleCreateCard";
import { useSelector } from "react-redux";
import useCardFilter from "../../customHook/useCardFilter";

import "./ArtGallery.css";
import CreateCard from "../CreateCard/CreateCard";

export default function ArtGallery() {
  const cards = useSelector((state) => state.cards.cards);
  const [cardNumbers, setCardNumbers] = useState(3);
  const [showMore, setShowMore] = useState(true);
  const [isShowModale, setIsShowModale] = useState(false);
  const filteredCards = useCardFilter(cards, "art");

  const modalToggle = () => {
    setIsShowModale(!isShowModale);
  };
  /* fonction qui ajoute 3 Card  */
  const handleShowMore = () => {
    setCardNumbers(cardNumbers + 3);
    setShowMore(false);
  };

  /* fonction qui enlève 3 Card */
  const handleShowLess = () => {
    setCardNumbers(cardNumbers - 3);
    setShowMore(false);
  };

  const isUser = useSelector((state) => state.user.role);

  return (
    <React.Fragment>
      <div className="art-gallery__container">
        <Header />
        {/* 
          Si User est un "visiteur" on n'ajoute pas "Ajouter un média" */}
        {isUser === "visiteur" ? null : (
          <div className="art-gallery__add-card">
            {/* l'utilisateur clique sur le bouton 'Ajouter un journal' */}
            <button
              className="art-gallery__add-card-button"
              onClick={modalToggle}
            >
              +
            </button>
            <span className="art-gallery__add-card-content">
              Ajouter un média
            </span>
          </div>
        )}

        <div className="art-gallery__card-container">
          {/* Modale d'ajout de Card */}
          {isShowModale && (
            <ModaleCreateCard>
              <CreateCard
              // onAddCard={handleAddCard}//
              />
            </ModaleCreateCard>
          )}
          {/* On affiche les Card (en partant du 1er élément, 
              puis on coupe en fonction de cardNumbers
              si cardNumber = 3 on affiche 3 Card) */}
          {filteredCards.slice(0, cardNumbers).map((item) => (
            <Card
              key={item.id}
              id={item.id}
              description={item.description}
              url={item.url}
              type={item.type}
              author={item.author}
              memberId={item.member_id}
            />
          ))}
        </div>

        <div className="art-gallery__button-container">
          {/* Si on a plus de 3 Card à afficher, on affiche le bouton "Afficher plus" */}
          {cardNumbers < cards.length && (
            <button
              className="art-gallery__button art-gallery__button--more"
              onClick={handleShowMore}
            >
              Afficher plus
            </button>
          )}

          {/* Si on a au moins 6 cartes à afficher, on affiche le bouton "Afficher moins" */}
          {cardNumbers >= 6 && (
            <button
              className="art-gallery__button art-gallery__button--less"
              onClick={handleShowLess}
            >
              Afficher moins
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
