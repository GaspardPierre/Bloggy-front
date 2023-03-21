import api from '../../api';
import React, {useState} from 'react';
import "./Papers.css";

export default function Papers() {

    // affichage ou non du champ de saisie d'un nouveau journal
    const [isPaperFormVisible, setIsPaperFormVisible] = useState(false);
    // liste des journaux existants
    const [papers, setPapers] = useState([]);
    // nouveau journal
    const [newPaper, setNewPaper] = useState('');
    // édition ou non d'un nouveau lien de journal
    const [editingPaperIndex, setEditingPaperIndex] = useState(-1);
    // nouvelle image
    const [newImage, setNewImage] = useState('');
    // liste des images existantes
    const [images, setImages] = useState([]);
    // édition ou non d'un nouveau lien de journal
    const [editingImageIndex, setEditingImageIndex] = useState(-1);
    // affichage ou non de l'upload d'une nouvelle image
    const [isImageUploadVisible, setIsImageUploadVisible] = useState(false);  
    // message d'erreur
    const [error, setError] = useState("");


    // action au clique sur le bouton 'Ajouter un commentaire'
    const handleAddPaper = () => {
        // on rend visible le champ de saisie
        setIsPaperFormVisible(true);
        // on rend visible le bouton d'upload d'image
        setIsImageUploadVisible(true);
    };

    // action au clique sur le bouton 'Annuler'
    const handleCancelPaper = () => {
      // cache le formulaire de saisie
      setIsPaperFormVisible(false);
      // efface le contenu du champ de saisie
      setNewPaper('');
      // paper en cours d'édition annulé donc d'index -1
      setEditingPaperIndex(-1);
    }



    // action au clique sur le bouton 'Valider'
    const handleSubmitPaper =  async (event) => {
      // empếche le comportement par défaut
      event.preventDefault();

      try {

        const response = await api.post('/api/add/addPaper', { newPaper }, {withCredentials:true});
        console.log(response);
  
        if (response.status=== 200) {

          // si aucun paper en cours d'édition
          if (editingPaperIndex === -1) {
            // on ajoute le nouveau paper dans la liste
            setPapers([...papers, newPaper]);
            // on ajoute la nouvelle imahhe dans la liste
            setImages([...images, newImage]);

          // si un paper en cours d'édition
          } else {

            // création d'une copie de la liste des papers
            const newPapers = [...papers];
            // on remplace le paper à l'index correspondant
            newPapers[editingPaperIndex] = newPaper;
            // on met à jour la liste avec la copie
            setPapers(newPapers);

            // création d'une copie de la liste des images
            const newImages = [...images];
            // on remplace l'image à l'index correspondant
            newImages[editingImageIndex] = newImage;
            // on met à jour la liste avec la copie
            setImages(newImages);

            // l'édition du paper est terminée
            setEditingPaperIndex(-1);
          }

        } else {
          console.log(response)
        }

      } catch (error) {
        console.log(error);
        setError(`Erreur d'enregistrement`);
      }

      // on cache le formulaire de saisie
      setIsPaperFormVisible(false);      
      // on efface le contenu du champ de saisie
      setNewPaper('');

    }

    // action du clique sur le bouton 'Supprimer' d'un lien 
    const handleDeletePaper = (index) => {

      // nouvelle copie de la liste des papers
      const newPapers = [...papers];
      // on supprime le paper à l'index indiqué
      newPapers.splice(index, 1);
      // maj de la liste avec la copie
      setPapers(newPapers);

      // nouvelle copie de la liste des papers
      const newImages = [...images];
      // on supprime le paper à l'index indiqué
      newImages.splice(index, 1);
      // maj de la liste avec la copie
      setImages(newImages);
    }
    
    // upload de l'image
    // action au clique sur le bouton "Choisir une image"
    const handleNewImage = (event) => { 
        setNewImage(URL.createObjectURL(event.target.files[0])); 
    }
        
 

  return (

    <React.Fragment>

      <div className='papers__container'>
        
        <div className='papers__edit-form'>

          <p className='papers__title'>Journaux à consulter</p>

          <div className='papers__add'>
              {/* l'utilisateur clique sur le bouton 'Ajouter un journal' */}
              <button className='papers__add-button' onClick={handleAddPaper}>+</button>
              <span className='papers__add-content'>Ajouter un journal</span>
          </div>

          {/* on affiche le formulaire de champ de saisie et les boutons Valider et Annuler */}
            {isPaperFormVisible && (
                <form className='papers__form' onSubmit={handleSubmitPaper}>
                
                    <input 
                        className='papers__input-paper'
                        type='text'
                        value={newPaper}
                        placeholder="Entrer l'url du journal"
                        // au clique on récupère la valeur de l'input et on maj sa valeur avec setNewPaper
                        onChange={(e) => setNewPaper(e.target.value)}
                    />

                    {isImageUploadVisible && (
                        <input 
                            className='papers__input-upload'
                            type="file" 
                            onChange={handleNewImage}
                        />
                    )}

                    <div className='papers__input-image'>
                        <button className='papers__button papers__button--confirm' type="submit">
                            Valider
                        </button>
                        <button className='papers__button papers__button--cancel' onClick={handleCancelPaper}>
                            Annuler
                        </button>
                    </div>

                </form>
            )}

        </div>

        <ul className='papers__container-list'>

            {papers.map((paper, index) => (
                <li key={index} className='papers__list' >
                    <a href={paper}>
                        <img className='papers__image' src={images[index]} alt={`image pour ${paper}`} />
                    </a>
                    <button className='papers__button papers__button--delete' onClick={() => handleDeletePaper(index)}>
                        Supprimer
                    </button>
                </li>

            ))}

        </ul>
        
      </div>

    </React.Fragment>

  )

}


// http://news.tremplin.be/
// https://www.wow-news.eu/articles
// https://www.jde.fr/
// https://www.geekjunior.fr/
// https://www.curionautes.com/actus/
// https://www.1jour1actu.com/
// https://www.juliemag.com/actus/
// https://www.geoado.com/
// https://www.lemondedesados.fr/
// https://www.vocable.fr/
