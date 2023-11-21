import { Col, Form, Row, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { RiAddCircleFill } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
import './Sites.css'

const Sites = () => {

    const [sites, setSites] = useState([])
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate("/sites-create");
    };

    useEffect(() => {
        // Retrieve submitted data from local storage
        const submittedData = JSON.parse(localStorage.getItem('submittedData')) || {};

        // Check if there is submitted data
        if (Object.keys(submittedData).length > 0) {
            setSites([submittedData]);
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <>
            <Row>
                <Col className="d-flex">
                    <h4>List of Sites</h4>
                </Col>
                <Col lg={4} className="d-flex">
                    <Button style={{ marginRight: "1rem" }} className='w-100' variant="primary" onClick={handleCreateClick}>Create Sites <RiAddCircleFill /></Button>
                    <Form.Control type="text" placeholder="Search" className="input-search" />
                </Col>
            </Row>

            <table className="user-details-table mt-3">
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th>NAME</th>
                        <th className='text-center'>CODE</th>
                        <th className='text-center'>ADDRESS</th>
                        <th className='text-center'>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map((site, index) => (
                        <tr key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td>{site.siteName}</td>
                            <td className='text-center'>{site.siteAddress}</td>
                            <td className='text-center'>{site.siteCode}</td>
                            <td className='text-center'><Button variant="danger" className='delete-btn'><HiOutlineTrash style={{fontSize:"x-large"}} /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Sites