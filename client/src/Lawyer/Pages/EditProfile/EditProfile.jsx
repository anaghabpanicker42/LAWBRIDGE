import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./editprofile.module.css";

const EditProfile = () => {
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in lawyer ID from sessionStorage
  const LAWYER_ID = sessionStorage.getItem("lawyer_id");

  useEffect(() => {
    if (LAWYER_ID) {
      fetchLawyer();
    } else {
      setLoading(false);
      console.error("No LAWYER_ID found in sessionStorage");
    }
  }, []);

  // Fetch lawyer details
  const fetchLawyer = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/LawyerGetById/${LAWYER_ID}/`
      );
      if (res.data.lawyer) {
        setLawyer(res.data.lawyer);
      } else {
        alert("No lawyer data found");
      }
    } catch (err) {
      console.error("Fetch error:", err.response || err);
      alert("Failed to fetch lawyer data");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setLawyer({
      ...lawyer,
      [e.target.name]: e.target.value,
    });
  };

  // Update lawyer profile
  const handleUpdate = async () => {
    try {
      console.log("Updating lawyer:", lawyer); // Debugging
      const res = await axios.put(
        `http://127.0.0.1:8000/lawyerupdate/${LAWYER_ID}/`,
        {
          lawyer_name: lawyer.lawyer_name,
          lawyer_email: lawyer.lawyer_email,
          lawyer_qualification: lawyer.lawyer_qualification,
          lawyer_address: lawyer.lawyer_address,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(res.data.msg);
      fetchLawyer();
    } catch (err) {
      console.error("UPDATE ERROR 👉", err.response || err);
      alert("Update Failed");
    }
  };

  if (loading) return <p className={Styles.loading}>Loading...</p>;
  if (!lawyer) return <p className={Styles.loading}>No lawyer data found</p>;

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>Edit Profile</h2>
        <p className={Styles.subtitle}>Update your personal details</p>

        <div className={Styles.field}>
          <label>Name</label>
          <input
            type="text"
            name="lawyer_name"
            value={lawyer.lawyer_name || ""}
            onChange={handleChange}
          />
        </div>

        <div className={Styles.field}>
          <label>Email</label>
          <input
            type="email"
            name="lawyer_email"
            value={lawyer.lawyer_email || ""}
            onChange={handleChange}
          />
        </div>

        <div className={Styles.field}>
          <label>Qualification</label>
          <input
            type="text"
            name="lawyer_qualification"
            value={lawyer.lawyer_qualification || ""}
            onChange={handleChange}
          />
        </div>

        <div className={Styles.field}>
          <label>Address</label>
          <input
            type="text"
            name="lawyer_address"
            value={lawyer.lawyer_address || ""}
            onChange={handleChange}
          />
        </div>

        <div className={Styles.field}>
          <label>Place</label>
          <input
            type="text"
            value={lawyer.place_id__place_name || ""}
            disabled
          />
        </div>

        <button className={Styles.button} onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
