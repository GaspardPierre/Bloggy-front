import { useState, useEffect } from "react";
import { useSelector} from "react-redux";




function useCardFilter(cards, type) {
  cards = useSelector((state) => state.cards.cards); 
  const [filteredCards, setFilteredCards] = useState([]);
   
  useEffect(() => {
  
    const cardFilter = cards.filter((card) => card.type === type);
    setFilteredCards(cardFilter);
  }, [cards, type]);

  return filteredCards;
}

export default useCardFilter;
