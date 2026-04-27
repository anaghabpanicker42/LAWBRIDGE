import React, { useState, useEffect } from "react";
import Styles from "./plan.module.css";
import axios from "axios";

const Plan = () => {
  const [planName, setPlanName] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [planAmount, setPlanAmount] = useState("");
  const [planDatas, setPlanDatas] = useState([]);

  const handleSave = () => {
    // Validation patterns
    const namePattern = /^[A-Za-z0-9 ]{2,50}$/;
    const durationPattern = /^[0-9]{1,3}$/;
    const amountPattern = /^[0-9]{1,7}$/;

    if (!planName.trim()) {
      alert("Plan name is required");
      return;
    }
    if (!namePattern.test(planName)) {
      alert("Plan name must be 2-50 characters, letters and numbers only");
      return;
    }

    if (!planDuration.trim()) {
      alert("Duration is required");
      return;
    }
    if (!durationPattern.test(planDuration)) {
      alert("Duration must be numeric (1-3 digits)");
      return;
    }

    if (!planAmount.trim()) {
      alert("Amount is required");
      return;
    }
    if (!amountPattern.test(planAmount)) {
      alert("Amount must be numeric (1-7 digits)");
      return;
    }

    const fdata = {
      plan_name: planName,
      plan_duration: planDuration,
      plan_price: planAmount,
    };

    axios
      .post("http://127.0.0.1:8000/Plan/", fdata)
      .then(() => {
        setPlanName("");
        setPlanDuration("");
        setPlanAmount("");
        fetchData();
      })
      .catch(console.error);
  };

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/Plan/")
      .then((res) => {
        setPlanDatas(res.data.plans);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/deleteplan/${id}/`)
      .then(() => fetchData())
      .catch(console.error);
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2 className={Styles.title}>Add Plan</h2>

          <input
            type="text"
            placeholder="Plan Name"
            className={Styles.input}
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Duration (Days)"
            className={Styles.input}
            value={planDuration}
            onChange={(e) => setPlanDuration(e.target.value)}
          />

          <input
            type="text"
            placeholder="Amount (₹)"
            className={Styles.input}
            value={planAmount}
            onChange={(e) => setPlanAmount(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Add Plan
          </button>
        </div>

        <div className={Styles.tableWrapper}>
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>SI NO</th>
                <th>Plan Name</th>
                <th>Duration</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {planDatas.length > 0 ? (
                planDatas.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.plan_name}</td>
                    <td>{item.plan_duration} days</td>
                    <td>₹ {item.plan_price}</td>
                    <td>
                      <button
                        className={Styles.deleteBtn}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No plans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Plan;  