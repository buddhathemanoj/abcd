import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthGuard from './Auth/authgaurd';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Sites from './Pages/Sites/Sites';
import Maps from './Pages/Maps/Maps';
import Users from './Users/Users';
import Permit from './Pages/Permit/Permit';
import Account from './Pages/Accounts/Account';
import AddPermit from './Pages/Permit/AddPermit';

import Userashboard from './Dashboard/UserDashboard';

import Templates from './Pages/AllTemplates/Templates';
import FormsDownlod from './Pages/FormsDownload/FormsDownlod';
import FeedbackForm from './Pages/FeedbackForm/FeedbackForm';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AuthGuard component={<Dashboard />} />} />
          <Route path="/sites" element={<AuthGuard component={<Sites />} />} />
          <Route path="/maps" element={<AuthGuard component={<Maps />} />} />
          <Route path="/users" element={<AuthGuard component={<Users />} />} />
          <Route path="/all-permits" element={<AuthGuard component={<Permit />} />} />
          <Route path="/all-permits-create" element={<AuthGuard component={<AddPermit />} />} />

          <Route path="/user-dashboard" element={<AuthGuard component={<Userashboard />} />} />

          <Route path="/all-templates" element={<AuthGuard component={<Templates />} />} />

          <Route path="/account" element={<AuthGuard component={<Account />} />} />
          <Route path="/forms-download" element={<AuthGuard component={<FormsDownlod />} />} />
          <Route path="/feedback-form" element={<AuthGuard component={<FeedbackForm />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
