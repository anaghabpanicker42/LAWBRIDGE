import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./adminregistration.module.css";

const AdminRegistration = () => {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchAdmins = () => {
    axios
      .get("http://127.0.0.1:8000/Admin/")
      .then((res) => {
        setAdmins(res.data.admins || []); 
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = () => {
    // Validation patterns
    const namePattern = /^[A-Za-z ]{2,50}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (!namePattern.test(name)) {
      alert("Name must be 2-50 characters, letters and spaces only");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert("Password must be at least 6 characters and include letters and numbers");
      return;
    }

    if (editId) {
      // Update existing admin
      axios
        .put(`http://127.0.0.1:8000/editadmin/${editId}/`, {
          name: name,
          email: email,
          pass: password,
        })
        .then((res) => {
          alert(res.data.msg);
          resetForm();
          fetchAdmins();
        })
        .catch(() => alert("Update failed"));
    } else {
      // Add new admin
      axios
        .post("http://127.0.0.1:8000/Admin/", {
          name: name,
          email: email,
          pass: password,
        })
        .then((res) => {
          alert(res.data.msg);
          resetForm();
          fetchAdmins();
        })
        .catch(() => alert("Insert failed"));
    }
  };

  const handleEdit = (admin) => {
    setEditId(admin.id);
    setName(admin.admin_name);
    setEmail(admin.admin_email);
    setPassword(admin.admin_password);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/deleteadmin/${id}/`)
      .then((res) => {
        alert(res.data.msg);
        fetchAdmins();
      })
      .catch(() => alert("Delete failed"));
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>

        <div className={Styles.card}>
          <h2>{editId ? "Edit Admin" : "Add Admin"}</h2>

          <input
            className={Styles.input}
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className={Styles.input}
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className={Styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSubmit}>
            {editId ? "Update" : "Submit"}
          </button>

          {editId && (
            <button className={Styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>

        <table className={Styles.table}>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.length > 0 ? (
              admins.map((a, i) => (
                <tr key={a.id}>
                  <td>{i + 1}</td>
                  <td>{a.admin_name}</td>
                  <td>{a.admin_email}</td>
                  <td>
                    <button
                      className={Styles.editBtn}
                      onClick={() => handleEdit(a)}
                    >
                      Edit
                    </button>
                    <button
                      className={Styles.deleteBtn}
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" align="center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminRegistration;