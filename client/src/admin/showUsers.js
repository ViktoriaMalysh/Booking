import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert } from "../Alert";
import {
  FLAG_DELETE,
  NAME_PROJECT_ADMIN,
  NAME_USER_ADMIN,
  REQUESTED_SUCCEEDED_CLOSE_ADMIN,
  SHOW_PROJECT_ADMIN,
  SHOW_USERS_ADMIN,
  SHOW_USER_ID_ADMIN,
  SUCCESS,
  USER,
} from "../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchDeleteProjectAdmin,
  fetchSearchProjectAdmin,
  fetchSearchUserAdmin,
  fetchSearchUsersAdmin,
  fetchShowProjectAdmin,
  fetchShowUsersAdmin,
} from "../redux/actionAdmin";

function ShowProjectsAdmin() {
  const dispatch = useDispatch();
  let history = useHistory();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);
  const [searchUser, setSearchUser] = useState("not found");
  const [back, setBack] = useState(false);
  const [searchOptions, setSearchOptions] = useState("");

  useEffect(() => {
    dispatch({ type: SHOW_USERS_ADMIN, payload: [{}] });
    dispatch(fetchShowUsersAdmin());
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
    }, 1000);
  }, []);

  // useEffect(() => {
  //   if (store.projects.delete) {
  //     dispatch({ type: SHOW_PROJECT_ADMIN, payload: [{}] });
  //     dispatch(fetchShowProjectAdmin());
  //     setTimeout(() => {
  //       dispatch({ type: SUCCESS, payload: false });
  //       dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
  //       dispatch({ type: FLAG_DELETE, payload: false });
  //     }, 600);
  //   }
  // }, [store.projects.delete]);

  useEffect(() => {
    if (store.admin.searchUserAdmin === searchUser) {
      console.log('searchOptions', searchOptions)
      dispatch(fetchSearchUsersAdmin(store.admin.searchUserAdmin, searchOptions));
      setTimeout(() => {
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
      }, 1000);
    }
  }, [store.admin.searchUserAdmin]);

  const handleBack = () => {
    setBack(false);
    dispatch({ type: SHOW_USERS_ADMIN, payload: [{}] });
    dispatch(fetchShowUsersAdmin());
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
    }, 1000);
  };

  if (store.admin.showUsersAdmin.length === 0) {
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
          <p className="pMessage">No any users...</p>
        </div>
      </div>
    );
  }

  const handleFind = () => {
    setBack(true)
    dispatch({ type: NAME_USER_ADMIN, payload: searchUser });
    // setBack(true);///been
  };

  const handleUser = (id) => {
    // setBack(true);
    dispatch({ type: USER, payload: true });
    dispatch({ type: SHOW_USER_ID_ADMIN, payload: id });
    dispatch({ type: SHOW_PROJECT_ADMIN, payload: [{}] });
    dispatch(fetchSearchUserAdmin(id));
    history.push("/admin/profileUser");
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
    }, 1000);
  };

  // function DeleteProject(id) {
  //   dispatch(fetchDeleteProjectAdmin(id));
  //   dispatch({ type: FLAG_DELETE, payload: true });
  // }

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
            <Button variant="warning" onClick={handleBack()}>
              &#8592;
            </Button>
          </div>
        ) : (
          <div></div>
        )}

        <div className="form7">
          <Form>
            <Row className="align-items-center">
              <Col xs="auto" className="my-1">
                <Form.Label>
                  <h4>Select search options</h4>
                </Form.Label>
              </Col>
              <Col xs="auto" className="my-1">
                <Form.Select
                  className="me-sm-2"
                  id="inlineFormCustomSelect"
                  onChange={(e) => setSearchOptions(e.target.value)}
                >
                  <option value="0">Choose...</option>
                  <option value="name">Name</option>
                  <option value="surname">Surname</option>
                  <option value="email">Email</option>
                </Form.Select>
              </Col>
            </Row>
            {searchOptions.length > 1 ? (
              <div>
                <Form.Label>
                  <h4>Enter the {searchOptions} of user:</h4>
                </Form.Label>

                <Form.Group
                  as={Col}
                  md="4"
                  controlId="formGridAddress1"
                  onChange={(e) => setSearchUser(e.target.value)}
                >
                  <Form.Control
                    placeholder={"Enter users " + searchOptions}
                    style={{ fontStyle: "italic" }}
                  />
                </Form.Group>
              </div>
            ) : (
              <div></div>
            )}
            <Button variant="danger" type="submit" onClick={handleFind}>
              Find
            </Button>{" "}
            <br></br> <br></br>
            <Table striped bordered hover style={{ fontStyle: "italic" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>SURNAME</th>
                  <th>EMAIL</th>
                  <th>SEX</th>
                  <th>COUNTRY</th>
                  <th>AGE</th>
                  <th>PHONE</th>
                </tr>
              </thead>

              <tbody>
                {store.admin.showUsersAdmin.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Button
                        variant="link"
                        style={{
                          color: "black",
                          fontFamily: "Georgia",
                          fontStyle: "italic",
                        }}
                        onClick={() => handleUser(item.id)}
                      >
                        {item.id}
                      </Button>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.surname}</td>
                    <td>{item.email}</td>
                    <td>{item.sex}</td>
                    <td>{item.country}</td>
                    <td>{item.age}</td>
                    <td>{item.phone}</td>
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
