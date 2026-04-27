import React, { useState, useEffect } from "react";
import Styles from "./subscription.module.css";
import axios from "axios";

const Subscription = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [planId, setPlanId] = useState("");
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

 
  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/Plan/");
      setPlans(res.data.plans || []);
    } catch (err) {
      console.error( err);
    }
  };

  
  const fetchSubscriptions = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/Subscription/");
      setSubscriptions(res.data.subscriptions || []);
    } catch (err) {
      console.error( err);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchSubscriptions();
  }, []);


  const handleSave = async () => {
    if (!startDate || !endDate || !planId) {
    
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/Subscription/", {
        subscription_startdate: startDate, 
        subscription_enddate: endDate,
        plan_id: planId,
        user_id: 1, 
      });

      setStartDate("");
      setEndDate("");
      setPlanId("");
      fetchSubscriptions();
      
    } catch (err) {
      console.error( err);

    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2 className={Styles.title}>Add Subscription</h2>

          <input
            type="date"
            className={Styles.input}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            className={Styles.input}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <select
            className={Styles.input}
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
          >
            <option value="">Select Plan</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.plan_name}
              </option>
            ))}
          </select>

          <button className={Styles.button} onClick={handleSave}>
            Add Subscription
          </button>
        </div>

        <div className={Styles.tableWrapper}>
          <h3 className={Styles.tableTitle}>Subscription List</h3>

          <table className={Styles.table}>
            <thead>
              <tr>
                <th>SI NO</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Plan</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length > 0 ? (
                subscriptions.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.subscription_startdate}</td>
                    <td>{item.subscription_enddate}</td>
                    <td>{item.plan_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No subscriptions found
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

export default Subscription;
