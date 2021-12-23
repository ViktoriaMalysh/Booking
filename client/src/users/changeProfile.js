import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { REQUESTED_SUCCEEDED_CLOSE_USER, USER_AGE, USER_COUNTRY, USER_EMAIL, USER_NAME, USER_PASSWORD, USER_PHONE, USER_SEX, USER_SURNAME } from "../redux/types";
import { useHistory } from "react-router-dom";
import "../App.css";
import { fetchChange } from "../redux/actionUsers";

function ChangeProfile() {
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(fetchChange(store.users.userId, name, surname, sex, age, country, phone, email, password));

    if(store.users.change){
      dispatch({ type: USER_NAME, payload: name });
      dispatch({ type: USER_SURNAME, payload: surname });
      dispatch({ type: USER_EMAIL, payload: email });

      dispatch({ type: USER_AGE, payload: age });
      dispatch({ type: USER_SEX, payload: sex });
      dispatch({ type: USER_COUNTRY, payload: country });
      dispatch({ type: USER_PHONE, payload: phone });
    }

    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
    }, 1000);

    history.push("/users/myProfile");
  
  };

  return (
    <div className="firstform7">
      {/* {store.users.text && <Alert text={store.users.text} />} */}
      <div className="form117">
        <Form>
          <Row className="mb-3">
            <Form.Group
              className="mb-3"
              as={Col}
              md="8"
              controlId="formGridAddress1"
              onChange={(e) => setName(e.target.value)}
            >
              <Form.Label>
                <h4>
                  Enter name
                </h4>
              </Form.Label>
              <Form.Control placeholder="Enter name" style={{ fontStyle: "italic" }} required />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGridAddress2"
              as={Col}
              md="8"
              onChange={(e) => setSurname(e.target.value)}
            >
              <Form.Label>
                <h4>
                  Enter surname
                </h4>
              </Form.Label>
              <Form.Control placeholder="Enter surname" style={{ fontStyle: "italic" }} required />
            </Form.Group>



            <Row className="align-items-center">
              <Col xs="auto" className="my-1">
                <Form.Label>
                  <h4>
                    Choose Sex
                  </h4>
                </Form.Label>
              </Col>
              <Col xs="auto" className="my-1">
                <Form.Select className="me-sm-2" id="inlineFormCustomSelect" onChange={(e) => setSex(e.target.value)}>
                  <option value="0">Choose...</option>
                  <option value="male">Mele</option>
                  <option value="femele">Femele</option>
                </Form.Select>
              </Col>
            </Row>



            <Form.Group
              className="mb-3"
              controlId="formGridEmail"
              as={Col}
              md="8"
              onChange={(e) => setAge(e.target.value)}
            >
              <Form.Label>
                <h4>
                  Enter Age
                </h4>
              </Form.Label>
              <Form.Control placeholder="Enter age" style={{ fontStyle: "italic" }} required />
            </Form.Group>


            <Form.Group
              className="mb-3"
              controlId="formGridEmail"
              as={Col}
              md="8"
              onChange={(e) => setCountry(e.target.value)}
            >
              <Form.Label>
                <h4>
                  Enter your country
                </h4>
              </Form.Label>
              <Form.Control placeholder="Enter country" style={{ fontStyle: "italic" }} required />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGridEmail"
              as={Col}
              md="8"
              onChange={(e) => setPhone(e.target.value)}
            >
              <Form.Label>
                <h4>
                  Enter your phone number
                </h4>
              </Form.Label>
              <Form.Control placeholder="Enter phone number" style={{ fontStyle: "italic" }} required />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formGridEmail"
              as={Col}
              md="8"
              onChange={(e) => setEmail(e.target.value)}
            >
              <Form.Label>
                <h4>
                  New email
                </h4>
              </Form.Label>
              <Form.Control type="email" placeholder="Enter email" style={{ fontStyle: "italic" }} required />
            </Form.Group>


            <Form.Group
              className="mb-3"
              controlId="formGridPassword"
              onChange={(e) => setPassword(e.target.value)}
              as={Col}
              md="8"
            >
              <Form.Label>
                <h4>
                  Enter your password
                </h4>
              </Form.Label>
              <Form.Control type="password" placeholder="Password" style={{ fontStyle: "italic" }} required />
            </Form.Group>
          </Row>

          <Button variant="warning" type="submit" onClick={handleSubmit}>
            Save change
          </Button>
        </Form>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  fetchChange,
  // fetchDeleteTickets,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfile);
