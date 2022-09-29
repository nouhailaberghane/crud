import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logo from "../../image/ir.png";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
     <div className="top">
     <Link to="/" style={{ textDecoration: "none" }}>
     
         
          <img className="logo" src={logo} alt="" />
       
         {/* <span className="logo">IRSKILLS TANGER</span>
   */}
  </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          
          <p className="title">PERSONNEL</p>
          <Link to="/employe" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>employés</span>
            </li>
          </Link>
          <Link to="/listestagiaire" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Stagiaires</span>
            </li>
          </Link>
          <p className="title">PRODUIT</p>
          <Link to="/listeservice" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Service</span>
            </li>
          </Link>
          <Link to="/listeformation" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Formation</span>
            </li>
          </Link>
          <p className="title">-----------------------------------------</p>
          <Link to="/listeclient" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Client</span>
            </li>
          </Link>
          <Link to="/listefournisseur" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Fournisseur</span>
            </li>
          </Link>
          
        </ul>
      
      
      </div>
    </div>
  );
};

export default Sidebar;
