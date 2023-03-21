import React from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { actionlogout } from '../../actions/user';
import { useLocation } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

/* Cette fonction, envoie l'actionlogout qui sera récupéré par le reducer, 
pour supprimer l'Email, le token et passer isLoggedIn à false */

    const handleLogout = () => {
        dispatch(actionlogout());
        navigate('/');
    }
  return (
    <React.Fragment>
        <div className='menu__container'>
            <div className='menu__connect'>

                {/* Home */}
                <Link to='/'>
                    <button className={`menu__button ${location.pathname === '/' ? 'menu__button--current' : ''}`}>
                        <span className='menu__button-content'>Accueil</span>
                    </button>
                </Link>

                {/* News */}
                <Link to='/news'>
                    <button className={`menu__button ${location.pathname === '/news' ? 'menu__button--current' : ''}`}>
                        <span className='menu__button-content'>Actualités</span>
                    </button>
                </Link>

                {/* Videos */}
                <Link to='/videos'>
                    <button className={`menu__button ${location.pathname === '/videos' ? 'menu__button--current' : ''}`}>
                        <span className='menu__button-content'>Vidéos</span>
                    </button>
                </Link>

                {/* Art gallery */}
                <Link to='/art-gallery'>
                    <button className={`menu__button ${location.pathname === '/art-gallery' ? 'menu__button--current' : ''}`}>                 
                        <span className='menu__button-content'>Galerie d'art</span>
                    </button>
                </Link>

                {/* Internships */}
                <Link to='/internship'>
                    <button className={`menu__button ${location.pathname === '/internship' ? 'menu__button--current' : ''}`}>
                        <span className='menu__button-content'>Stages</span>
                    </button>
                </Link>

                {/* Contact */}
                <Link to='/contact'>
                    <button className='menu__button'>
                        <span className='menu__button-content'>Contact</span>
                    </button>
                </Link>
            </div>

            <div className='menu__disconnect'>
                <span className='menu__greeting'>Bonjour !</span>
                {/* Disonnect */}
                <Link to='/'>
                    <button className='menu__button' onClick={handleLogout}>
                        <span className='menu__button-content'>Déconnexion</span>
                    </button>
                </Link>
            </div>

        </div>
    </React.Fragment>
  )
}
