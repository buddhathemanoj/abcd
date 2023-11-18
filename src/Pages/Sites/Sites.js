import { Col, Form, Row, Button } from 'react-bootstrap'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { RiAddCircleFill } from "react-icons/ri";
import './Sites.css'

const Sites = () => {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        navigate("/sites-create");
    };

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
                    <tr>
                        <td className='text-center'></td>
                        <td></td>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                        <td className='text-center'></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default Sites