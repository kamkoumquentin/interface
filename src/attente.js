import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import './admin.css';
import { json, useNavigate } from "react-router-dom";
import {useEffect} from "react"



function Attente(props,refs){

 var [coeur, setcoeur]=useState('supprimer');
 var [liste, setliste]=useState([]); 
 var tab=useRef([]); 
 var sup= useRef([]);  
 
 var naviger=useNavigate();
 
 var merci=async ()=>{
 try{
         var reponse= await axios.get("https://serveur-search.onrender.com/affichage_t");
           
            setliste(reponse.data);
            console.dir(reponse.data);
           
   }
   catch(err){

         console.log('erreur bd '+err);
   }

   }

useEffect(()=>{

   merci();


 },[]);





 

 var valider=(e)=>{

     tab.current.forEach((valeur,index)=>{

          if(e.currentTarget===valeur){

           console.log(valeur.className);
  /* ( async ()=>{ try{
         
         var reponse= await axios.get('https://serveur-search.onrender.com/af/'+valeur.className);
                     const donnee= reponse.data;
                        console.dir(donnee);
              var rep= await axios.post("https://serveur-search.onrender.com/ajouter",donnee);
                
            console.dir(rep);
            console.log('partie');
           
   }
   catch(err){

         console.log('erreur bd '+err);
   }})()
*/

}

   })
     };
 


  var supprimer=(e)=>{

                console.dir(sup.current);
 
      sup.current.forEach(async (val,index)=>{
                            

                if(e.currentTarget===val){

                    var reponse= await axios.post("https://serveur-search.onrender.com/supprimer_t",{id:val.className});
                    console.log(index);
                    if(reponse){
                           merci();
                    }
                }

      });

  }

   const getDownloadLink = (url) => {
  // On insère 'fl_attachment' dans l'URL de Cloudinary
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
};







return(
     <>
    <table className="tableau" style={{backgroundColor:"blue"}}>
         <thead className="entete">
         <tr>
            <th>id</th>
            <th>nom</th>
            <th>description</th>
            <th>lien</th> 
            <th>action</th>     
         </tr>
         </thead>
         <tbody>
          {

            liste.map((valeur,index)=>{ 
               console.log(valeur.nom);
         return (  <tr key={index}>
            <td  className="cellule">{valeur.id}</td>    
            <td className="cellule">{valeur.nom}</td>
            <td className="cellule">{valeur.description}</td>
            <td className="cellule">{valeur.lien}</td>
            <td className="cellule"> <button name="modifier1"  className={valeur.id}  ref={(el)=>(tab.current[index]=el)} onClick={valider} >valider</button><button  className={valeur.id}  ref={(k)=>(sup.current[index]=k)}   onClick={supprimer} >{coeur}</button><button className="tele" title="lancer le telechargement" ><a href={getDownloadLink(valeur.lien)}  target="_blank" rel="noopener noreferrer" download >  telecharger</a></button></td>
            </tr>)
            })
              } 
         </tbody>
        
      </table>

      </>
)

}

export default Attente;
