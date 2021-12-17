import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  NAME_PROJECT,
  REQUESTED_SUCCEEDED_CLOSE_PROJECT,
} from "../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchNewProject } from "../redux/actionProjects";
import { Alert } from "../Alert";

function NewProject() {
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [newProject, setNewProject] = useState("");

  // useEffect(() => {
  //   dispatch({ type: NAME_PROJECT, payload: "" });
  // }, [])

  useEffect(() => {
    if (store.projects.success) {
      setTimeout(() => {
        history.push("/projects/teamgeist");
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT });
      }, 1400);
    }
  }, [store.projects.success]);

  useEffect(() => {
    if (store.projects.flagSuccess) {
      setTimeout(() => {
        dispatch({ type: NAME_PROJECT, payload: "" });
      }, 1400);
    }
  }, [store.projects.flagSuccess]);

  useEffect(() => {
    if (store.projects.nameProject != "") {
      const project = {
        projectName: store.projects.nameProject,
        id: store.users.userId,
      };
      dispatch(fetchNewProject(project));
    }
  }, [store.projects.nameProject]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: NAME_PROJECT, payload: newProject });
  };

  return (
    <div className="firstform">
      {store.projects.text && <Alert text={store.projects.text} />}
      <div className="form11">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3"
                      style={{
                        marginLeft: "5em",
                        marginRight: "auto",
                      }}>
            <Col xs="10">
              <Form.Group
                className="mb-3"
                controlId="formGridAddress1"
                onChange={(e) => setNewProject(e.target.value)}
              >
                <Form.Label>
                  <h4>Project name</h4>
                </Form.Label>
                <Form.Control placeholder="Enter project name" style={{ fontStyle: 'italic' }} required />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="warning" type="submit"   style={{
                        marginLeft: "5.8em",
                        marginRight: "auto",
                      }}>
            Create project
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  fetchNewProject,
};

function mapStateToProps(state) {
  return {
    text: state.projects.text,
    store: state,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);
