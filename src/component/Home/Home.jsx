import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import { actionlogin } from "../../actions/user";
import api from '../../api';
import { useNavigate } from "react-router-dom";
import ModaleCode from '../Modale/ModaleCode';
import "./Home.css";


export default function Home() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
 /*  const isUser = useSelector((state) => state.user.role); */
 
  
/* On vérifie si un utilisateur est connecté en consultant les données stockées via le sessionStorage, si on trouve un token et un email, on envoie une action de connexion via "dispatch(actionlogin..." */
useEffect(() => {
  const email = sessionStorage.getItem("email");
  const role = sessionStorage.getItem("role");
  console.log(role)

  if (email && role) {
    dispatch(actionlogin(email, role));
  }
}, [dispatch]);


  // action au clique sur le bouton "Espace Pro"
  const handleSubmit = (event) => {
    setShowModal(true);
  }

  // action au clique sur le bouton "Valider" de la modale
  const handleSubmitCode = async (event) => {
    event.preventDefault();
  
    try {

      // const response = await api.post('/api/code/code', { code });
      // console.log(response);
      
      if (code === "abc" /* response.status=== 200 */) {
        //  if (code) {
          // dispatch(actionCode(code, "token"));
          navigate("/registration");
          setError("");
        } else {
          setError("Code incorrect et/ou vous n'avez pas les droits pour accéder à cet espace");
        }  

      // } else {
      //     // console.log(response)
      // }

    } catch (error) {
      console.log(error);
      setError(`Erreur d'envoi du code`);
    }

    if (code === "abc") {
      setError("");
    } else {
      setError("Code incorrect et/ou vous n'avez pas les droits pour accéder à cet espace");
    } 

}

  // action au clique sur le bouton "Fermer" de la modale
  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };


  return (
    <div className="home__container">

      {/*Si l'utilisateur n'est pas connecté, on affiche "connexion" et "Inscription", sinon on n'affiche rien */}
      {!isLoggedIn ? (

        <React.Fragment>

          <div className="home__banner">

            <div className="home__buttons">

              {/* Espace Pro */}
              <button className="home__button" onClick={handleSubmit}>
                <span className="home__button-content">Espace Pro</span>
              </button>

              {/* Connexion */}
              <Link to="/login">
                <button className="home__button">
                  <span className="home__button-content">Connexion</span>
                </button>
              </Link>

            </div>

            <div className="modale-code__block">
              
              <div className="modale-code">

                {/* On affiche un message erreur dans l'input si le mot de passe ou l'email est incorrect */}
                {error && (
                  <p className="modale-code__error-message">
                    {error}
                  </p>
                )}

                {showModal && (

                  <ModaleCode onClose={handleCloseModal}>

                    <p className='modale-code__text'>Code autorisation</p>

                    <input 
                    className={`modale-code__input`}
                    ref={inputRef}
                    type="code"
                    value={code}
                    placeholder="Code"
                    onChange={(event) => setCode(event.target.value)}
                    />

                    <button className='modale-code__button' onClick={handleSubmitCode}>Valider</button>

                    <button className='modale-code__button' onClick={handleCloseModal}>Fermer</button>

                  </ModaleCode>

                )}

              </div>

            </div>
            
          </div>

        <p className="home__slogan">Le blog fait pour toi</p>

        </React.Fragment>

      ) : null}

      {/* Si l'utilisateur est connecté, on affiche le menu, sinon on n'affiche rien */}
      {isLoggedIn ? (

        <React.Fragment>

          <Header /> 
        

            <p className='home__presentation'>
              C'est quoi BloGGy ?<br />
              C'est un blog pour toi, utilise-le !!!<br />
              Tu as particulièrement aimé un article d'un journal ? Partage-le !<br />
              Mets tes dessins, tes photos, des images qui t'on plus !<br />
              Charge tes vidéos !<br />
              Tu as fait un super stage ? Témoigne !!
            </p>

        </React.Fragment>
       
      ) : null}
    
    </div>
    
  );
}