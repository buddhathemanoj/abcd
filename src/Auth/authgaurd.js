import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../Components/UserSidebar";
import Sidebar from "../Components/Sidebar";
const AuthGuard = ({ component, user }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      try {
        if (user && user.role === "admin") {
          setStatus(true);
          console.log("Checking user:", user);
        } else if (user && user.role === "employee") {
          setStatus(true);
        }
        else if (user && user.role === "user") {
          setStatus(true);
         } else {
          navigate(`/`);
        }
      } catch (error) {
        console.error("Error checking user:", error);
        navigate(`/`);
      }
    };

    checkUser();
  }, [navigate, user]);

  return status ? (
    <React.Fragment>
      <div style={{ display: "flex" }}>
      {user.role === "admin" || user.role === "employee" ? <Sidebar /> : <UserSidebar />}
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
