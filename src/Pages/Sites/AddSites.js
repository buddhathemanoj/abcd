import React, { useState } from 'react'
import { Button, FloatingLabel, Form, Row, Col } from 'react-bootstrap';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { storeSiteData } from '../../Auth/auth';

const AddSites = () => {

    const initialSiteData = {
        siteName: '',
        siteAddress: '',
        siteCode: '',
    };

    const [siteData, setSiteData] = useState(initialSiteData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSiteData({
            ...siteData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            // Call the function to store site data in Firestore
            const siteId = await storeSiteData(siteData);

            // Perform any additional actions after storing data if needed

            console.log('Site data submitted successfully. Site ID:', siteId);
        } catch (error) {
            console.error('Error submitting site data:', error.message);
            // Handle the error as needed
        }
    };

    return (
        <>
            <div className='shadow p-5 mb-3'>
                <Row className='mb-5'>
                    <Col className='d-flex'>
                        <Link to="/sites"><FaArrowLeftLong style={{ marginLeft: "-1.8rem", marginBottom: ".5rem" }} /></Link><h6>SITE APPROVAL</h6>
                    </Col>
                    <hr style={{ color: "lightgray" }}></hr>
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel
                            label="Site Name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="siteName"
                                placeholder='_GENERAL PERMIT TO WORK'
                                value={siteData.siteName}
                                onChange={handleInputChange}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            label="Site Address"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="siteAddress"
                                placeholder='floor1, JCET'
                                value={siteData.siteAddress}
                                onChange={handleInputChange}
                            />
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
                                name="siteCode"
                                value={siteData.siteCode}
                                onChange={handleInputChange}
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
                <Button onClick={handleSubmit}>Submit</Button>
                <Button style={{ marginLeft: "1rem", border: "1px solid #ccc" }} variant='light'>Save as Draft</Button>
            </div>
        </>
    )
}

export default AddSites