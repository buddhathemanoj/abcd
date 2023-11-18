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
import MyPermits from './Pages/User/myPermits';

import Forgetpassword from './Login/Forgetpassword';
import Mail from './Login/Mail';

import MyChildPermit from './Pages/User/myChildPermit';
import AllTemplates from './Pages/User/allTemplates';
import AddSites from './Pages/Sites/AddSites';

import Editprofile from './Pages/Accounts/Editprofile';
import Changepassword from './Pages/Accounts/Changepassword';

import ViewPermit from './Pages/Permit/ViewPermit';




function App() {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const getComponentForUserRole = () => {
    if (storedUser && storedUser.role) {
      if (storedUser.role === "admin" || storedUser.role === "employee") {
        return <Dashboard />;
      } else if (storedUser.role === "user") {
        return <Userashboard/>;
      }
    }
    return <Login />;
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<Forgetpassword />} />
          <Route path="/mail" element={<Mail />} />

          <Route path="/dashboard" element={<AuthGuard component={<Dashboard />} />} />
          <Route path="/sites" element={<AuthGuard component={<Sites />} />} />
          <Route path="/sites-create" element={<AuthGuard component={<AddSites />} />} />

          <Route path="/dashboard" element={<AuthGuard component={getComponentForUserRole()} />} />          <Route path="/sites" element={<AuthGuard component={<Sites />} />} />
          <Route path="/user-dashboard" element={<AuthGuard component={getComponentForUserRole()} />} />          <Route path="/sites" element={<AuthGuard component={<Sites />} />} />
          <Route path="/view-permit" element={<AuthGuard component={<ViewPermit />} />} />


          <Route path="/maps" element={<AuthGuard component={<Maps />} />} />
          <Route path="/users" element={<AuthGuard component={<Users />} />} />
          <Route path="/all-permits" element={<AuthGuard component={<Permit />} />} />
          <Route path="/all-permits-create" element={<AuthGuard component={<AddPermit />} />} />

          <Route path="//my-permits" element={<AuthGuard component={<MyPermits />} />} />
          <Route path="/user-dashboard" element={<AuthGuard component={<Userashboard />} />} />

          <Route path="/my-permits" element={<AuthGuard component={<MyPermits />} />} />


          <Route path="/all-templates" element={<AuthGuard component={<Templates />} />} />
          <Route path="/my-child-permit" element={<AuthGuard component={<MyChildPermit />} />} />
          <Route path="/all-template" element={<AuthGuard component={<AllTemplates />} />} />
          <Route path="/account" element={<AuthGuard component={<Account />} />} />
          <Route path="/edit-profile" element={<AuthGuard component={<Editprofile />} />} />
          <Route path="/change-password" element={<AuthGuard component={<Changepassword />} />} />
          <Route path="/forms-download" element={<AuthGuard component={<FormsDownlod />} />} />
          <Route path="/feedback-form" element={<AuthGuard component={<FeedbackForm />} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
