// Homepage component
import React from "react";
import { Router,Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import AuthGuard from "./Auth/authgaurd";
import Dashboard from "./Dashboard/Dashboard";

const Homepage = () => {
  return (
    <div>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <AuthGuard path="/dashboard" element={Dashboard} />
      </Routes>
  
    </div>
  );
};

export default Homepage;
