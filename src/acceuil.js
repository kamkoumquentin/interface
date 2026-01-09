
import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Acceuil(props){

    var url=useNavigate();
    var [nom,setnom]=useState("");
    

  var rechercher=(e)=>{
            
     if(nom!=""){
      url('/resultat/',{state: nom});
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
        <Link to="http://localhost:3000/ajout_user" className="ajouter_produit">ajouter un element</Link>
      </main> 
     );
 }


export default Acceuil;