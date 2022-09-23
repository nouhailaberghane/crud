import "./nouveau.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import database from "../../firebase";
import { toast } from "react-toastify";

const initialState = {
  nom: "",
  prenom: "",
  email:"",
  cin:"",
  adresse:"",
  numero:""

}


const Nouveau = () => {

const [state, setState] = useState(initialState);
const [data, setData] = useState({});
const {nom, prenom ,email,cin,adresse,numero}= state;
const history = useNavigate();
const handleInputChange = (e) => {
      const {name, value} = e.target;
      setState({ ...state, [name]: value});

} ;
const handleSubmit = (e) => {
e.preventDefault();
if (!nom || !prenom || !email || !cin || !adresse || !numero){
  toast.error("entrez tous les élèments");
}else {
  database.child("employe").push(state, (err) =>{
    if (err){
      toast.error(err);
    }else {
      toast.success("employé enregistré avec succé");
    }
  });
    setTimeout(() => history.push("/users"), 500);
}
} ;

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
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
              
              <label htmlFor="nom">Adresse</label>
              <input type="text" id="adresse" name="adresse" placeholder="Adresse" value={adresse} onChange={handleInputChange}/>
              
              <label htmlFor="nom">Numéro</label>
              <input type="number" id="numero" name="numero" placeholder="Numéro" value={numero} onChange={handleInputChange}/>
              
              <input type="submit" value="Enregister"/>
              
             </form>
         </div>
      </div>
    </div>
  );
};

export default Nouveau;