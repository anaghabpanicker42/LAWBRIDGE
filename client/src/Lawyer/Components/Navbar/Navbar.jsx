import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './navbar.module.css';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // clear session
    sessionStorage.removeItem("lawyer_id");
    sessionStorage.removeItem("lawyer_name");

    // redirect to login page
    navigate("/guest/login");
  };

  return (
    <nav className={Styles.navbar}>
      <div className={Styles.logo}>⚖ LAWBRIDGE</div>
      
      <div className={Styles.links}>
        <Link className={Styles.navLink} to="/lawyer/myprofile">Profile</Link>
        <Link className={Styles.navLink} to="/lawyer/viewrequest">Requests</Link>
        <Link className={Styles.navLink} to="/lawyer/home">Home</Link>
      </div>

      <div className={Styles.actions}>
        <button className={Styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;