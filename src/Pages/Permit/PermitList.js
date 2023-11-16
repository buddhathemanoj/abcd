import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { getPermitsByUserId } from '../../Auth/auth';

const PermitList = ({ permits, auth }) => {

  const userId = auth.user.uid;
  console.log("userId", userId);
  const [userPermits, setUserPermits] = useState([]);

  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const permitsData = await getPermitsByUserId(userId);
        setUserPermits(permitsData);
        console.log("permitsData", permitsData)
      } catch (error) {
        console.error('Error fetching permits:', error.message);
      }
    };

    fetchPermits();
  }, [userId]);
  return (
    <>
      <table className="user-details-table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Permit Number</th>
            <th>Permit Code</th>
            <th>Permit Type</th>
            <th>Discipline</th>
            <th>Host/System Owner</th>
            <th>Work Description</th>
            <th>Applier Site</th>
            <th>Date Applied</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {userPermits.map((permit, index) => (
            <tr key={permit.id}>
              <td>{index + 1}</td>
              <td>{permit.permitNumber}</td>
              <td>A</td>
              <td>General</td>
              <td>Welding</td>
              <td>John Doe</td>
              <td>Welding</td>
              <td>{permit.site}</td>
              <td>{permit.createdAt}</td>
              <td>{permit.startDate}</td>
              <td>{permit.endDate}</td>
              <td>{permit.status}</td>
              <td>Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}


const mapStateToProps = (state) => {
  console.log("state..................", state)
  return {
    auth: state.auth,
  };
};


export default connect(mapStateToProps)(PermitList);