import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav } from "react-bootstrap";
import "../App.css";
import { Link } from "react-router-dom";

function MyAccounts() {
  return (
    <Nav justify variant="tabs" style={{ textDecoration: "none", color: "white", background: "rgb(235, 183, 106)" }}>
      <Nav.Item>
        <Nav.Link eventKey="link-1">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/"}
          >
            My Projects
          </Link>
        </Nav.Link>
      </Nav.Item>

      

      <Nav.Item>
        <Nav.Link eventKey="link-1">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/"}
          >
            My Profile
          </Link>
        </Nav.Link>
      </Nav.Item>

    </Nav>
  );
}

export default MyAccounts;
