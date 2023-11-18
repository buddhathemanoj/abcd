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
  const User = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const Userrole = JSON.parse(localStorage.getItem('user'));
  
    console.log("Userrole", Userrole.role);
    const fetchUsers = async () => {
      try {
        if (Userrole && Userrole.role === "admin") {
          console.log("Fetching all users...", auth.user);
          const allUsers = await getAllUsers();
          console.log("allUsers", allUsers);
          setUsers(allUsers);
        } else {
          console.warn("You do not have permission to view all users or auth.user is null.");
          setUsers([]); // You may want to set an empty array or handle it differently
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
      <h2>List Of Users</h2>
      <div style={{ float: 'right', marginBottom: '10px' }}>
        <Button type="button" className="btn btn-primary" onClick={handleShowAddUserModal}>
          Create User
        </Button>
        <Addusers show={showAddUserModal} handleClose={handleCloseAddUserModal} />
      </div>

      {users.length > 0 && User && User.role === "admin" && (
        <UserDetailsTable users={users} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Users);
