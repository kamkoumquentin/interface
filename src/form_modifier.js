import React from "react";
import "./form_modifier.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function Modifier(){

var [tab,settab]=useState([{id:"",nom:"",description:"",lien:""}]);
var id =useParams();
var naviger=useNavigate();

var appele= async ()=>{
         
     try{
      
      
    var reponse= await axios.get('https://serveur-search.onrender.com/af/'+id.id);
      console.log(reponse.data);
      settab(reponse.data);  
     
    }
     catch(e){
           
        console.log("erreur aff "+e);

     }
}

var modifier=async (e)=>{

   e.preventDefault();
     console.log({...tab[0]});
    var rep= await axios.post("https://serveur-search.onrender.com/valide_mod",{...tab[0]});

       naviger("/admin_acceuil");
      
}

var retour=(e)=>{

 e.preventDefault();
 naviger("/admin_acceuil");
 console.log("action annuler");
 

}


useEffect(()=>{

   
  appele();

console.dir(tab[0]);
},[])




return(

     ( 
     <form   class="form">
        <input className="input" value={tab[0].nom} type="text" onChange={(e)=>( settab([{id:tab[0].id ,nom:e.target.value,description:tab[0].description,lien:tab[0].lien}]))}    />
        <input className="input" value={tab[0].description} type="text" onChange={(e)=>(settab([{id:tab[0].id,description:e.target.value,nom:tab[0].nom,lien:tab[0].lien}]))} />
        <input className="input" value={tab[0].lien} type="text" onChange={(e)=>(settab([{id:tab[0].id,lien:e.target.value,description:tab[0].description,nom:tab[0].nom}]))} />
     <p class="b_groupe"><button className="conf"  onClick={modifier}  >confirmer</button><button onClick={retour} className="conf">annuler</button></p>
       </form>
      )
    

)
}



export default Modifier;