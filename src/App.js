import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthGuard from './Auth/authgaurd';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Users from './Users/Users';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AuthGuard component={<Dashboard />} />} />
          <Route path="/users" element={<AuthGuard component={<Users />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
