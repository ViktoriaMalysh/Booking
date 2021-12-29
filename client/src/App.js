import React, { useEffect, useState } from "react";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { fetchVerifyToken } from "./redux/actionUsers";
import { REQUESTED_SUCCEEDED_CLOSE_USER } from "./redux/types";

function App() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchVerifyToken(token));
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
    }, 1000);
  }, []);

  useEffect(() => {
    if (store.users.userRole === 2) setAdmin(true);
    else setAdmin(false);
  }, [store.users.userRole]);

  return (
    <div>
      {!admin ? (
        <Navbar variant="dark" bg="dark" expand="lg" sticky="bottom">
          <Container>
            <Navbar.Brand>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Teamgeist
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown.Item>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={"/projects/newProject"}
                  >
                    New project
                  </Link>
                </NavDropdown.Item>
              </Nav>
              <Nav>
                {!store.users.isAuth ? (
                  <NavDropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={"/users/login"}
                    >
                      Sign in
                    </Link>
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown
                    title={store.users.userName}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/users/myProfile"}
                      >
                        My Profile
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/projects/showProjects"}
                      >
                        My Projects
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/users/logout"}
                      >
                        LOG OUT
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar variant="dark" bg="dark" expand="lg" sticky="bottom">
          <Container>
            <Navbar.Brand>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                Teamgeist
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="ADMIN" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={"/admin/profile"}
                    >
                      Profile
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={"/admin/showUsers"}
                    >
                      Show Users
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={"/admin/showProjects"}
                    >
                      Show Projects
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={"/users/logout"}
                    >
                      LOG OUT
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  fetchVerifyToken,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);