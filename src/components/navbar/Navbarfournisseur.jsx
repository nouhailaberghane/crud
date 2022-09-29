import React, { useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./navbar.scss";
const Navbarfournisseur =() =>{
      const [ activeTab,setActiveTab] = useState("List");
      const location = useLocation();

      useEffect(()=> {
          if ( location.pathname === "/listefournisseur"){
               setActiveTab("List");
          } else if (location.pathname === "/nouveaufournisseur"){
               setActiveTab("nouveau");
          }
          
      },[location]);

      
  return (
    <div className="header">
      <p className="logo" ></p>
      <div className="header-right"></div>
      <Link to = "/listefournisseur">
           <p className= {`${activeTab === "List" ? "active" : ""}`} onClick = {() => setActiveTab("List")}>
            Liste
           </p>


      </Link>
      <Link to = "/nouveaufournisseur">
           <p className= {`${activeTab === "nouveau" ? "active" : ""}`} onClick = {() => setActiveTab("nouveau")}>
            nouveau
           </p>


      </Link>
      
     
      </div>);
};
      export default Navbarfournisseur;