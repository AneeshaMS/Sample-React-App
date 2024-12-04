/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Button, Stack, Modal, Form } from "react-bootstrap";
import axios from "axios";

const EditData = ({ user, getUsers }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    place: "",
  });

  // Set initial form data when modal opens
  useEffect(() => {
    if (show) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        place: user.place || "",
      });
    }
  }, [show, user]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://myapp.tgwebapps.com/users/${user._id}`,
        formData
      );
      alert(response.data.message);
      getUsers();
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error.message);
      alert("Error updating user");
    }
  };

  return (
    <Stack>
      <Button variant="warning" onClick={handleShow} style={{ width: "80px" }}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPlace">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Place"
                name="place"
                value={formData.place}
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Stack>
  );
};

export default EditData;
