import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../Auth/auth";
import UserDetailsTable from "./Userlisttable";
import { Button } from "react-bootstrap";
import Addusers from "./Addusers";
const Users = ({ auth }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (auth.user && auth.user.role === "admin") {
          console.log("Fetching all users...", auth.user);
          const allUsers = await getAllUsers();
          setUsers(allUsers);
        } else {
          throw new Error("You do not have permission to view all users.");
        }
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      }
    };

    fetchUsers();
  }, [auth.user]);
  const handleShowAddUserModal = () => setShowAddUserModal(true);
  const handleCloseAddUserModal = () => setShowAddUserModal(false);
  return (
    <div>
      <div style={{float:'right',marginBottom:'10px'}}>
        <Button type="button" className="btn btn-primary" onClick={handleShowAddUserModal}>
          Create User
        </Button>
      <Addusers show={showAddUserModal} handleClose={handleCloseAddUserModal} />
      </div>
      {error && <p>{error}</p>}
      {users.length > 0 && auth.user && auth.user.role === "admin" && (
        <UserDetailsTable users={users} />
      )}

      {!error && users.length === 0 && auth.user && (
        <div>
          <h2>Your Profile</h2>
          <p>Email: {auth.user.email}</p>
          <p>Full Name: {auth.user.fullname}</p>
         
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Users);
