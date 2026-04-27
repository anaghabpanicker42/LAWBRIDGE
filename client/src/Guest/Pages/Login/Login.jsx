import React, { useState } from "react";
import Styles from "./login.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Patterns
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleLogin = () => {
    let valid = true;

    // Validate Email
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    // Validate Password
    if (!passwordPattern.test(password)) {
      setPasswordError("Password must be at least 6 characters, including a number");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    // Proceed with login
    axios.post('http://127.0.0.1:8000/Login/', { email, password })
      .then(res => {
        const { role, id, message } = res.data;
        alert(message);

        if (role === 'user') {
          sessionStorage.setItem('uid', id);      
          sessionStorage.setItem('user_id', id); 
          navigate('/user/dashboard');
        } else if (role === 'admin') {
          sessionStorage.setItem('aid', id);
          navigate('/admin/dash');
        } else if (role === 'lawyer') {
          sessionStorage.setItem('lid', id);
          sessionStorage.setItem('lawyer_id', id); 
          navigate('/lawyer/home');
        }
      })
      .catch(err => alert('Login failed'));
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <CardMedia
          component="img"
          image="https://static.vecteezy.com/system/resources/previews/011/515/790/original/education-law-balance-and-attorney-monogram-logo-design-law-firm-and-office-logo-design-free-vector.jpg"
          alt="Court Symbol"
          className={Styles.avatar}
        />

        <Typography variant="h5" sx={{ fontWeight: 600, color: "#301B3F" }}>
          Welcome to LawBridge
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
          Please login to your account
        </Typography>

        <Box component="form" className={Styles.form}>
          <TextField
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email"
            type="email"
            margin="normal"
            error={!!emailError}
            helperText={emailError}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            error={!!passwordError}
            helperText={passwordError}
            required
          />

          <Button
            fullWidth
            onClick={handleLogin}
            variant="contained"
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              fontSize: 16,
              backgroundColor: "#301B3F",
              "&:hover": { backgroundColor: "#4a2b5f" }
            }}
          >
            Login
          </Button>
          <Typography sx={{ mt: 2, fontSize: 14 }}>
           Don't have an account?
          </Typography>
          <div className={Styles.registerLinks}>
             <span onClick={() => navigate("/user/register")} className={Styles.link}>
              Register as User
             </span>
             <span className={Styles.separator}>|</span>
             <span onClick={() => navigate("/guest/lawyer")} className={Styles.link}>
              Register as Lawyer
             </span>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login;