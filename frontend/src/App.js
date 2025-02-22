import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

const App = () => {
  return (
    <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
        </Route>
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
