import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Col } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { FLAG, REQUESTED_SUCCEEDED_CLOSE_USER } from "../redux/types";
import { useHistory } from "react-router-dom";
import "../style/App.css";
import { fetchChangePass } from "../redux/actionUsers";

function ChangePassword() {
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (store.users.flag) {
      history.push("/users/changeProfile");
      setTimeout(() => {
        dispatch({ type: FLAG, payload: false });
      }, 1200);
    }
  }, [store.users.flag]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchChangePass(store.users.userId, password));
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
    }, 1000);
  };

  return (
    <div>
      {store.users.userRole < 2 ? (
        <div className="firstform7">
          <div className="form117">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formGridPassword"
                onChange={(e) => setPassword(e.target.value)}
                as={Col}
                md="8"
              >
                <Form.Label>
                  <h4>Enter your password</h4>
                </Form.Label>
                <Form.Control
                  type="password"
                  style={{ fontStyle: "italic" }}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button variant="warning" type="submit" onClick={handleSubmit}>
                Check password
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div className="firstform7admin">
          <div className="form117admin">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formGridPassword"
                onChange={(e) => setPassword(e.target.value)}
                as={Col}
                md="8"
              >
                <Form.Label>
                  <h4>Enter your password</h4>
                </Form.Label>
                <Form.Control
                  type="password"
                  style={{ fontStyle: "italic" }}
                  placeholder="Password"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Check password
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  fetchChangePass,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
