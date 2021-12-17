import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { NAME_PROJECT, REQUESTED_SUCCEEDED_CLOSE_PROJECT, SHOW_PROJECT } from "../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchShowProject, fetchSearchProject, fetchDeleteProject } from "../redux/actionProjects";

function ShowProjects() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);
  const [searchProject, setSearchProject] = useState("");

  useEffect(() => {
    dispatch({ type: SHOW_PROJECT, payload: [{}] });
    dispatch(fetchShowProject(store.users.userId));
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT });
    }, 1000);

  }, []);

  useEffect(() => {
    if (store.projects.delete) {
      dispatch({ type: SHOW_PROJECT, payload: [{}] });
      dispatch(fetchShowProject(store.users.userId));
      setTimeout(() => {
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT });
      }, 1000);
    }
  }, [store.projects.delete]);

  useEffect(() => {
    if (store.projects.nameProject === searchProject) {
      dispatch(fetchSearchProject(store.projects.nameProject));
      setTimeout(() => {
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT });
      }, 1000);
    }
  }, [store.projects.nameProject]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: NAME_PROJECT, payload: searchProject });
  };

  function DeleteProject(id) {
    dispatch(fetchDeleteProject(id));
    dispatch(fetchShowProject(store.users.userId));
    dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT });
  }

  if (loading) {
    return (
      <div className="form1111">
        <Spinner animation="border" variant="danger" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="form111">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Label>
            <h4>
              <i>Enter the name of project:</i>
            </h4>
          </Form.Label>

          <Form.Group
            as={Col}
            md="4"
            controlId="formGridAddress1"
            onChange={(e) => setSearchProject(e.target.value)}
          >
            <Form.Control placeholder="Enter project name" />
          </Form.Group>
        </Row>
        <Button variant="danger" type="submit">
          Find
        </Button>{" "}
        <br></br> <br></br>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>PROJECT NAME</th>
              <th>MINUTES</th>
              <th>DELETE</th>
            </tr>
          </thead>

          <tbody>
            {store.projects.showProject.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.projectName}</td>
                <td>{item.h}</td>
                <td>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={() => DeleteProject(item.id, item.projectName)}
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Form>
    </div>
  );
}

const mapDispatchToProps = {
  fetchShowProject,
  fetchSearchProject,
  fetchDeleteProject,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProjects);
