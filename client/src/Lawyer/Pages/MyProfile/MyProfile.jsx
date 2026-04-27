import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./myprofile.module.css";

const MyProfile = () => {
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  const LAWYER_ID = sessionStorage.getItem("lawyer_id");

  useEffect(() => {
    if (!LAWYER_ID) {
      console.error("No lawyer_id found in sessionStorage!");
      setLoading(false);
      return;
    }
    fetchLawyer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLawyer = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/LawyerGetById/${LAWYER_ID}/`
      );
      console.log("Lawyer API response:", res.data);

      // Adjust this line depending on backend response structure
      // Example: if backend returns { lawyer: { ... } }
      if (res.data.lawyer) {
        setLawyer(res.data.lawyer);
      } else {
        setLawyer(res.data); // if backend returns object directly
      }
    } catch (err) {
      console.error("Lawyer profile fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className={Styles.loading}>Loading profile...</p>;
  if (!lawyer) return <p className={Styles.loading}>No lawyer data found</p>;

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>My Profile</h2>
        <p className={Styles.subtitle}>Your account information</p>

        <div className={Styles.avatar}>
          <img
            src={
              lawyer.lawyer_photo
                ? `http://127.0.0.1:8000${lawyer.lawyer_photo}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Lawyer"
          />
        </div>

        <div className={Styles.info}>
          <div className={Styles.row}>
            <span>Name</span>
            <span>{lawyer.lawyer_name}</span>
          </div>

          <div className={Styles.row}>
            <span>Email</span>
            <span>{lawyer.lawyer_email}</span>
          </div>

          <div className={Styles.row}>
            <span>Qualification</span>
            <span>{lawyer.lawyer_qualification}</span>
          </div>

          <div className={Styles.row}>
            <span>Address</span>
            <span>{lawyer.lawyer_address}</span>
          </div>

          <div className={Styles.row}>
            <span>Place</span>
            <span>{lawyer.place_id__place_name}</span>
          </div>
        </div>

        <div className={Styles.actions}>
          <a href="/lawyer/editprofile">Edit Profile</a>
          <a href="/lawyer/changepassword">Change Password</a>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;