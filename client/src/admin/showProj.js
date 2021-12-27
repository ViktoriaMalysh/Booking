import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert } from "../Alert";
import {
  FLAG_DELETE,
  NAME_PROJECT_ADMIN,
  PROJECT,
  REQUESTED_SUCCEEDED_CLOSE_ADMIN,
  SHOW_PROJECT_ADMIN,
  SHOW_USER_ID_ADMIN,
  SUCCESS,
} from "../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchDeleteProjectAdmin,
  fetchSearchProjectAdmin,
  fetchSearchUserAdmin,
  fetchShowProjectAdmin,
} from "../redux/actionAdmin";

function ShowProjectsAdmin() {
  const dispatch = useDispatch();
  let history = useHistory();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);
  const [searchProject, setSearchProject] = useState("not found");
  const [back, setBack] = useState(false);

  useEffect(() => {
    dispatch({ type: SHOW_PROJECT_ADMIN, payload: [{}] });
    dispatch(fetchShowProjectAdmin());
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
    }, 1000);
  }, []);

  useEffect(() => {
    if (store.projects.delete) {
      dispatch({ type: SHOW_PROJECT_ADMIN, payload: [{}] });
      dispatch(fetchShowProjectAdmin());
      setTimeout(() => {
        dispatch({ type: SUCCESS, payload: false });
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
        dispatch({ type: FLAG_DELETE, payload: false });
      }, 600);
    }
  }, [store.projects.delete]);

  useEffect(() => {
    if (store.admin.nameProject === searchProject) {
      dispatch(fetchSearchProjectAdmin(store.admin.nameProject));
      setTimeout(() => {

        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
      }, 1000);
    }
  }, [store.admin.nameProject]);

  const handleBack = () => {
  
    setBack(false);
    dispatch({ type: SHOW_PROJECT_ADMIN, payload: [{}] });
    dispatch(fetchShowProjectAdmin());
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
    }, 1000);
  };

  if (store.admin.showProjectsAdmin.length === 0) {
    return (
      <div className="form111">
        {back ? (
          <div className="button8">
            <Button variant="warning" onClick={handleBack}>
              &#8592;
            </Button>
          </div>
        ) : (
          <div></div>
        )}

        <div className="form71">
          <p className="pMessage">No completed projects...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    dispatch({ type: NAME_PROJECT_ADMIN, payload: searchProject });
    setBack(true);
  };

  const handleUser = (id) => {
    dispatch({ type: PROJECT, payload: true });
    dispatch({ type: SHOW_USER_ID_ADMIN, payload: id });
    dispatch({ type: SHOW_PROJECT_ADMIN, payload: [{}] });
    dispatch(fetchSearchUserAdmin(id));
    history.push("/admin/profileUser");
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
    }, 1000);
    
  };

  function DeleteProject(id) {
    dispatch(fetchDeleteProjectAdmin(id));
    dispatch({ type: FLAG_DELETE, payload: true });
  }

  if (loading) {
    return (
      <div className="form1111">
        <Spinner animation="border" variant="danger" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div>
      
      {/* {store.projects.text && <Alert text={store.projects.text} />} */}
      <div className="form111">
        {back ? (
          <div className="button8">
            <Button variant="warning" onClick={handleBack}>
              &#8592;
            </Button>
          </div>
        ) : (
          <div></div>
        )}

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
                  <th>ID USER</th>
                  <th>PROJECT NAME</th>
                  <th>MINUTES</th>
                  <th>DELETE</th>
                </tr>
              </thead>

              <tbody>
                {store.admin.showProjectsAdmin.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <Button
                        variant="link"
                        style={{
                          color: "black",
                          fontFamily: "Georgia",
                          fontStyle: "italic",
                        }}
                        onClick={() => handleUser(item.id_user)}
                      >
                        {item.id_user}
                      </Button>
                    </td>
                    <td>{item.projectName}</td>
                    <td>{item.h}</td>
                    <td>
                      <Button
                        variant="danger"
                        type="submit"
                        onClick={() => DeleteProject(item.id)}
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
    </div>
  );
}

const mapDispatchToProps = {
  fetchShowProjectAdmin,
  fetchSearchProjectAdmin,
  fetchDeleteProjectAdmin,
  fetchSearchUserAdmin,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProjectsAdmin);
