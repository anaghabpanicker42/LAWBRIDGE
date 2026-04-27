import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router";
import Styles from "./addreport.module.css";

const AddReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("request_id", id);
    formData.append("requestreport_details", details);
    formData.append("requestreport_file", file);

    axios
      .post("http://127.0.0.1:8000/RequestReport/", formData)
      .then((res) => {
        alert("Report added successfully");

        // ✅ After adding report, redirect to Add Fee page
        navigate(`/lawyer/requestfee/${id}`);
      })
      .catch((err) => {
        console.error("Error adding report:", err.response?.data || err);
        alert("Error adding report");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>Add Report</h2>

        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGroup}>
            <label>Upload File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <label>Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter report details..."
              required
            />
          </div>

          <button
            type="submit"
            className={Styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>

        
        <div className={Styles.feeSection}>
          <p>You can add consultation fee anytime:</p>

          <Link
            to={`/lawyer/requestfee/${id}`}
            className={Styles.feeLink}
          >
            ➜ Add Fee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddReport;