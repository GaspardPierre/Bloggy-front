import React, {useState} from 'react'
import Header from "../Header/Header";
import Dico from "../Dico/Dico";
import Papers from "../Papers/Papers";
import Card from "../Card/Card";
import "./News.css";

export default function News() {
  


  return (

    <React.Fragment> 

      <div className='news__container'>

        <Header />

        <Dico />

        <Papers />

        {/* Card */}

     

      

        {/* Fin Card */}
        
      </div>

    </React.Fragment>

  )

}