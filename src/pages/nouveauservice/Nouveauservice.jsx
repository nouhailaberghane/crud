import "./nouveauservice.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbarservice";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import database, {db } from "../../firebase";
import { toast } from "react-toastify";

import { addDoc, collection,getDoc, doc , updateDoc } from "firebase/firestore"; 



const initialState = {
  intitule: "",
  prix: "",
 

}


const Nouveauservice = () => {

const [state, setState] = useState(initialState);
const [data, setData] = useState({});
const {intitule,prix}= state;
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
  const docRef = doc(db, "service" , id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()){
    setState({ ...snapshot.data()});
  }};





 const  handleSubmit  = async (e) => {
e.preventDefault();
if (!id) { 
  
  if (!intitule || !prix ){
    toast.error("entrez tous les élèments");
  }else {
    addDoc(collection(db, "service"),{
      intitule: state.intitule,
      prix:state.prix,
      
      
    });
   
  
     toast.success("employé enregistré avec succé");
     
  
}} else {
  
 await updateDoc(doc(db, "service",id),{
  intitule: state.intitule,
  prix:state.prix
    
  });
  toast.success("modification avec succé");

}
navigate("/listeservice");
} ;


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
         <div style={{marginTop: "100px"}}>
            <form  style={{ margin: "auto", padding:"15px", maxWidth: "400px", alignContent: "center",}}
             onSubmit={handleSubmit}>

              <label htmlFor="nom"> intitule </label>
              <input type="text" id="nom" name="intitule" placeholder="intitule" value={intitule} onChange={handleInputChange}/>

              <label htmlFor="nom">Prix</label>
              <input type="text" id="prix" name="prix" placeholder="prix" value={prix} onChange={handleInputChange}/>

             
              <input type="submit" value="Enregister"/>
              
             </form>
         </div>
      </div>
    </div>
  );
};

export default Nouveauservice;