import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  REQUESTED_SUCCEEDED_CLOSE_USER,
  USER_EMAIL,
  USER_PASSWORD,
} from "../redux/types";
import { Alert } from "../Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchLogin } from "../redux/actionUsers";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  if (store.users.success) {
    setTimeout(() => {
      history.push("/home");
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
    }, 1400);
  }

  useEffect(() => {
    if (store.users.userPassword != "") {
      const user = {
        email: store.users.userEmail,
        password: store.users.userPassword,
      };
      dispatch(fetchLogin(user));
    }
  }, [store.users.userPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: USER_EMAIL, payload: email });
    dispatch({ type: USER_PASSWORD, payload: password });
  };


  const handlePush = () => {
  history.push("/users/auth")
  };

 

  return (
    <div className="firstform">
      {store.users.text && <Alert text={store.users.text} />}
      <div className="form11">
        <Form >
          <Row
            className="mb-3"
            style={{
              marginLeft: "6em",
              marginRight: "auto",
            }}
          >
            <Col xs="10">
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
                  style={{ fontStyle: "italic" }}
                  required
                />
                <Form.Text className="text-muted">
                  <i>We'll never share your email with anyone else</i>
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
                  placeholder="Password"
                  style={{ fontStyle: "italic" }}
                  required
                />
              </Form.Group>
            </Col>
          </Row>


          
        </Form>
        
  
      <div className="ppp">

      <Button
            variant="warning"
            type="submit"
            style={{
              // marginLeft: "7em",
              // marginRight: "auto",
              marginTop: "2em"
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
      <p style={{ marginTop: "1em" }}>Doesn`t login? Click here</p>
          <Button
            variant="warning"
            type="submit"
            style={{
              // marginLeft: "7em",
              // marginRight: "auto",
              marginTop: "3em"
            }}

            onClick={handlePush}
          >
            Authorization
          </Button>
      </div>
          </div>
    </div>
  );
}

const mapDispatchToProps = {
  fetchLogin,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
