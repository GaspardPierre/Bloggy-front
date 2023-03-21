import React from 'react';
import './ModaleCreateCard.css';

export default function ModaleCreateCard({ children, closeModale}) {
  

  return (

    <div className='modale-create-card__container'>
      {children}
    </div>
    
  )
  
};