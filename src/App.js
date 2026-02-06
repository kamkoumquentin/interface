import logo from './logo.svg';
import './App.css';
import {Route,Routes } from 'react-router-dom';
import Acceuil from './acceuil';
import Affiche from './affiche';
import { useParams } from 'react-router-dom';
import AdmListe from './admin';
import Modifier from './form_modifier';
import Ajout from './ajout';
import Add from './ajout_user';


function App() {
  
  return  (
    
     <Routes>
       
       <Route path='/' element={<Acceuil titre="ThinkCore"/>} />
       <Route path='/resultat/:val' element={<Affiche/>}/>
       <Route path='/admin_acceuil' element={<AdmListe/>} />
       <Route path='/modifier/:id' element={<Modifier/>}  />
       <Route path='/ajouter' element={<Ajout/>} />
       <Route path='/ajout_user' element={<Add/>} />
    </Routes>
  
  )
   

}

export default App;
