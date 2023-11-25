import { useState, useEffect } from 'react';
import { Col, Form, Row, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RiAddCircleFill } from 'react-icons/ri';
import { HiOutlineTrash } from 'react-icons/hi2';
import { CiEdit } from 'react-icons/ci';
import { collection, doc, getDocs, query, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import './Sites.css';

const Sites = () => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSite, setEditingSite] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/sites-create');
  };

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const sitesCollection = collection(db, 'sites');
        const q = query(sitesCollection);

        const querySnapshot = await getDocs(q);
        const siteData = [];

        querySnapshot.forEach((doc) => {
          siteData.push({ id: doc.id, ...doc.data() });
        });

        setSites(siteData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sites:', error.message);
        setError('Error fetching sites. Please try again later.');
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  const handleDelete = async (siteId) => {
    try {
      const siteRef = doc(db, 'sites', siteId);
      await deleteDoc(siteRef);
      setSites((prevSites) => prevSites.filter((site) => site.id !== siteId));
    } catch (error) {
      console.error('Error deleting site:', error.message);
      setError('Error deleting site. Please try again later.');
    }
  };

  const handleEditClick = (site) => {
    setEditingSite(site);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingSite((prevEditingSite) => ({
      ...prevEditingSite,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const siteRef = doc(db, 'sites', editingSite.id);
      await updateDoc(siteRef, { ...editingSite });

     
      setSites((prevSites) =>
        prevSites.map((site) => (site.id === editingSite.id ? { ...site, ...editingSite } : site))
      );

      setShowEditModal(false);
      setEditingSite(null);
    } catch (error) {
      console.error('Error saving changes:', error.message);
      
    }
  };

  return (
    <>
      <Row>
        <Col className="d-flex">
          <h4>List of Sites</h4>
        </Col>
        <Col lg={4} className="d-flex">
          <Button style={{ marginRight: '1rem' }} className='w-100' variant="primary" onClick={handleCreateClick}>
            Create Sites <RiAddCircleFill />
          </Button>
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
              <td className='text-center'>{site.siteCode}</td>
              <td className='text-center'>{site.siteAddress}</td>
              <td className='text-center'>
                <Button variant="danger" className='delete-btn' onClick={() => handleDelete(site.id)}>
                  <HiOutlineTrash style={{ fontSize: 'medium', marginBottom: '.1rem' }} />
                </Button>{' '}
                <Button variant="danger" className='delete-btn' onClick={() => handleEditClick(site)}>
                  <CiEdit style={{ fontSize: 'medium', marginBottom: '.1rem' }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
          
            type="text"
            placeholder="Site Name"
            name="siteName"
            value={editingSite?.siteName || ''}
            onChange={handleInputChange}
          />
          <Form.Control
            
            type="text"
            placeholder="Site Code"
            name="siteCode"
            value={editingSite?.siteCode || ''}
            onChange={handleInputChange}
          />
          <Form.Control
            type="text"
            placeholder="Site Address"
            name="siteAddress"
            value={editingSite?.siteAddress || ''}
            onChange={handleInputChange}
          />
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sites;