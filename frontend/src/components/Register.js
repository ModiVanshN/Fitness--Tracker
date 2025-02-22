import React, { useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/users/register",
        { username, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );
      

      console.log("Registration response:", response);

      alert("Registration successful! Redirecting to login...");
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: '400px',
        margin: '40px auto',
        padding: '20px',
         borderRadius: "10px",
        boxShadow: "0 0 10px rgba(85, 134, 241, 0.81)"
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: '20px',
          fontFamily: 'Crimson Text',
          fontSize: '30px',
          fontWeight: 'bold',
          color: 'rgb(15, 123, 181)',
        }}
      >
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          sx={{ width: '100%', marginBottom: '20px' , borderRadius: "10px",
            boxShadow: "0 0 10px rgba(85, 134, 241, 0.81)"}}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          sx={{ width: '100%', marginBottom: '20px', borderRadius: "10px",
            boxShadow: "0 0 10px rgba(85, 134, 241, 0.81)" }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          sx={{ width: '100%', marginBottom: '20px' , borderRadius: "10px",
            boxShadow: "0 0 10px rgba(85, 134, 241, 0.81)"}}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          sx={{ width: '100%', marginBottom: '20px', borderRadius: "10px",
            boxShadow: "0 0 10px rgba(85, 134, 241, 0.81)" }}
        />
        {error && (
          <Typography
            variant="body1"
            sx={{ color: 'red', marginBottom: '10px', fontFamily: 'Crimson Text', fontSize: '16px' }}
          >
            {error}
          </Typography>
        )}
        <Button
  variant="contained"
  type="submit"
  title="Register"
  sx={{
    width: '100%',
    backgroundColor: 'rgb(15, 123, 181)',
    color: '#fff',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '18px',
  }}
  disabled={loading}
>
  {loading ? (
    <>
      <CircularProgress size={24} sx={{ color: '#fff', marginRight: 1 }} />
      Registering...
    </>
  ) : 'Register'}
</Button>

      </form>
      <Typography variant="body1" sx={{ marginTop: '20px', fontSize: '16px', color: 'rgb(15, 123, 181)' }}>
        Already have an account? <Link to="/login" style={{ textDecoration: 'none', color: 'rgb(15, 123, 181)' }}>Login</Link>
      </Typography>
    </Box>
  );
};

export default Register;
