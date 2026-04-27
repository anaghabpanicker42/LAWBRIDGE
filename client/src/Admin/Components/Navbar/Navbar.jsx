import React, { useState } from "react";
import Styles from "./navbar.module.css";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Logout function
  const handleLogout = () => {
    localStorage.clear(); // remove stored login data
    navigate("../guest/login");   // redirect to login page
  };

  return (
    <div className={Styles.navbar}>
      <div className={Styles.left}>
        <h3>Admin Dashboard</h3>
      </div>

      <div className={Styles.right}>
        <Avatar onClick={handleOpen} sx={{ cursor: "pointer" }} />

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <div className={Styles.popover}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;