import React, { useState, useEffect } from "react";
import Styles from "./level.module.css";
import axios from "axios";

const Level = () => {
  const [levelName, setLevelName] = useState("");
  const [levelDatas, setLevelDatas] = useState([]);

  const handleSave = () => {
    // Validation: letters, numbers, spaces, 2-50 chars
    const pattern = /^[A-Za-z0-9 ]{2,50}$/;

    if (!levelName.trim()) {
      alert("Court level is required");
      return;
    }

    if (!pattern.test(levelName)) {
      alert("Court level must be 2-50 characters, only letters, numbers, and spaces");
      return;
    }

    const fdata = {
      level_name: levelName
    };

    axios.post("http://127.0.0.1:8000/Level/", fdata)
      .then(() => {
        setLevelName("");
        fetchData();
      })
      .catch(console.error);
  };

  const fetchData = () => {
    axios.get("http://127.0.0.1:8000/Level/")
      .then(res => setLevelDatas(res.data.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/deletelevel/${id}/`)
      .then(() => fetchData())
      .catch(console.error);
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>

        {/* ADD LEVEL CARD */}
        <div className={Styles.card}>
          <h2 className={Styles.title}>Add Court Level</h2>
          <p className={Styles.subtitle}>Enter the court level below</p>

          <input
            type="text"
            placeholder="Enter court level"
            className={Styles.input}
            value={levelName}
            onChange={(e) => setLevelName(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Add Level
          </button>
        </div>

        {/* LEVEL TABLE */}
        <div className={Styles.tableWrapper}>
          <h3 className={Styles.tableTitle}>Court Level List</h3>

          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Level</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {levelDatas.length > 0 ? (
                levelDatas.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.level_name}</td>
                    <td>
                      <button 
                        className={Styles.deleteBtn}
                        onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No levels added
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

export default Level;