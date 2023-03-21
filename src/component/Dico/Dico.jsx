import React, { useState } from 'react';
import './Dico.css';

export default function Dico() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const handleChange = (event) => {
    setWord(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // API de Wikipedia
    const res = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${word}`);
    const data = await res.json();
    setDefinition(data.extract);
  }

  return (

    <React.Fragment>

        <div className='dico__container'>

            <form className='dico__search' onSubmit={handleSubmit}>
                <p className='dico__title'>Dictionnaire</p>
                <input className='dico__word' type="text" value={word} onChange={handleChange} />
                <button className='dico__button' type="submit">Rechercher</button>
            </form>

            <div className='dico__result'>
                {/* // vérifie si l'état 'definition' est vrai, 
                si c'est une chaine vide ou non, par ex*/}
                {definition && <p className='dico__definition'>{definition}</p>}
            </div>
            
        </div>

    </React.Fragment>
    
  );
}


