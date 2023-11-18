import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../Components/UserSidebar";
import Sidebar from "../Components/Sidebar";

const AuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const checkUser = () => {
      try {
        if (storedUser && storedUser.role && (storedUser.role === "admin" || storedUser.role === "employee"||storedUser.role === "user" )) {
          setStatus(true);
          console.log("stored user.role:", storedUser.role);
        } else {
          setStatus(false);
          navigate(`/`);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        setStatus(false);
        navigate(`/`);
      }
    };

    checkUser();
  }, [navigate, storedUser]);

  return status ? (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        {storedUser && storedUser.role && (storedUser.role === "admin" || storedUser.role === "employee") ? (
          <Sidebar />
        ) : (
          <UserSidebar />
        )}
        <div style={{ marginLeft: "220px", overflowY: "auto", flex: 1, padding: "20px 20px 0px" }}>
          {component}
        </div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(AuthGuard);
