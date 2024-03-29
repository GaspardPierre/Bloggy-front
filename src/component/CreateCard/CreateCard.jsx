import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import api from "../../api";
import { addCard } from "../../actions/card";

import './CreateCard.css';


//je souhaite récupérer l'id de l'utilisateur connecté pour l'envoyer dans le formulaire de création de carte
//j'ai essayé de le faire avec le useSelector mais je n'arrive pas à le récupérer


export default function  CreateCard({onFormSubmit}) {

  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);
 

  

  
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [uploaded_file, setUploaded_file] = useState(null);
  const [type, setType] = useState("");
  const member_id = sessionStorage.getItem("id");
  console.log(  member_id);
  
  
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    console.log(event.target)
    event.preventDefault();

    const formData = new FormData();
    formData.append("author", author);
    formData.append("uploaded_file", uploaded_file);
    formData.append("description", description);
    formData.append("url", url);
    formData.append("type", type);
    formData.append("member_id", member_id);
   
    

    try {
      const response = await axios.post("http://localhost:5000/api/card/addCard", formData,  { withCredentials: true });
    
      const newCard = response.data;
      alert("Carte ajoutée!");

     dispatch(addCard(newCard));
     onFormSubmit();
      
    
    } catch (error) {
      console.error(error);
    } 
  };
 
  useEffect(() => {
   
    console.log("Cards updated:", cards);
  }, [cards]);

  return (
    <div className="form__container">

   
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          name="description"
        />
      </label>
      <br />
      <label>
        Auteur :
        <input
          type="text"
          value={author}
          onChange={(event) => {    console.log(event.target.value);setAuthor(event.target.value);}}
          name="author"
        />
     
      </label>
      <br />
      <label>
        Image:
        <input 
        type="file"
         onChange={(event) => setUploaded_file(event.target.files[0])}
         name="file" />
      </label>
      <br />
      <label>
        Type:
        <input
          type="text"
          value={type}
          onChange={(event) => setType(event.target.value)}
          name="type"
        />
      </label>
      <label>
  Type de média:
  <select value={type} onChange={(event) => setType(event.target.value)}>
    <option value="news">News</option>
    <option value="art">Art</option>
    <option value="video">Vidéo</option>
    <option value="internship">Stage</option>
  </select>
</label>
<br />
<label>
  Url:
  <input
    type="text"
    value={url}
    onChange={(event) => setUrl(event.target.value)}
    name="url"
  />
</label>
      <br />
    
      <button type="submit"
     >Envoyer</button>
    </form>
    </div>
  );
};