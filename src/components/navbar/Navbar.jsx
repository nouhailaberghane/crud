import React, { useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./navbar.scss";
const Navbar =() =>{
      const [ activeTab,setActiveTab] = useState("List");
      const location = useLocation();

      useEffect(()=> {
          if ( location.pathname === "/users"){
               setActiveTab("List");
          } else if (location.pathname === "/nouveau"){
               setActiveTab("nouveau");
          }
          
      },[location]);

      
  return (
    <div className="header">
      <p className="logo" >EMPLOYES</p>
      <div className="header-right"></div>
      <Link to = "/users">
           <p className= {`${activeTab === "List" ? "active" : ""}`} onClick = {() => setActiveTab("List")}>
            Liste
           </p>


      </Link>
      <Link to = "/nouveau">
           <p className= {`${activeTab === "nouveau" ? "active" : ""}`} onClick = {() => setActiveTab("nouveau")}>
            nouveau
           </p>


      </Link>
      
     
      </div>);
};
      export default Navbar;