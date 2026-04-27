import React, { useState, useEffect } from "react";
import Styles from "./type.module.css";
import axios from "axios";

const Type = () => {
  const [typeName, setTypeName] = useState("");
  const [typeDatas, setTypeDatas] = useState([]);

  // FETCH DATA
  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/Type/")
      .then((res) => {
        setTypeDatas(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD TYPE
  const handleSave = () => {
    // Validation: letters and spaces only, 2-50 chars
    const pattern = /^[A-Za-z ]{2,50}$/;

    if (!typeName.trim()) {
      alert("Type is required");
      return;
    }

    if (!pattern.test(typeName)) {
      alert("Type must contain only letters and spaces (2-50 characters)");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/Type/",
        {
          type: typeName   // ✅ MUST be "type"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setTypeName("");
        fetchData();
      })
      .catch((err) => console.error(err));
  };

  // DELETE TYPE
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/deletetype/${id}/`)
      .then(() => fetchData())
      .catch((err) => console.error(err));
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>

        {/* ADD CARD */}
        <div className={Styles.card}>
          <h2 className={Styles.title}>Add Agency Type</h2>
          <p className={Styles.subtitle}>Enter agency type</p>

          <input
            type="text"
            placeholder="Enter type"
            className={Styles.input}
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Add Type
          </button>
        </div>

        {/* TABLE */}
        <div className={Styles.tableWrapper}>
          <h3 className={Styles.tableTitle}>Agency Type List</h3>

          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {typeDatas.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.type_name}</td>
                  <td>
                    <button
                      className={Styles.deleteBtn}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {typeDatas.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No data found
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

export default Type;