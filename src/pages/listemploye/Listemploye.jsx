import "./listemploye.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect, } from 'react';
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { InsertPageBreakOutlined, SettingsBackupRestoreSharp, SettingsPowerRounded } from "@mui/icons-material";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
const Listemploye = () => {
  const [data, setData] = useState([]);
  const { nom, prenom, email, cin, adresse, numero } = data;
 
  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "employe"),
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
     
        await deleteDoc(doc(db, "employe", data[id].id));
      
      } catch (e) {
        console.log("U did something wrong! stacktrace: " + e);
      }
    }

    

  };






  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />

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
                
                Object.keys(data).map((id, index) => { 
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
                  <Link to={`/update/${data[id].id}`} >
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

export default Listemploye;
