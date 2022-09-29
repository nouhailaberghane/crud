import "./listeclient.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbarclient from "../../components/navbar/Navbarclient";
import React, { useState, useEffect, } from 'react';
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { InsertPageBreakOutlined, SettingsBackupRestoreSharp, SettingsPowerRounded } from "@mui/icons-material";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
const Listeformation = () => {
  const [data, setData] = useState([]);
  const { nom, prenom, email, cin, adresse, numero } = data;
  
  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "client"),
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
    if (window.confirm("Are you fo sur ma brudda?")) {
     
      try {
       
        await deleteDoc(doc(db, "client", data[id].id));
      
      } catch (e) {
        console.log("U did something wrong! stacktrace: " + e);
      }
    }

    

  };






  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbarclient />

        <div style={{ marginTop: "100px" }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>id</th>
                <th style={{ textAlign: "center" }}>Nom</th>
                <th style={{ textAlign: "center" }}>Prenom</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>CIN</th>
                <th style={{ textAlign: "center" }}>Poste</th>
                <th style={{ textAlign: "center" }}>Numero</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>

              {
                // nvm u need the index here, so mapping is required, otherwise u can keep record of what index u reached and increment each time
                // basically mapping; yeh u still need an index for the list ye list hehe nvm
                Object.keys(data).map((id, index) => { // <--- data mapping could probably replace this with a simple for each
                  //console.log(data);
                  return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td> {data[id].nom}</td>
                <td> {data[id].prenom}</td>
                <td> {data[id].email}</td>
                <td> {data[id].cin}</td>
                <td> {data[id].poste}</td>
                <td> {data[id].numero}</td>
                <td>
                  <Link to={`/updateclient/${data[id].id}`} >
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

export default Listeformation;
