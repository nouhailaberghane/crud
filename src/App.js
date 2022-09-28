import Home from "./pages/listestagiaire/Listestagiaire";
import Login from "./pages/login/Login";
import Listemploye from "./pages/listemploye/Listemploye";
import Listeservice from "./pages/listeservice/Listeservice";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nouveauemploye from "./pages/nouveauemploye/Nouveauemploye";
import Nouveaustagiaire from "./pages/nouveaustagiaire/Nouveaustagiaire";
import Listestagiaire from "./pages/listestagiaire/Listestagiaire";
import Nouveauservice from "./pages/nouveauservice/Nouveauservice";
import Nouvelformation from "./pages/nouvelformation/Nouvelformation";
import Listeformation from "./pages/listeformation/Listeformation";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div >
      
      <ToastContainer position="top-center"/>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
           
          <Route path="employe">
            <Route
                index
                element={
                  <RequireAuth>
                    <Listemploye />
                  </RequireAuth>
                }
              />
             
            </Route>
            <Route path="nouveau"
                element={
                  <RequireAuth>
                   <Nouveauemploye />
                  </RequireAuth>
                }
              />
            
            
            </Route>
            <Route
                path="listestagiaire"
                element={
                  <RequireAuth>
                    <Listestagiaire />
                  </RequireAuth>
                }
              />
              
              <Route
                path="nouveaustagiaire"
                element={
                  <RequireAuth>
                    <Nouveaustagiaire />
                  </RequireAuth>
                }
              />
              <Route
                path="listeservice"
                element={
                  <RequireAuth>
                    <Listeservice />
                  </RequireAuth>
                }
              />
              <Route
                path="nouveauservice"
                element={
                  <RequireAuth>
                    <Nouveauservice />
                  </RequireAuth>
                }
              />
              <Route
                path="nouvelformation"
                element={
                  <RequireAuth>
                    <Nouvelformation />
                  </RequireAuth>
                }
              />
              <Route
                path="listefomation"
                element={
                  <RequireAuth>
                    <Listeformation />
                  </RequireAuth>
                }
              />
            <Route path="/update/:id"  element= {<Nouveauemploye/>}/>
            <Route path="/updat/:id"  element= {<Nouveaustagiaire/>}/>
            <Route path="/updateservice/:id"  element= {<Nouveauservice/>}/>
            <Route path="/updateformation/:id"  element= {<Nouvelformation/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
