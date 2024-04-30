import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"; // Import Axios
import { TextField, Button, Grid, Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Successful login, store JWT token (replace with appropriate logic)
        const token = response.data.token; // Assuming response contains a token field
        localStorage.setItem('jwtToken', token); // Store token in secure storage (replace with HttpOnly cookie if possible)

        navigate('/admin'); // Assuming admin route after successful login
      } else {
        alert("Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during login");
    }
  }

  // Add Axios interceptor (place this outside any function)
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from secure storage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }

    return config;
  });

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Login
        </Typography>
        <form onSubmit={login}>
          <TextField
            label="Username"
            type="text"
            margin="normal"
            fullWidth
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default Login;
