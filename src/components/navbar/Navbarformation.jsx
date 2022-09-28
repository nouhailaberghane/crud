import React, { useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./navbar.scss";
const Navbarformation =() =>{
      const [ activeTab,setActiveTab] = useState("List");
      const location = useLocation();

      useEffect(()=> {
          if ( location.pathname === "/listeformation"){
               setActiveTab("List");
          } else if (location.pathname === "/nouvelformation"){
               setActiveTab("nouveau");
          }
          
      },[location]);

      
  return (
    <div className="header">
      <p className="logo" ></p>
      <div className="header-right"></div>
      <Link to = "/listefomation">
           <p className= {`${activeTab === "List" ? "active" : ""}`} onClick = {() => setActiveTab("List")}>
            Liste
           </p>


      </Link>
      <Link to = "/nouvelformation">
           <p className= {`${activeTab === "nouveau" ? "active" : ""}`} onClick = {() => setActiveTab("nouveau")}>
            nouveau
           </p>


      </Link>
      
     
      </div>);
};
      export default Navbarformation;