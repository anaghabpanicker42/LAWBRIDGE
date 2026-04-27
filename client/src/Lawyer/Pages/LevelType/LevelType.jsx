import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./leveltype.module.css";

const LevelType = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [levels, setLevels] = useState([]);
  const [types, setTypes] = useState([]);

  const [levelId, setLevelId] = useState("");
  const [typeId, setTypeId] = useState("");

  useEffect(() => {

    if (!id) {
      alert("Invalid Request ID");
      navigate("/lawyer/viewrequest");
      return;
    }

    // fetch levels
    axios.get("http://127.0.0.1:8000/Level/")
      .then(res => {
        setLevels(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

    // fetch types
    axios.get("http://127.0.0.1:8000/Type/")
      .then(res => {
        setTypes(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

  }, [id, navigate]);


  const handleSubmit = () => {

    if (!levelId || !typeId) {
      alert("Please select both Level and Type");
      return;
    }

    const formData = new FormData();
    formData.append("level_id", levelId);
    formData.append("type_id", typeId);

    axios.post(`http://127.0.0.1:8000/Leveltype/${id}/`, formData)
      .then(res => {

        alert(res.data.message);

        navigate("/lawyer/viewrequest");

      })
      .catch(err => {
        console.log(err);
        alert("Error updating Level & Type");
      });

  };



  return (
    <div className={Styles.page}>
      <div className={Styles.card}>

        <h3 className={Styles.title}>Add Level & Type</h3>

        <div className={Styles.field}>
          <label>Select Level</label>

          <select
            value={levelId}
            onChange={(e) => setLevelId(e.target.value)}
          >

            <option value="">-- Select Level --</option>

            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>
                {lvl.level_name}
              </option>
            ))}

          </select>
        </div>



        <div className={Styles.field}>
          <label>Select Type</label>

          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
          >

            <option value="">-- Select Type --</option>

            {types.map((typ) => (
              <option key={typ.id} value={typ.id}>
                {typ.type_name}
              </option>
            ))}

          </select>
        </div>


        <button
          className={Styles.button}
          onClick={handleSubmit}
        >
          Submit
        </button>

      </div>
    </div>
  );
};

export default LevelType;