import React from 'react'
import Header from "../Header/Header";
import "./Contact.css";

export default function Contact() {
  return (
    <React.Fragment>
      <div className='contact__container'>
        <Header />
        <div className='contact__bloc-informations'>
          <p className='contact__informations'>
          Service de soin<br />
          16 rue du jeune<br />
          12345 SocialCity<br /><br />

          Téléphone du service<br /> 
          01 23 45 67 89<br /><br />

          Email du service<br /> 
          service@gmail.com
        </p>
        </div>
        
      </div>
    </React.Fragment>
  )
}