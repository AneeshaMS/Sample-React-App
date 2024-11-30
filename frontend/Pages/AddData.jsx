import React, { useState } from "react";
import { Button, Stack, Modal, Form } from "react-bootstrap";
import axios from "axios";

const AddData = ({ getUsers }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    place: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addData = async (e) => {
    e.preventDefault();
    console.log("Data added:", formData);
    const response = await axios.post(
      "http://localhost:8080/users/add",
      formData
    );
    alert(response.data.message);
    getUsers();
    handleClose();
  };
  return (
    <Stack>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ width: "150px", marginBottom: "20px" }}
      >
        Add New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addData}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
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

export default AddData;
