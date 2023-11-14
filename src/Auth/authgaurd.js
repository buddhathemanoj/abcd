import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const AuthGuard = ({ component, user }) => {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      try {
        if (user) {
          setStatus(true);
        } else {
          navigate(`/`);
        }
      } catch (error) {
        navigate(`/`);
      }
    };

    checkUser();
  }, [navigate, user]);

  return status ? (
    <React.Fragment >
     <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "250px", overflowY: "auto", flex: 1 }}>
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
