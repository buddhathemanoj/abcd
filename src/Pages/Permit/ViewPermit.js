import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const ViewPermit = () => {
  const location = useLocation();
  const permit = location.state && location.state.permit;
console.log(permit)
  return (
    <div>
      {permit && (
        <div>
      <Form>
      <Row className="mb-3">
              <Col>
                <Form.Group controlId="permitType">
                  <Form.Label>Permit Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={permit.permitType}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="site">
                  <Form.Label>Site</Form.Label>
                  <Form.Control type="text" value={permit.site} readOnly />
                </Form.Group>
              </Col>
            </Row>
      </Form>
   
      
          <p className="mt-3 mb-3">
            <Link to="/all-permits" style={{ textDecoration: "none" }}>
              <FaArrowLeft /> Back to view all permit
            </Link>
          </p>

          {/* Information */}
          <div className="p-4 shadow">
            <h6 style={{ color: "#0D3E78" }}>INFORMATION</h6>
            <hr></hr>
            <Row>
              <Col lg={4}>
                <input
                  type="checkbox"
                  checked={permit.isGeneralChecked}
                  disabled
                />{" "}
                <strong>GENERAL</strong>
              </Col>
              <Col lg={8} className="d-flex justify-content-between">
                <input
                  style={{ width: "230.5px", height: "46px" }}
                  type="date"
                  name="startDate"
                  value={permit.startDate}
                  className="add-permit-input"
                  disabled
                />
                <input
                  style={{ width: "230.5px", height: "46px" }}
                  type="time"
                  name="startTime"
                  className="add-permit-input"
                  value={permit.startTime}
                  disabled
                />
                <input
                  style={{ width: "230.5px", height: "46px" }}
                  type="date"
                  name="endDate"
                  value={permit.endDate}
                  className="add-permit-input"
                  disabled
                />
                <input
                  style={{ width: "230.5px", height: "46px" }}
                  type="time"
                  name="startTime"
                  className="add-permit-input"
                  value={permit.endTime}
                  placeholder="End Time"
                  disabled
                />
              </Col>
            </Row>

            <div className=" mt-5 mb-0">
                <Row>
                    <Col>
                    <Form.Label className="mt-0 mb-0 mr-2">Site2:</Form.Label>

                    </Col>
                    <Col>
                    <Form.Control style={{width:"400px"}} type="text" value={permit.site2} readOnly />

                    </Col>
                </Row>
</div>



            <Row className="mt-4">
              <Col>
                <div className="building-checkbox mr-3">
                  <h6 style={{ fontSize: "14px", color: "#1D1A17" }}>
                    Building<br></br>(Admin/Fab/CUP/Others)
                  </h6>

                  {permit.selectedBuildings.map((building) => (
                    <div key={building}>
                      <input
                        type="checkbox"
                        checked={permit.selectedBuildings.includes(building)}
                        disabled
                      />
                      {building} <br></br>
                    </div>
                  ))}
                  <input
                    style={{ fontSize: "14px" }}
                    type="checkbox"
                    disabled
                  />
                  {''} Others (Pls Specify)
                </div>
              </Col>

              <Col>
                <textarea
                  className="building-textArea"
                  value={permit.buildingNotes}
                  disabled
                ></textarea>
              </Col>

              <Col>
                <h6>Level</h6>
                <div className="level-checkbox">
                  {permit.selectedLevels.map((level) => (
                    <div key={level}>
                      <input
                        type="checkbox"
                        checked={permit.selectedLevels.includes(level)}
                        disabled
                      />
                      {level} <br></br>
                    </div>
                  ))}
                </div>
              </Col>

              <Col>
                <textarea
                  className="building-textArea"
                  placeholder="Others (Pls Specify)"
                  style={{ textAlign: "center" }}
                  value={permit.levelNotes}
                  disabled
                ></textarea>
              </Col>
            </Row>

            {/* ... (Remaining code) */}

            {/* Declaration */}
            <div className="p-4 shadow mt-3">
              <h6 style={{ color: "#0D3E78" }}>
                DECLARATION, CERTIFICATION & AUTHORIZATION
              </h6>
              <hr></hr>

              {/* ... (Remaining code) */}

              <div className="mt-5"></div>
            </div>

            {/* Declaration */}
            <div className="p-4 shadow mt-3">
              <h6 style={{ color: "#0D3E78" }}>DECLARATION</h6>
              <hr></hr>

              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                <input type="checkbox" className="m-1" disabled checked />
                By checking this checkbox, I solemnly declared that I have checked through the documents. All the documents that are required by the ePermit System are uploaded and correct to the best of my knowledge. I will be liable if the documents are not in order and will be subjected to legal actions by EHS if applicable.
              </div>
            </div>

            <div className="mt-4 text-end">
              <Button variant="primary" className="submit-btn" disabled>
                Approve
              </Button>
              <Button variant="danger" className="ml-2" disabled>
                Cancel
              </Button>
            </div>
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPermit;
