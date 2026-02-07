
 import React from "react";
 import {useNavigate } from "react-router-dom";



 function Menu (){


 var aller=  useNavigate();
 



  return(
 
     <ul style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",cursor:"pointer",backgroundColor:"whitesmoke",width:"75%"}}>
     <li onClick={()=>(aller("/admin_acceuil"))}>en ligne</li>
     <li onClick={()=>(aller("/attente"))}>en attente</li>
     </ul>
  )

 }


export default Menu;