import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  NAME_PROJECT,
  REQUESTED_SUCCEEDED_CLOSE_PROJECT,
  SHOW_PROJECT,
} from "../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchShowProject,
  fetchSearchProject,
  fetchDeleteProject,
} from "../redux/actionProjects";

function ShowProjects() {
  const dispatch = useDispatch();
  let history = useHistory();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);
  const [searchProject, setSearchProject] = useState("not found");
  const [back, setBack] = useState(false);

  useEffect(() => {
    dispatch({ type: SHOW_PROJECT, payload: [{}] });
    dispatch(fetchShowProject(store.users.userId));
    setTimeout(() => {
      console.log("setTimeout");
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT });
    }, 1000);
    console.log("useEffect");
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
    console.log(searchProject);
    console.log(store.projects.nameProject);

    if (store.projects.nameProject === searchProject) {
      dispatch(fetchSearchProject(store.projects.nameProject));
      setTimeout(() => {
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT });
      }, 1000);
    }
  }, [store.projects.nameProject]);

  const handleSubmit = () => {
    // event.preventDefault();
    dispatch({ type: NAME_PROJECT, payload: searchProject });
    setBack(true)
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

  const handleBack = () => {
    history.push("/projects/showProjects");
  };

  return (
    <div className="form111">
      {back ? 
         (<div className="button8"><Button variant="warning" onClick={handleBack}>&#8592;</Button></div>) : (<div></div>)
      }
     
      <div className="form7">
        <Form>
          <Row className="mb-3">
            <Form.Label>
              <h4>Enter the name of project:</h4>
            </Form.Label>

            <Form.Group
              as={Col}
              md="4"
              controlId="formGridAddress1"
              onChange={(e) => setSearchProject(e.target.value)}
            >
              <Form.Control
                placeholder="Enter project name"
                style={{ fontStyle: "italic" }}
              />
            </Form.Group>
          </Row>
          <Button variant="danger" type="submit" onClick={handleSubmit}>
            Find
          </Button>{" "}
          <br></br> <br></br>
          <Table striped bordered hover style={{ fontStyle: "italic" }}>
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
