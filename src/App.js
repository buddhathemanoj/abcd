import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthGuard from './Auth/authgaurd';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Users from './Users/Users';
import Permit from './Pages/Permit/Permit';
import Account from './Pages/Accounts/Account';
import AddPermit from './Pages/Permit/AddPermit';
import Userashboard from './Dashboard/UserDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AuthGuard component={<Dashboard />} />} />
          <Route path="/users" element={<AuthGuard component={<Users />} />} />
          <Route path="/all-permits" element={<AuthGuard component={<Permit />} />} />
          <Route path="/all-permits-create" element={<AuthGuard component={<AddPermit />} />} />
          <Route path="/user-dashboard" element={<AuthGuard component={<Userashboard />} />} />
          <Route path="/account" element={<AuthGuard component={<Account />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
