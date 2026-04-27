import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Styles from "./sidebar.module.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CategoryIcon from "@mui/icons-material/Category";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GavelIcon from "@mui/icons-material/Gavel";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedbackIcon from "@mui/icons-material/Feedback";
import StarRateIcon from "@mui/icons-material/StarRate";



const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate("/guest/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dash", icon: <DashboardIcon /> },
    { name: "Admin Registration", path: "/admin/adminregistration", icon: <AdminPanelSettingsIcon /> },
    { name: "District", path: "/admin/district", icon: <LocationCityIcon /> },
    { name: "Place", path: "/admin/place", icon: <PlaceIcon /> },
    { name: "Level", path: "/admin/level", icon: <MilitaryTechIcon /> },
    { name: "Type", path: "/admin/type", icon: <CategoryIcon /> },
    { name: "Plan", path: "/admin/plan", icon: <WorkspacePremiumIcon /> },
    { name: "Category", path: "/admin/category", icon: <AccountTreeIcon /> },
    { name: "View Lawyer", path: "/admin/viewlawyer", icon: <GavelIcon /> },
    { name: "View Complaint", path: "/admin/viewcomplaint", icon: <FeedbackIcon /> },
    { name: "View Rating", path: "/admin/viewrating", icon: <StarRateIcon /> },
  ];

  return (
    <div className={Styles.sidebar}>
      <div>
        <div className={Styles.logo}>LAW BRIDGE</div>

        <div className={Styles.sectionTitle}>Admin Panel</div>

        <nav className={Styles.menu}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${Styles.link} ${
                location.pathname === item.path ? Styles.active : ""
              }`}
            >
              <span className={Styles.icon}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Section */}
      <div className={Styles.logoutSection} onClick={handleLogout}>
        <LogoutIcon />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;