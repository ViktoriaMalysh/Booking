import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { fetchVerifyToken } from "./redux/actionUsers";
import { REQUESTED_SUCCEEDED_CLOSE_USER } from "./redux/types";

function ContainedButtons() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchVerifyToken(token));
    setTimeout(() => {
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_USER });
    }, 1000);
  }, []);

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
            Teamgeist
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="USERS"
              menuVariant="dark"
            >
              <NavDropdown.Item>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/users/auth"}
                >
                  Auth
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/users/login"}
                >
                  Login
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/users/logout"}
                >
                  Logout
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/users/deleteAccount"}
                >
                  Delete Account
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="PROJECTS"
              menuVariant="dark"
              disabled={!store.users.isAuth}
            >
              <NavDropdown.Item>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/projects/newProject"}
                >
                  New project
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/projects/showProjects"}
                >
                  Show projects
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={store.users.userName}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/users/myAccounts"}
                >
                  MY ACCOUNTS
                </Link>
              </NavDropdown.Item>

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
  );
}

const mapDispatchToProps = {
  fetchVerifyToken,
};

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainedButtons);
