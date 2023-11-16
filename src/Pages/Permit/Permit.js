import React, { useState } from "react";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import PermitList from "./PermitList";
import AddPermit from "./AddPermit";
import { connect } from "react-redux";

const Permit = ({auth}) => {
const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("listOfPermits");
    const [showAddPermit, setShowAddPermit] = useState(false);

  

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setShowAddPermit(false);
    };

    const handleCreateClick = () => {
        setShowAddPermit(true);
        setActiveTab("listOfPermits");
        navigate("/all-permits-create");
    };

    return (
        <>
            {!showAddPermit && (
                <Row>
                    <Col className="d-flex">
                        <h4 onClick={() => handleTabClick("listOfPermits")} style={{ cursor: "pointer", marginRight: "1rem", color: activeTab === "listOfPermits" ? "blue" : "black" }}>List of Permits</h4>
                        <h4 onClick={() => handleTabClick("childPermit")} style={{ cursor: "pointer", color: activeTab === "childPermit" ? "blue" : "black" }}>Child Permit</h4>
                    </Col>
                    <Col lg={4} className="d-flex">
                        <Button style={{ marginRight: "2rem" }} variant="primary" onClick={handleCreateClick}>Create</Button>
                        <Form.Control type="text" placeholder="Search" />
                    </Col>
                    <PermitList />
                </Row>
            )}
            {/* {!showAddPermit && activeTab === "listOfPermits" && (
                <>
                    <Breadcrumb style={{ marginTop: "1rem" }}>
                        <Breadcrumb.Item active>All Permits</Breadcrumb.Item>
                        <Breadcrumb.Item active>List of Permits</Breadcrumb.Item>
                    </Breadcrumb>
                    {activeTab === "listOfPermits" && (
                        
                    )}
                </>
            )}
            {showAddPermit && <AddPermit />} */}
        </>
    )
}

const mapStateToProps = (state) => {
   
    return {
      auth: state.auth,
    };
  };
  
  
export default connect(mapStateToProps)(Permit);