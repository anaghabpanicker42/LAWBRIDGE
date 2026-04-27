import React, { useState, useEffect } from "react";
import Styles from "./category.module.css";
import axios from "axios";

const Category = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDatas, setCategoryDatas] = useState([]);

  // Fetch categories from API
  const fetchData = () => {
    axios
      .get("http://127.0.0.1:8000/Category/")
      .then((res) => {
        // Use the correct property and default to empty array
        setCategoryDatas(res.data.categories || []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategoryDatas([]); // fallback to empty array
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add new category
  const handleSave = () => {
    if (!categoryName.trim()) {
      alert("Category is required");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/Category/",
        { category: categoryName },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        setCategoryName("");
        fetchData();
      })
      .catch((err) => console.error("Error adding category:", err));
  };

  // Delete a category
  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/deletecategory/${id}/`)
      .then(() => fetchData())
      .catch((err) => console.error("Error deleting category:", err));
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>

        {/* Add Category Card */}
        <div className={Styles.card}>
          <h2 className={Styles.title}>Add Category</h2>
          <p className={Styles.subtitle}>Enter category</p>

          <input
            type="text"
            placeholder="Enter category"
            className={Styles.input}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Add Category
          </button>
        </div>

        {/* Category List Table */}
        <div className={Styles.tableWrapper}>
          <h3 className={Styles.tableTitle}>Category List</h3>

          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {categoryDatas && categoryDatas.length > 0 ? (
                categoryDatas.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.category_name}</td>
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

export default Category;