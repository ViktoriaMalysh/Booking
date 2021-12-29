import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  REQUESTED_SUCCEEDED_CLOSE_USER,
  USER_EMAIL,
  USER_NAME,
  USER_PASSWORD,
  USER_SURNAME,
} from "../redux/types";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchAuth } from "../redux/actionUsers";
import { Alert } from "../Alert";

function Auth() {
  const [validated, setValidated] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (store.users.success) {
      setTimeout(() => {
        history.push("/");
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
      }, 1400);
    }
  }, [store.users.success]);

  useEffect(() => {
    if (store.users.userPassword !== "") {
      const user = {
        name: store.users.userName,
        surname: store.users.userSurname,
        email: store.users.userEmail,
        password: store.users.userPassword,
      };
      dispatch(fetchAuth(user));
    }
  }, [store.users.userPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    dispatch({ type: USER_NAME, payload: name });
    dispatch({ type: USER_SURNAME, payload: surname });
    dispatch({ type: USER_EMAIL, payload: email });
    dispatch({ type: USER_PASSWORD, payload: password });
  };

  const handlePush = () => {
    history.push("/users/login");
  };

  return (
    <div className="firstform7">
      {store.users.text && <Alert text={store.users.text} />}
      <div className="form117">
        <div className="button1">
          <Button variant="warning" onClick={handlePush}>
            &#8592;
          </Button>
        </div>

        <Form>
          <Row
            className="mb-3"
            style={{
              marginLeft: "3em",
              marginRight: "auto",
            }}
          >
            <Col xs="10">
              <Form.Group
                className="mb-3"
                controlId="formGridAddress1"
                onChange={(e) => setName(e.target.value)}
              >
                <Form.Label>
                  <h4>Name</h4>
                </Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  required
                  style={{ fontStyle: "italic" }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formGridAddress2"
                onChange={(e) => setSurname(e.target.value)}
              >
                <Form.Label>
                  <h4>Surname</h4>
                </Form.Label>
                <Form.Control
                  placeholder="Enter surname"
                  required
                  style={{ fontStyle: "italic" }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formGridEmail"
                onChange={(e) => setEmail(e.target.value)}
              >
                <Form.Label>
                  <h4>Email</h4>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  style={{ fontStyle: "italic" }}
                />
                <Form.Text className="text-muted">
                  <i>We'll never share your email with anyone else.</i>
                </Form.Text>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formGridPassword"
                onChange={(e) => setPassword(e.target.value)}
              >
                <Form.Label>
                  <h4>Password</h4>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  required
                  style={{ fontStyle: "italic" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group
            className="mb-3"
            style={{
              marginLeft: "4em",
              marginRight: "auto",
            }}
          >
            <Form.Check
              required
              label="I have read and agree with the rules of the Teamgeist"
              feedback="You must accept the Teamgeist"
            />
          </Form.Group>

          <Button
            variant="warning"
            type="submit"
            style={{
              marginLeft: "4em",
              marginRight: "auto",
            }}
            onClick={handleSubmit}
          >
            Authentication
          </Button>
        </Form>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  fetchAuth,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
