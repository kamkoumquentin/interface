import React, { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import './admin.css';
import { json, useNavigate } from "react-router-dom";
import {useEffect} from "react"



function AdmListe(props,refs){

 var [coeur, setcoeur]=useState('supprimer');
 var [liste, setliste]=useState([]); 
 var tab=useRef([]); 
 var sup= useRef([]);  
 
 var naviger=useNavigate();
 
 var merci=async ()=>{
 try{
         var reponse= await axios.get("http://localhost:8080/affichage");
           
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





 

 var detection=(e)=>{

     tab.current.forEach((valeur,index)=>{

    if(e.currentTarget===valeur){

      console.log(index);
      naviger("/modifier/"+valeur.className);
    }

   })
     };
 


  var supprimer=(e)=>{

                console.dir(sup.current);
 
      sup.current.forEach(async (val,index)=>{
                            

                if(e.currentTarget===val){

                    var reponse= await axios.post("http://localhost:8080/supprimer",{id:val.className});
                    console.log(index);
                    if(reponse){
                           merci();
                    }
                }

      });





  }







return(
     <>
    <table className="tableau">
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
            <td className="cellule"> <button name="modifier1"  className={valeur.id}  ref={(el)=>(tab.current[index]=el)}     onClick={detection} >modifier</button><button  className={valeur.id}  ref={(k)=>(sup.current[index]=k)}   onClick={supprimer} >{coeur}</button></td>
            </tr>)
            })
              } 
         </tbody>
        
      </table>

    <p className="p_ajout"><button className="ajout" onClick={()=>(naviger('/ajouter'))}>ajouter</button></p> 
      </>
)

}

export default AdmListe;