import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/users/login",
        { username, password },
        { withCredentials: true }
      );

      console.log("Login Response:", response);


      alert("Login successful!");
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      
      setTimeout(() => navigate("/"), 1500); // Slow redirect
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: "400px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(85, 134, 241, 0.81)"
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "20px", fontSize: "30px", fontWeight: "bold", color: "blue" }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ borderRadius: "10px",width: "100%", marginBottom: "20px", boxShadow: "0 0 10px rgba(85, 134, 241, 0.81)", }} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ borderRadius: "10px",width: "100%", marginBottom: "20px" , boxShadow: "0 0 10px rgba(85, 134, 241, 0.81)" }} />
        
        {error && <Typography variant="body1" sx={{ color: "red", marginBottom: "10px" }}>{error}</Typography>}
        
        <Button variant="contained" type="submit" sx={{ width: "100%", backgroundColor: "blue", color: "#fff", borderRadius: "5px", padding: "10px" }} disabled={loading}>
          {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login"}
        </Button>
      </form>
      <Typography variant="body1" sx={{ marginTop: "20px", fontSize: "16px", color: "blue" }}>
        Don't have an account? <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>Register</Link>
      </Typography>
    </Box>
  );
};

export default Login;
