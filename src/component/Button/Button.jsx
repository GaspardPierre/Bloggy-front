import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export default function Button() {
  return (
    <React.Fragment>
      {/* Button */}
      <Link to='/'>
        <button className='menu__button menu__button--current'>
            <span className='menu__button-content'>Accueil</span>
        </button>
      </Link>
    </React.Fragment>
  )
}
