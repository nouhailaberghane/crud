import "./listeservice.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect, } from 'react';
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { InsertPageBreakOutlined, SettingsBackupRestoreSharp, SettingsPowerRounded } from "@mui/icons-material";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import Navbarservice from "../../components/navbar/Navbarservice";
const Listeservice = () => {
  const [data, setData] = useState([]);
  const { nom, prenom, email, cin, adresse, numero } = data;
  
  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "service"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);

      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("vous êtes sûre?")) {
     
      try {
      
        await deleteDoc(doc(db, "service", data[id].id));
       
      } catch (e) {
        console.log("U did something wrong! stacktrace: " + e);
      }
    }

  
  };






  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbarservice />

        <div style={{ marginTop: "100px" }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>id</th>
                <th style={{ textAlign: "center" }}>Intitule</th>
                <th style={{ textAlign: "center" }}>Prix</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>

              {
                
                Object.keys(data).map((id, index) => {
                  return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td> {data[id].intitule}</td>
                <td> {data[id].prix}</td>
                
                <td>
                  <Link to={`/updateservice/${data[id].id}`} >
                    <button className="btn btn-edit">modifier</button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => { handleDelete(id) }}>supprimer</button>


                </td>
              </tr>
              );
                })}
            </tbody>


          </table>




        </div>

      </div>
    </div>
  );
};

export default Listeservice;
