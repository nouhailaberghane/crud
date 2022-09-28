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
  //const [emp,setEmp] = useState ({});
  //const [ep,setEp] = useState ([]);
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
    if (window.confirm("Are you fo sur ma brudda?")) {
      //for me the important thing is to try catch this operation, because something could go wrong when attempting to 
      // delete a document from the database, the other stuff is just icing on the cake, not important
      try {
        //setOpen(false); also this
        await deleteDoc(doc(db, "service", data[id].id));
        // i belive that setUsers is the update function no?
      } catch (e) {
        console.log("U did something wrong! stacktrace: " + e);
      }
    }

    // setEp(ep.filter((emp) => emp.id !== id));

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
