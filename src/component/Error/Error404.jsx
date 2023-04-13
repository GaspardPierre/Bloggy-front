import { Link } from "react-router-dom";

import './Error404.css'

export default function Error404() {
    return (
        <div
className="error404_container">

            <h1
className="error404_h1">Oops! You seem to be lost.</h1>
        
               <Link to="/">
                <button className="home__button">
                  <span className="home__button-content">Retour à l'accueil</span>
                </button>
              </Link>
           
        </div>
    )
}