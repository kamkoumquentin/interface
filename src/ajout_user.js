import React from "react";
import "./form_modifier.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function Add(){

var [tab,settab]=useState([{id:"",nom:"",description:"",lien:"",auteur:""}]);


var naviger=useNavigate();


var ajouter=async (e)=>{

              if(tab[0].lien){

                    console.dir({...tab[0]})     
    var rep= await axios.post("https://serveur-search.onrender.com/ajouter_t",{...tab[0]});
             if(rep){
       naviger("/");
             }
              }
}

var retour=(e)=>{

 e.preventDefault();
 naviger("/");
 console.log("action annuler");
 
}


var fichier = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const donne = new FormData();
    donne.append('lien', file);

    try {
        const res = await axios.post('https://serveur-search.onrender.com/gestion', donne);
        // On met à jour l'état seulement si le serveur répond 200
        settab([{ ...tab[0], lien: res.data.path }]);
    } catch (er) {
        // Si ça crash, on attrape l'erreur ici au lieu de laisser l'app planter
        console.error("L'upload a échoué :", er.response ? er.response.data : er.message);
        alert("Erreur lors de l'envoi du fichier au serveur.");
    }
};



return(

     ( 
     <div   class="form">
        <input className="input" placeholder="quel est le nom de votre cours" value={tab[0].nom} type="text" onChange={(e)=>( settab([{id:tab[0].id,nom:e.target.value,description:tab[0].description,lien:tab[0].lien,auteur: tab[0].auteur}]))}    />
        <input className="input" placeholder="ce cours parle de quoi?" value={tab[0].description} type="text" onChange={(e)=>(settab([{id:tab[0].id,description:e.target.value,nom:tab[0].nom,lien:tab[0].lien,auteur: tab[0].auteur}]))} />
        <input id="file" className="input" placeholder="quel est son visuel ?"  type="file" onChange={fichier}/>
        <input className="input" placeholder="quel est votre nom ?" type="text" value={tab[0].auteur} onChange={(e)=>( settab([{...tab[0],auteur:e.target.value}]))} />
     <p class="b_groupe"><button className="conf" onClick={ajouter}  >confirmer</button><button  onClick={retour} className="conf">annuler</button></p>
       </div>
      )
    
)
}



export default Add;
