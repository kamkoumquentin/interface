import { Document, pdfjs, Page } from "react-pdf";
import { useState, useEffect } from "react";
import "./App.css";
// Import des styles obligatoires
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useLocation } from "react-router-dom";
import axios from "axios";

// Configuration du worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Liseuse() {

   var [num,setnum]=useState(null);
   var [pag,setpag]=useState(1);
   var [infos,setinfos]=useState({nom :"en cours...",lien:"en cours..."});
   var [width,setwidth]=useState(window.innerWidth>800?800:window.innerWidth-40);
   var [hauteur,sethauteur]=useState(window.innerHeight/2);
   var identifiant= useLocation();

 function manger({numPages}){
  
    setnum(numPages);

 } 
 
 
 useEffect(()=>{

    window.addEventListener('resize',()=>{
      
        setwidth(window.innerWidth>800?800:window.innerWidth-40);
        
    });

   var appele=async ()=>{
     var resultat= await axios.get("https://serveur-search.onrender.com/af/"+identifiant.state);    
      setinfos(resultat.data[0]);
        
      };
      appele();
 },[]);


 var avancer=()=>{

            if(pag!=num){
           setpag(pag+1);
            }
 }


  var reculer=()=>{

            if(pag>1){
           setpag(pag-1);
            }
 }


  const getDownloadLink = (url) => {
  // On insère 'fl_attachment' dans l'URL de Cloudinary
  if (url.includes("cloudinary.com")) {
    return url.replace("/upload/", "/upload/fl_attachment/");
  }
  return url;
};

    


return (
    <div className="corpdf"
    
    
    
    >
    <section style={{display:"flex",justifyContent:"center",position:"relative",alignItems:"center",backgroundColor:"blue",height:"3em",marginTop:"5em",backgroundColor: "#0F0F0F",color: "#EDEDED"}} >
     <p style={{width:"25%",textAlign:'center'}}>ThinkCore</p>
     <p style={{width:"75%",paddingLeft:"7em"}} >{infos.nom}</p>      
    </section>    

    <div style={{backgroundColor:"blue",height:{hauteur},boxShadow:"2px 2px 10px black",position:"fixed",zIndex:"1000",marginTop:"20em"}}>
        <button title="aller sur la page suivante" onClick={avancer} style={{textAlign:"center",backgroundColor:"whitesmoke",width:"100%" }}>+</button>
        <p  onClick={reculer} style={{backgroundColor:"red"}} >{pag}/{num}</p>
        <button title="aller sur la page precedente" style={{textAlign:"center",backgroundColor:"whitesmoke",width:"100%"}}>-</button>
    </div>

    <div className="pdf">
    
    <Document 
      file={ infos.lien}
      onLoadSuccess={manger}
      onLoad={<p>changement en cours</p>}    
    >
     <Page pageNumber={pag} width={width}  />    
 
     </Document>
    </div> 

    </div>
)

}

export default Liseuse;