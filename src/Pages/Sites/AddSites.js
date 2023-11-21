import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Row, Col } from 'react-bootstrap';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const AddSites = () => {

    const [siteName, setSiteName] = useState("")
    const [siteAddress, setSiteAddress] = useState("")
    const [siteCode, setSiteCode] = useState("")
    const [siteLocation, setSiteLocation] = useState("")

    //Store submitted data in local storage
    useEffect(() => {
        // Check for submitted data in local storage and prepopulate the form fields
        const submittedData = JSON.parse(localStorage.getItem('submittedData')) || {};
        setSiteName(submittedData.siteName || '');
        setSiteAddress(submittedData.siteAddress || '');
        setSiteCode(submittedData.siteCode || '');
        setSiteLocation(submittedData.siteLocation || '');
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleSubmit = () => {
        const newSite = {
            siteName,
            siteAddress,
            siteCode,
            siteLocation
        }

        localStorage.setItem('submittedData', JSON.stringify(newSite));

        localStorage.removeItem('draftData');

        setSiteName('')
        setSiteAddress('')
        setSiteCode('')
        setSiteLocation('')
    }
    //Store draftData in local storage
    useEffect(() => {
        // Check for draft data in local storage and prepopulate the form fields
        const draftData = JSON.parse(localStorage.getItem('draftData')) || [];
        if (draftData.length > 0) {
            const lastDraft = draftData[draftData.length - 1];
            setSiteName(lastDraft.siteName || "");
            setSiteAddress(lastDraft.siteAddress || "");
            setSiteCode(lastDraft.siteCode || "");
            setSiteLocation(lastDraft.siteLocation || "");
        }
        else {
            setSiteName('')
            setSiteAddress('')
            setSiteCode('')
            setSiteLocation('')
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const saveAsDraft = () => {
        const newSite = {
            siteName,
            siteAddress,
            siteCode,
            siteLocation
        };

        // Save as draft in local storage
        const draftData = JSON.parse(localStorage.getItem('draftData')) || [];
        const updatedDraftData = [...draftData, newSite];
        localStorage.setItem('draftData', JSON.stringify(updatedDraftData));
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
                                placeholder='_GENERAL PERMIT TO WORK'
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
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
                                placeholder='floor1, JCET'
                                value={siteAddress}
                                onChange={(e) => setSiteAddress(e.target.value)}
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
                                value={siteCode}
                                onChange={(e) => setSiteCode(e.target.value)}
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
                <Button style={{ marginLeft: "1rem", border: "1px solid #ccc" }} variant='light' onClick={saveAsDraft}>Save as Draft</Button>
            </div>
        </>
    )
}

export default AddSites