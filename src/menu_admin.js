import React from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";



function Menu(){

      var naviger= useNavigate();


    var page=()=>{

        naviger('/admin_acceuil');

    }


     var page1=()=>{

        naviger('/attente');

    }






return (

    <ul className="liste">
        <li onClick={page}>cours proposer par les utilisateur</li>
        <li onClick={page1}>cours validé et en ligne</li>
    </ul>

);


}


export default Menu;
