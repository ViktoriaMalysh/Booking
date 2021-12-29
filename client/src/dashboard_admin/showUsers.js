import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Col, Form, Row } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  NAME_USER_ADMIN,
  REQUESTED_SUCCEEDED_CLOSE_ADMIN,
  SHOW_PROJECT_ADMIN,
  SHOW_USERS_ADMIN,
  SHOW_USER_ID_ADMIN,
  USER,
} from "../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  fetchSearchUserAdmin,
  fetchSearchUsersAdmin,
  fetchShowUsersAdmin,
} from "../redux/actionAdmin";
import "../style/admin.css";

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

  useEffect(() => {
    if (store.admin.searchUserAdmin === searchUser) {
      console.log("store.admin.searchUserAdmin", store.admin.searchUserAdmin);
      console.log("searchOptions", searchOptions);
      dispatch(
        fetchSearchUsersAdmin(store.admin.searchUserAdmin, searchOptions)
      );
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
    setBack(true);
    dispatch({ type: NAME_USER_ADMIN, payload: searchUser });
  };

  const handleUser = (id) => {
    dispatch({ type: USER, payload: true });
    dispatch({ type: SHOW_USER_ID_ADMIN, payload: id });
    dispatch({ type: SHOW_PROJECT_ADMIN, payload: [{}] });
    dispatch(fetchSearchUserAdmin(id));
    history.push("/admin/profileUser");
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="adminform">
        <div className="form1111admin">
          <div className="spinner1">
            <Spinner
              animation="border"
              variant="primary"
              role="status"
            ></Spinner>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="form111admin">
        {back ? (
          <div className="button8">
            <Button variant="info" onClick={handleBack()}>
              &#8592;
            </Button>
          </div>
        ) : (
          <div></div>
        )}

        <div className="form7admin">
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
            <Button variant="primary" type="submit" onClick={handleFind}>
              Find
            </Button>{" "}
            <br></br> <br></br>
            <Table
              striped
              bordered
              hover
              variant="dark"
              style={{ fontStyle: "italic" }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>SURNAME</th>
                  <th>EMAIL</th>
                  <th>GENDER</th>
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
                          color: "white",
                          fontFamily: "Georgia",
                          fontStyle: "italic",
                        }}
                        onClick={() => handleUser(item.id)}
                      >
                        {item.id}
                      </Button>
                    </td>
                    <td>{item.name ? item.name : " - "}</td>
                    <td>{item.surname ? item.surname : " - "}</td>
                    <td>{item.email ? item.email : " - "}</td>
                    <td>{item.gender ? item.gender : " - "}</td>
                    <td>{item.country ? item.country : " - "}</td>
                    <td>{item.age ? item.age : " - "}</td>
                    <td>{item.phone > 0 ? "+380" + item.phone : "-"}</td>
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
  fetchSearchUserAdmin,
  fetchSearchUsersAdmin,
  fetchShowUsersAdmin,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowProjectsAdmin);
