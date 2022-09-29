import "./nouveaufournisseur.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbarfournisseur from "../../components/navbar/Navbarfournisseur";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import database, {db } from "../../firebase";
import { toast } from "react-toastify";

import { addDoc, collection,getDoc, doc , updateDoc } from "firebase/firestore"; 



const initialState = {
  nom: "",
  prenom: "",
  email:"",
  cin:"",
  numero:"",
  modepay:"",
  nsociete:"",
  tsociete:""

}


const Nouveaufournisseur = () => {

const [state, setState] = useState(initialState);
const [data, setData] = useState({});
const {nom, prenom ,email,cin,numero,modepay,nsociete,tsociete}= state;
const navigate = useNavigate();
const handleInputChange = (e) => {
      const {name, value} = e.target;
      setState({ ...state, [name]: value});
    };
const { id } = useParams();

useEffect(() => {
  id && getSingleEmploye();
},id) ;

const getSingleEmploye = async () => {
  const docRef = doc(db, "fournisseur" , id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()){
    setState({ ...snapshot.data()});
  }};





 const  handleSubmit  = async (e) => {
e.preventDefault();
if (!id) { 
  
  if (!nom || !prenom || !email || !cin || !numero || !modepay ||!nsociete ||!tsociete){
    toast.error("entrez tous les élèments");
  }else {
    addDoc(collection(db, "fournisseur"),{
      nom: state.nom,
      prenom:state.prenom,
      email: state.email,
      cin: state.cin,   
      numero: state.numero,
      modepay: state.modepay,
      nsociete: state.nsociete,
      tsociete: state.tsociete
      
    });
   
  
     toast.success("employé enregistré avec succé");
     
  
}} else {
  
 await updateDoc(doc(db, "fournisseur",id),{
    nom: state.nom,
    prenom:state.prenom,
    email: state.email,
    cin: state.cin,   
    numero: state.numero,
    modepay: state.modepay,
    nsociete: state.nsociete,
    tsociete: state.tsociete
    
  });
  toast.success("modification avec succé");

}
navigate("/listefournisseur");
} ;


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbarfournisseur />
         <div style={{marginTop: "100px"}}>
            <form  style={{ margin: "auto", padding:"15px", maxWidth: "400px", alignContent: "center",}}
             onSubmit={handleSubmit}>

              <label htmlFor="nom">Nom</label>
              <input type="text" id="nom" name="nom" placeholder="nom" value={nom} onChange={handleInputChange}/>

              <label htmlFor="nom">Prénom</label>
              <input type="text" id="prenom" name="prenom" placeholder="prénom" value={prenom} onChange={handleInputChange}/>

              <label htmlFor="nom">Email</label>
              <input type="email" id="email" name="email" placeholder="email" value={email} onChange={handleInputChange}/>
              
              <label htmlFor="nom">CIN</label>
              <input type="text" id="cin" name="cin" placeholder="CIN" value={cin} onChange={handleInputChange}/>
              
              <label htmlFor="nom">Numéro</label>
              <input type="number" id="numero" name="numero" placeholder="Numéro" value={numero} onChange={handleInputChange}/>
              
              <label htmlFor="nom">Mode de paiement</label>
              <input type="text" id="modepay" name="modepay" placeholder="modepay" value={modepay} onChange={handleInputChange}/>

              <label htmlFor="nom"> nom de société</label>
              <input type="text" id="nsociete" name="nsociete" placeholder="nsociete" value={nsociete} onChange={handleInputChange}/>

              <label htmlFor="nom">Type de société</label>
              <input type="text" id="tsociete" name="tsociete" placeholder="tsociete" value={tsociete} onChange={handleInputChange}/>

              <input type="submit" value="Enregister"/>
              
             </form>
         </div>
      </div>
    </div>
  );
};

export default Nouveaufournisseur;