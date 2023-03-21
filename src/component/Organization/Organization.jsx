import React, {useState} from 'react'
import Header from "../Header/Header";
import Card from "../Card/Card";
import "./Organization.css";

export default function Organization() {

  // State
  // Card à afficher 3 par 3
  const [cardNumbers, setCardNumbers] = useState(3);
  // afficher ou non plus de 3 Card
  const [showMore, setShowMore] = useState(true);

  /* fonction qui ajoute 3 Card au clique */
  const handleShowMore = () => {
    setCardNumbers(cardNumbers + 3);
    setShowMore(false)
  };

  /* fonction qui enlève 3 Card au clique */
  const handleShowLess = () => {
    setCardNumbers(cardNumbers -3);
    setShowMore(true)
  };

  const data = [
    { id: 1,},
    { id: 2,},
    { id: 3,},
    { id: 4,},
    { id: 5,}
  ];

  return (

    <React.Fragment >

      <div className='organization__container'>

        <Header />

        <p className='organization__title'>
          Tu cherches un stage ? <br />
          Retrouve la liste des strucures dans la/les villes de ton choix !
        </p>

        <button className='organization__button-return'>
          Retour
        </button>

        {/* Card */}
        
        <div className="organization__card-container">

          {/* On affiche les Card */}
          {/* si cardNumber = 3 -> on affiche 3 Card  */}
          {data.slice(0, cardNumbers).map((item) => (
            <Card key={item.id} title={item.title} id= {item.id} />
          ))}

        </div>

        <div className="organization__button-container">

          {/* Si on a plus de 3 Card à afficher, on affiche le bouton "Afficher plus" */}
          {cardNumbers < data.length && (
            <button className="organization__button organization__button--more" onClick={handleShowMore}>
              Afficher plus
            </button>
          )}

          {/* Si on a au moins 6 cartes à afficher, on affiche le bouton "Afficher moins" */}
          {cardNumbers >= 6 && (
            <button className="organization__button organization__button--less" onClick={handleShowLess}>
              Afficher moins
            </button>
          )}

        </div>

      </div>

    </React.Fragment>

  )

}
