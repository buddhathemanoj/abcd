import React from "react";
import './user.css'
const UserDetailsTable = ({ users }) => {
    console.log(users);
  return (
    <table className="user-details-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Email</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Mobile No</th>
          <th>Company</th>
          <th>Sites</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.uid}>
            <td>{index + 1}</td>
            <td>{user.email}</td>
            <td>{user.fullname}</td>
            <td>{user.role}</td>
            <td>{user.mobileno}</td>
            <td>{user.company}</td>
            <td>{user.sites || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserDetailsTable;
