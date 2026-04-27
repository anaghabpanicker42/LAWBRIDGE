import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import AdminRouter from "../../../Routes/AdminRouter";
import Styles from "./homepage.module.css";

const HomePage = () => {
  return (
    <div className={Styles.layout}>
      <Sidebar />

      <div className={Styles.main}>
        <Navbar />

        <div className={Styles.content}>
          <AdminRouter />
        </div>
      </div>
    </div>
  );
};

export default HomePage;