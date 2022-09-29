import "./nouveauclient.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbarclient from "../../components/navbar/Navbarclient";
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
  datenaiss:"",
  numero:"",
  produit:""

}


const Nouveauclient = () => {

const [state, setState] = useState(initialState);
const [data, setData] = useState({});
const {nom, prenom ,email,cin,datenaiss,numero,produit}= state;
const navigate = useNavigate();
const handleInputChange = (e) => {
      const {name, value} = e.target;
      setState({ ...state, [name]: value});
    };
const { id } = useParams();

useEffect(() => {
  id && getSingleClient();
},id) ;

const getSingleClient = async () => {
  const docRef = doc(db, "client" , id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()){
    setState({ ...snapshot.data()});
  }};





 const  handleSubmit  = async (e) => {
e.preventDefault();
if (!id) { 
  
  if (!nom || !prenom || !email || !cin || !datenaiss || !numero || !produit){
    toast.error("entrez tous les élèments");
  }else {
    addDoc(collection(db, "client"),{
      nom: state.nom,
      prenom:state.prenom,
      email: state.email,
      cin: state.cin,   
      datenaiss: state.datenaiss,
      numero: state.numero,
      produit: state.produit
      
    });
   
  
     toast.success("employé enregistré avec succé");
     
  
}} else {
  
 await updateDoc(doc(db, "client",id),{
    nom: state.nom,
    prenom:state.prenom,
    email: state.email,
    cin: state.cin,   
    datenaiss: state.datenaiss,
    numero: state.numero,
    produit: state.produit,
    
  });
  toast.success("modification avec succé");

}
navigate("/listeclient");
} ;


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbarclient />
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
              
              <label htmlFor="nom">Date de naissance   </label>
              <input type="date" id="datenaiss" name="datenaiss" placeholder="datenaiss" value={datenaiss} onChange={handleInputChange}/>
              <div>

              </div>
              <label htmlFor="nom">Numéro</label>
              <input type="number" id="numero" name="numero" placeholder="Numéro" value={numero} onChange={handleInputChange}/>

              <label htmlFor="nom">produit</label>
              <input type="text" id="produit" name="produit" placeholder="produit" value={produit} onChange={handleInputChange}/>
              
              <input type="submit" value="Enregister"/>
              
             </form>
         </div>
      </div>
    </div>
  );
};

export default Nouveauclient;