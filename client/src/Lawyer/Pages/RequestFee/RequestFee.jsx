import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Styles from "./requestfee.module.css";

const RequestFee = () => {
  const { id } = useParams(); 
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }


    const formData = new FormData();
    formData.append("request_id", id);
    formData.append("requestfee_amount", amount);
    formData.append("requestfee_details", details);

    axios
      .post("http://127.0.0.1:8000/Requestfee/", formData)
      .then(() => {
        alert("Fee Added Successfully");
        setAmount("");
        setDetails("");
      })
      .catch((err) => {
        console.log("Error adding fee:", err.response?.data);
        alert("Error Adding Fee");
      });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>Add Request Fee</h2>

        <form onSubmit={handleSubmit} className={Styles.form}>
          <div className={Styles.formGroup}>
            <label>Fee Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter fee amount"
              required
            />
          </div>

          <div className={Styles.formGroup}>
            <label>Fee Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Enter fee details..."
              required
            />
          </div>

          <button type="submit" className={Styles.submitBtn}>
            Submit Fee
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestFee;
