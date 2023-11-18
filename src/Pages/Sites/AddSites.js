import React from 'react'
import { Button, FloatingLabel, Form, Row, Col } from 'react-bootstrap';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const AddSites = () => {
    return (
        <>
            <div className='shadow p-5 mb-3'>
                <Row className='mb-5'>
                    <Col className='d-flex'>
                        <Link to="/sites"><FaArrowLeftLong style={{ marginLeft: "-1.8rem", marginBottom: ".5rem" }} /></Link><h6>SITE APPROVAL</h6>
                    </Col>
                    <hr style={{color:"lightgray"}}></hr>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel
                            label="Site Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder='_GENERAL PERMIT TO WORK'/>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            label="Site Address"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder='floor1, JCET' />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel
                            label="Site Code"
                            className="mb-3"
                        >
                            <Form.Select
                                aria-label="Default select example"
                                className='mt-0'
                            >
                                <option value="" disabled>Select Site</option>
                                <option value="CSE">CSE</option>
                                <option value="Tk 123">Tk 123</option>
                            </Form.Select>   
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            label="Site Location"
                            className="mb-3"
                        >
                            <Form.Select
                                aria-label="Default select example"
                                className='mt-0'
                            >
                                <option value="">Select Site</option>
                                <option value="CSE">CSE</option>
                                <option value="Tk 123">Tk 123</option>
                            </Form.Select> 
                        </FloatingLabel>
                    </Col>
                </Row>
            </div>
            <div>
                <Button>Submit</Button>
                <Button style={{ marginLeft: "1rem", border:"1px solid #ccc" }} variant='light'>Save as Draft</Button>
            </div>
        </>
    )
}

export default AddSites