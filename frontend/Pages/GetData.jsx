import React, { useEffect, useState } from "react";
import { Button, Stack, Table } from "react-bootstrap";
import EditData from "./EditData";
import AddData from "./AddData";

const GetData = () => {
  const [usersList, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };
  const deleteUser = async (id) => {
    await fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };
  return (
    <>
      <AddData getUsers={getUsers} />
      {usersList.length > 0 ? (
        <Table striped bordered hover style={{ width: "1200px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Place</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.place}</td>
                <td>
                  <EditData user={user} getUsers={getUsers} />

                  <Button
                    variant="danger"
                    style={{ marginTop: "-65px" }}
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h5 style={{ width: "100%" }}>No User Found</h5>
      )}
    </>
  );
};

export default GetData;
