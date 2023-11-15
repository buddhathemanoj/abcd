import React from 'react'

const PermitList = ({ permits }) => {
    console.log(permits)
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
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default PermitList