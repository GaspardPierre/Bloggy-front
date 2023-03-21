import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionlogin} from "../../actions/user";
import { useNavigate } from "react-router-dom";
import api from '../../api';
import "./Login.css";




function Login() {
 

  const inputRef = useRef(null);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);


const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await api.post('/login', { pseudo, email, password });
    console.log(response);
    const role = response.data.member.role/* .role; */
    console.log(role);

    dispatch(actionlogin(email, role));
    navigate("/");
    
   
   
  } catch (error) {
    /* console.log(error.response.data); */
    console.log(error)
    setError("Pseudo, email ou mot de passe incorrects");
    setPseudo("");
    setEmail("");
    setPassword("");
  }
};

  const handleCloseError = () => {
    setError("");
  };

  return (
    <div className="login__container">
      <div className="login__banner">
        <Link to="/">
          <button className="login__button login__button--welcome">
            <span className="login__button-content">Accueil</span>
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form__informations">
          <legend className="login-form__title">Se connecter</legend>

          <label>
            <input
              className={`login-form__input`}
              ref={inputRef}
              type="pseudo"
              value={pseudo}
              placeholder="Pseudo"
              onChange={(event) => setPseudo(event.target.value)}
            />
          </label>

          <label>
            <input
              className={`login-form__input ${error ? "error" : ""}`}
              type="email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            <input
              className="login-form__input"
              type="password"
              value={password}
              placeholder="Mot de passe"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button
          type="submit"
          className="login__button login__button--connexion"
          >
            <span className="login__button-content login__button-content--connect">Connexion</span>
          </button>

          {/*  On affiche un message erreur dans l'input si le mot de passe ou l'email est incorrect */}
          {error && (
            <p className="login-form__error-message" onClick={handleCloseError}>
              {error}
            </p>
          )}

        </div>

      </form>
    </div>
  );
}

export default Login;



