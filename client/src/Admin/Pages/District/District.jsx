import React, { useState, useEffect } from "react";
import Styles from "./district.module.css";
import axios from "axios";

const District = () => {
  const [districtName, setDistrictName] = useState("");
  const [districtDatas, setDistrictDatas] = useState([]);

  const handleSave = () => {
    // Pattern validation: only letters and spaces, 2-50 chars
    const pattern = /^[A-Za-z ]{2,50}$/;

    if (!districtName.trim()) {
      alert("District name is required");
      return;
    }

    if (!pattern.test(districtName)) {
      alert("District name must contain only letters and spaces (2-50 characters)");
      return;
    }

    const fdata = {
      name: districtName
    };

    axios.post("http://127.0.0.1:8000/District/", fdata)
      .then(() => {
        setDistrictName("");
        fetchData();
      })
      .catch(console.error);
  };

  const fetchData = () => {
    axios.get("http://127.0.0.1:8000/District/")
      .then(res => setDistrictDatas(res.data.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
     axios.delete(`http://127.0.0.1:8000/deletedistrict/${id}/`)
      .then(res =>{
        console.log(res.data);
        fetchData();
      })
      .catch(console.error);
  }

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>

        <div className={Styles.card}>
          <h2 className={Styles.title}>Add District</h2>
          <p className={Styles.subtitle}>Enter the district name below</p>

          <input
            type="text"
            placeholder="Enter district name"
            className={Styles.input}
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Add District
          </button>
        </div>

        <div className={Styles.tableWrapper}>
          <h3 className={Styles.tableTitle}>District List</h3>

          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>District</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {districtDatas.map((item, key) => (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{item.district_name}</td>
                  <td>
                    <button 
                    className={Styles.deleteBtn}
                    onClick={()=> handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default District;