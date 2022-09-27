import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState, useEffect, } from 'react';
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { InsertPageBreakOutlined, SettingsBackupRestoreSharp, SettingsPowerRounded } from "@mui/icons-material";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
const List = () => {
  const [data, setData] = useState([]);
  const { nom, prenom, email, cin, adresse, numero } = data;
  //const [emp,setEmp] = useState ({});
  //const [ep,setEp] = useState ([]);
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
    if (window.confirm("Are you fo sur ma brudda?")) {
    //for me the important thing is to try catch this operation, because something could go wrong when attempting to 
    // delete a document from the database, the other stuff is just icing on the cake, not important
      try {
        //setOpen(false); also this
        await deleteDoc(doc(db, "employe", data[id].id));
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
                <th style={{ textAlign: "center" }}>Adresse</th>
                <th style={{ textAlign: "center" }}>Numero</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(data).map((id, index) => {
                  //console.log(data);
                  return (
                    <tr key={id}>
                      <th scope="row">{index + 1}</th>
                      <td> {data[id].nom}</td>
                      <td> {data[id].prenom}</td>
                      <td> {data[id].email}</td>
                      <td> {data[id].cin}</td>
                      <td> {data[id].adresse}</td>
                      <td> {data[id].numero}</td>
                      <td>
                        <Link to={`/update/${id}`} >
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

export default List;
