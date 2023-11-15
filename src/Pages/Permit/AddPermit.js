import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";

const AddPermit = () => {
    return (
        <>
            <Row>
                <Col>
                    <p className='mb-0'>Permit Type</p>
                    <Form.Select aria-label="Default select example" className='mt-0'>
                        <option>_GENERAL PERMIT TO WORK</option>
                        <option value="1">OTHER</option>
                        <option value="2">OTHER</option>
                        <option value="3">OTHER</option>
                    </Form.Select>
                </Col>
                <Col>
                    <p className='mb-0'>Site</p>
                    <Form.Select aria-label="Default select example" className='mt-0'>
                        <option disabled>Select Site</option>
                        <option value="1">OTHER</option>
                        <option value="2">OTHER</option>
                        <option value="3">OTHER</option>
                    </Form.Select>
                </Col>
            </Row>
            <p className='mt-3 mb-3'><Link to="#" style={{ textDecoration: "none" }}><FaArrowLeft /> Back to view all permit</Link></p>

            <div className='p-4 shadow'>
                <h5>INFORMATION</h5><hr></hr>
                <Row>
                    <Col lg={4}>
                        <input type="checkbox" /> <strong>GENERAL</strong>
                    </Col>
                    <Col lg={8} className='d-flex justify-content-between w-max'>
                        <input type="date" />
                        <input type="date" />
                        <input type="date" />
                        <input type="date" />
                    </Col>
                </Row>

                <div className='d-flex mt-5 mb-0'>
                    <Form.Select aria-label="Default select example" className='w-25'>
                        <option>Site</option>
                        <option value="1">OTHER</option>
                        <option value="2">OTHER</option>
                        <option value="3">OTHER</option>
                    </Form.Select>
                    <h6 style={{ marginLeft: "10px", fontSize:"12px" }}>Note that Start Date and End Date Max 5 Days</h6>
                </div>
                <span style={{color:"red", fontSize:"12px", marginTop:"0"}}>Required</span>

                <Row className='mt-4'>
                    <Col lg={2}>
                        <h6>Building<br></br>(Admin/Fab/Cup/Others)</h6>
                        <input type="checkbox" /> ADMIN <br></br>
                        <input type="checkbox" /> FAB 1A <br></br>
                        <input type="checkbox" /> FAB 2A <br></br>
                        <input type="checkbox" /> EXTERNAL <br></br>
                        <input type="checkbox" /> CARPARK <br></br>
                        <input type="checkbox" /> Others (Pls Specify)
                    </Col>
                    <Col lg={4}>
                        <input type="text" style={{ marginLeft: "1rem" }} className='w-100 h-50 border rounded' />
                    </Col>
                    <Col lg={2}>
                        <h6>Level</h6>
                        <input type="checkbox" /> BASEMENT <br></br>
                        <input type="checkbox" /> L1 <br></br>
                        <input type="checkbox" /> L2 <br></br>
                        <input type="checkbox" /> L3 <br></br>
                        <input type="checkbox" /> L4 <br></br>
                        <input type="checkbox" /> L5 <br></br>
                        <input type="checkbox" /> ROOF
                    </Col>
                    <Col lg={4}>
                        <input type="text" className='w-100 h-50 border rounded' />
                    </Col>
                </Row>
                <div className='mt-4 text-end'>
                    <Button variant="primary">Submit</Button>
                </div>
            </div>
        </>
    )
}

export default AddPermit