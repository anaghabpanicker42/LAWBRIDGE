import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import Styles from "./register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [proof, setProof] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/place/").then((res) => {
      setDistricts(res.data.districtdata || []);
      setPlaces(res.data.placedata || []);
    });
  }, []);

  useEffect(() => {
    if (!districtId) {
      setFilteredPlaces([]);
      setPlaceId("");
    } else {
      const filtered = places.filter((p) => p.district_id === parseInt(districtId));
      setFilteredPlaces(filtered);
      setPlaceId("");
    }
  }, [districtId, places]);

  const handleRegister = async () => {
    if (!name || !email || !password || !rePassword || !placeId || !photo || !proof) {
      return alert("Please fill all fields and upload files.");
    }
    if (password !== rePassword) return alert("Passwords do not match.");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("place_id", placeId);
    formData.append("user_photo", photo);
    formData.append("user_proof", proof);

    try {
      const res = await axios.post("http://127.0.0.1:8000/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message || "Registered successfully");
      setName(""); setEmail(""); setPassword(""); setRePassword("");
      setDistrictId(""); setPlaceId(""); setPhoto(null); setProof(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed: " + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className={Styles.wrapper}>
      <Box className={Styles.card}>
        <Typography variant="h4" className={Styles.title}>Create Account</Typography>

        <Box component="form" className={Styles.form} noValidate>
          <TextField label="Full Name" fullWidth size="small" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
          <TextField label="Email Address" type="email" fullWidth size="small" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
          <TextField label="Password" type="password" fullWidth size="small" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
          <TextField label="Re-type Password" type="password" fullWidth size="small" value={rePassword} onChange={(e) => setRePassword(e.target.value)} margin="normal" />

          <TextField
            select
            label="District"
            fullWidth
            size="small"
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            SelectProps={{ native: true }}
            margin="normal"
          >
            <option value="">Select District</option>
            {districts.map((d) => <option key={d.id} value={d.id}>{d.district_name}</option>)}
          </TextField>

          <TextField
            select
            label="Place"
            fullWidth
            size="small"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            SelectProps={{ native: true }}
            margin="normal"
            disabled={!districtId}
          >
            <option value="">Select Place</option>
            {filteredPlaces.map((p) => <option key={p.id} value={p.id}>{p.place_name}</option>)}
          </TextField>

          <Box className={Styles.fileWrapper}>
            <label className={Styles.fileLabel}>Upload Photo</label>
            <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className={Styles.fileInput} />
          </Box>

          <Box className={Styles.fileWrapper}>
            <label className={Styles.fileLabel}>Upload Proof</label>
            <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => setProof(e.target.files[0])} className={Styles.fileInput} />
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
              fontSize: 16,
              fontWeight: 500,
              textTransform: "uppercase",
              backgroundColor: "#301B3F",
              color: "#fff",
              boxShadow: "0 4px 10px rgba(48,27,63,0.3)",
              "&:hover": {
                backgroundColor: "#4a2b5f",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 12px rgba(48,27,63,0.4)",
              },
            }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Register;