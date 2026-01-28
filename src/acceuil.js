
import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Acceuil(props){

    var url=useNavigate();
    var [nom,setnom]=useState("");
    

  var rechercher=async(e)=>{
            
     if(nom!=""){
      url('/resultat/'+nom);  
     }
  }


  var changer=(e)=>{

      setnom (e.target.value);
  }



 return(<main className="main1"> 
        <h1 className="titre">{props.titre}</h1>   
        <section className="main">
           <input className="barre_recherche" type="text" name="barre" value={nom}  onChange={changer}   placeholder="entrer le nom du cours ou de l'epreuve que vous voulez" />
           <button onClick={rechercher} className="search" title="cliquer pour rechercher" ></button>
        </section>
        <Link to="/ajout_user" className="ajouter_produit">Contribuer un Savoir</Link>
      </main> 
     );
 }


export default Acceuil;
