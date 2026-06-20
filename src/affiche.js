import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

 


function Affiche(props){
  
      var {val}=useParams();
      var [tab,settab]= useState([]);
      var [champs,setchamp]=useState(val);
      var aller= useNavigate();

       useEffect(()=>{
        var debut=  async ()=>{   
          var part = await axios.get("https://serveur-search.onrender.com/envoi/"+val);
          window.history.replaceState({}, document.title);
           console.log(part.data);
          settab(part.data);
          
        }
        debut();

       },[val]);


           const getDownloadLink = (url) => {
  // On insère 'fl_attachment' dans l'URL de Cloudinary
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
};
      
var prendre= (e)=>{


  aller('/liseuse',{state:e.target.id });
   

}    


   var envoi=async (e)=>{

               if(champs.length!=0){

                  aller('/resultat/'+champs);
                
                    console.log('appuyer');
               }
   }




if( Array.isArray(tab) && tab.length!= 0){

return(
<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",position:"relative",width:"98vw",minHeight:"100vh"}}>
    <header> 
        <h1 className="titre" onClick={()=>(aller('/'))} >Thinkcore</h1>   
        <section className="main2">
           <input className="barre_recherche2" onKeyDown={(e)=>{ if(e.key=="Enter"){envoi()} }} type="text"  value={champs} onChange={(e)=>{setchamp(e.target.value);}}  name="nom"  /><button onClick={envoi} className="search2" title="cliquer pour rechercher" ></button>
        </section>
     </header>
            
      <main class="corps_resul" aria-placeholder="dvvv">
          
          {
       
            
             tab.map((valeur,index)=>{

          
             return(
     
    <div className="produit" id={"per"+index}>
    <img className="representation"  src="/livre.png" alt={valeur.lien}/>
    <section className="corps_result1">
       <h2 className="titre1">{valeur.nom}</h2>
       <p className="auteur">par {valeur.auteur}</p>
       <p className="description">{valeur.description}</p>
       <p className="bouton3"><button className="tele" title="lancer le telechargement" ><a href={getDownloadLink(valeur.lien)}  target="_blank" rel="noopener noreferrer" download >  telecharger</a></button></p>
       <p className="bouton3"><button id={valeur.id} onClick={prendre} className="tele" title="lire le livre" >consulter un livre</button></p>
    </section>
    </div>

             )
           

            
            

             })
            } 

                  
           
      </main>

</div>)


 }
 else{

   return(
<>
              
    <header> 
        <h1 className="titre" onClick={()=>(aller('/'))} >ThinkCore</h1>   
        <section className="main2">
           <input className="barre_recherche2" onKeyDown={(e)=>{ if(e.key=="Enter"){envoi()} }} type="text"  value={champs} onChange={(e)=>{setchamp(e.target.value);}}  name="nom"  /><button onClick={envoi} className="search2" title="cliquer pour rechercher" ></button>
        </section>
     </header>
            
      <main class="corps_result" aria-placeholder="dvvv">
          
          
            <h1 className="no_result">aucun resultat pour le moment</h1> 

            
       
      </main>

</>)

   
    

 }
}



export default Affiche;
