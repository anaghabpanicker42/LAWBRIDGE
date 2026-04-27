import React, { useEffect, useState } from "react";
import axios from "axios";

const LawyerCategory = () => {
  const lawyerId = sessionStorage.getItem("lawyer_id");

  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Lawyercategory/")
      .then((res) => {
        setCategoryList(res.data.categorydata || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {
    console.log("LAWYER ID:", lawyerId);
    console.log("CATEGORY ID:", categoryId);

    if (categoryId === "") {
      alert("Please select a category first!");
      return; 
    }

    axios
      .post("http://127.0.0.1:8000/Lawyercategory/", {
        category_id: parseInt(categoryId), 
        lawyer_id: parseInt(lawyerId),
      })
      .then((res) => {
        alert(res.data.msg);
        setCategoryId("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h3>Select Category</h3>

      <select
        value={categoryId}
        onChange={(e) => {
          console.log("SELECTED:", e.target.value);
          setCategoryId(e.target.value);
        }}
      >
        <option value="">-- Select Category --</option>

        {categoryList.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.category_name}
          </option>
        ))}
      </select>

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default LawyerCategory;
