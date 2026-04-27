import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Styles from "./schedule.module.css";

const Schedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();   // 👈 added

  const [modeStatus, setModeStatus] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [link, setLink] = useState("");
  const [venue, setVenue] = useState("");

  // ---------------- GET MODE ----------------
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/GetRequest/${id}/`)
      .then((res) => setModeStatus(res.data.mode_status?.toString()))
      .catch((err) => console.error(err));
  }, [id]);

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !date ||
      !time ||
      (modeStatus === "1" && !link) ||
      (modeStatus === "2" && !venue)
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const payload = {
        schedule_date: date,
        schedule_time: time,
        schedule_status: "1",
      };

      if (modeStatus === "1") payload.schedule_link = link;
      if (modeStatus === "2") payload.schedule_venue = venue;

      await axios.post(
        `http://127.0.0.1:8000/Schedule/${id}/`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Schedule Added Successfully");

      // 🔥 REDIRECT TO VIEW REQUEST PAGE
      navigate("../home"); 
      // If your route is different use:
      // navigate("/lawyer/viewrequest");

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.error || "Error adding schedule");
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>Add Schedule</h2>

        <form className={Styles.form} onSubmit={handleSubmit}>
          <label className={Styles.label}>Date:</label>
          <input
            className={Styles.input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className={Styles.label}>Time:</label>
          <input
            className={Styles.input}
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          {modeStatus === "1" && (
            <>
              <label className={Styles.label}>Meeting Link:</label>
              <input
                className={Styles.input}
                type="text"
                placeholder="Enter meeting link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </>
          )}

          {modeStatus === "2" && (
            <>
              <label className={Styles.label}>Venue:</label>
              <input
                className={Styles.input}
                type="text"
                placeholder="Enter venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </>
          )}

          <button className={Styles.button} type="submit">
            Add Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default Schedule;