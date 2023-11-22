import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Row, Col } from 'react-bootstrap';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { storeSiteData } from '../../Auth/auth';
import { useNavigate } from "react-router-dom";

const AddSites = () => {

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            const siteId = await storeSiteData(siteData);
            console.log('Site data submitted successfully. Site ID:', siteId);
            localStorage.removeItem('siteDraftData');
            navigate('/sites');
        } catch (error) {
            console.error('Error submitting site data:', error.message);
        }
    };


    const handleSaveDraft = () => {
        localStorage.setItem('siteDraftData', JSON.stringify(siteData));
    };

    useEffect(() => {
        const draftData = JSON.parse(localStorage.getItem('siteDraftData'));
        if (draftData) {
            setSiteData(draftData);
        }
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                    <Button type="submit">Submit</Button>
                    <Button style={{ marginLeft: "1rem", border: "1px solid #ccc" }} variant='light' onClick={handleSaveDraft}>Save as Draft</Button>
                </div>
            </form>
        </>
    )
}

export default AddSites