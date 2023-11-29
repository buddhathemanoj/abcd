import React, { useState } from "react";
import './user.css'
import { Button, Modal, Form } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const UserDetailsTable = ({ users }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [editedRole, setEditedRole] = useState("");
  const [editedCompany, setEditedCompany] = useState("");
  const [editedSites, setEditedSites] = useState("");
  

  const handleEdit = (user) => {
    setEditedUser(user);
    setEditedRole(user.role);
    setEditedCompany(user.company);
    setEditedSites(user.sites || "");
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedUser({});
    setEditedRole("");
    setEditedCompany("");
    setEditedSites("");
  };
const handleSaveChanges = async () => {
  try {
   
    const userRef = doc(db, "users", editedUser.uid);
    await updateDoc(userRef, {
      role: editedRole,
      company: editedCompany,
      sites: editedSites,
    });

    handleCloseEditModal();
  
    window.location.reload();
  } catch (error) {
    console.error("Error updating user data:", error.message);
  }
};

  return (
    <>
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
            <th className='text-center'>Action</th>
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
              <td className='text-center'>
                <Button
                  variant="danger"
                  className='delete-btn'
                  onClick={() => handleEdit(user)}
                >
                  <CiEdit style={{ fontSize: 'medium', marginBottom: '.1rem',  }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRole">
              <Form.Label>Role:</Form.Label>
              <Form.Select
                type="text"
                value={editedRole}
                onChange={(e) => setEditedRole(e.target.value)}
              >
                <option value="User">User</option>
                <option value="Supervisor">Supervisor</option>
                <option value="Manager">Manager</option>

              </Form.Select>  
            </Form.Group>
            <Form.Group controlId="formCompany">
              <Form.Label>Company:</Form.Label>
              <Form.Control
                type="text"
                value={editedCompany}
                onChange={(e) => setEditedCompany(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSites">
              <Form.Label>Sites</Form.Label>
              <Form.Control
                type="text"
                value={editedSites}
                onChange={(e) => setEditedSites(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDetailsTable;