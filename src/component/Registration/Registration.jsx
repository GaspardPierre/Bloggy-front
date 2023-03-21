import api from '../../api';
import React, { useState, useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import ModaleRegistration from '../Modale/ModaleRegistration';
import "./Registration.css";



export default function Registration() {

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const [showModal, setShowModal] = useState(false);

    const inputRef = useRef(null);

    const [error, setError] = useState("");


    useEffect(() => {
    inputRef.current.focus();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {

        const response = await api.post('/api/member/addMember', { pseudo, email, password });
        console.log(response);
        
        if (response.status=== 200) {
           if (pseudo && email && password === passwordRepeat) {
            setShowModal(true);
            setError("");
          } else if (password !== passwordRepeat) {
            setError("Les mots de passe doivent être identiques");
          } else if (!(pseudo && email && password && passwordRepeat) !== "") {
            setError("Tous les champs sont requis");
          } else {
            setError("Veuillez vérifier vos informations d'inscription");
          }  

        } else {
            console.log(response)
        }

      } catch (error) {
        console.log(error);
        setError(`Erreur d'enregistrement`);
      }

      if (pseudo && email && password === passwordRepeat) {
        setShowModal(true);
        setError("");
      } else if (password !== passwordRepeat) {
        setError("Les mots de passe doivent être identiques");
      } else if (!(pseudo && email && password && passwordRepeat) !== "") {
        setError("Tous les champs sont requis");
      } else {
        setError("Veuillez vérifier vos informations d'inscription");
      } 

}


const handleCloseError = () => {
  setError("");
};


const handleCloseModal = () => {
  setShowModal(false);
  // Redirige vers la page de connexion 
  window.location.replace('/login');
};
  

    return (
        <React.Fragment>

            <div className="regist__container">

                <div className="regist__banner">

                    {/* Bouton Accueil */}
                    <Link to="/">
                    <button className="regist__button regist__button--welcome">
                        <span className="regist__button-content">Accueil</span>
                    </button>
                    </Link>

                </div>

                {/* Formulaire d'inscription */}
                <form  onSubmit={handleSubmit}
                action="" className="regist-form" method="">
                    <div className="regist-form__informations">
                        <legend className="regist-form__title">S'inscrire</legend>

                        <label>
                            <input
                                className="regist-form__input"
                                ref={inputRef} /* focus sur le champ */
                                type="text"
                                value={pseudo}
                                placeholder="Pseudo"
                                onChange={(event) => setPseudo(event.target.value)}
                            />
                        </label>

                        <label>
                            <input
                                className={`regist-form__input ${error ? "error" : ""}`}
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </label>

                        <label>
                            <input
                                className="regist-form__input"
                                type="password"
                                value={password}
                                placeholder="Mot de passe"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </label>

                        <label>
                            <input
                                className="regist-form__input"
                                type="password"
                                value={passwordRepeat}
                                placeholder="Répétez le mot de passe"
                                onChange={(event) => setPasswordRepeat(event.target.value)}
                            />
                        </label>

                        {/* Bouton validez */}
                        <button
                            type="submit"
                            className="regist__button regist__button--confirm"
                        >
                            <span className="regist__button-content regist__button-content--confirm">Validez</span>
                        </button>

                        {error && (
                          <p className="regist__error-message" onClick={handleCloseError}>
                            {error}
                          </p>
                        )}

                    </div> {/* Fin div form__informations */}
                    
                </form> {/* Fin du formulaire d'inscription */}

                {showModal && (

                  <ModaleRegistration onClose={handleCloseModal}>

                    <p className='modale__message'>Votre compte est créé !</p>

                    <button className='modale__button' onClick={handleCloseModal}>Cliquez ici pour vous connecter</button>
                  
                  </ModaleRegistration>

                )}

            </div> {/* Fin div regist__container */}

        </React.Fragment>
    )
}