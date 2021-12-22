import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../App.css";

function MyProfile() {
  const [role, setRole] = useState("");
  let history = useHistory();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    if (store.users.userRole === 1) {
      setRole("user");
    } else if (store.users.userRole === 2) {
      setRole("admin");
    }
  }, []);

  if (loading) {
    return (
      <div className="form1111">
        <Spinner animation="border" variant="danger" role="status"></Spinner>
      </div>
    );
  }

  const changeProfile = (id) => {
    history.push("/users/checkPass");
  };

  return (
    <div className="firstform9">
      <div className="form119">
        <div className="image9">
          <img
            alt="Avatar"
            class="avatar"
            src="https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"
          />
        </div>
        <div className="nameAndSurname">
          <p className="name">
            {store.users.userName}
            {"  "}
            {store.users.userSurname}
          </p>
          <p className="country">country</p>

          <p className="projects">0 created projects</p>

          <Button
            variant="warning"
            onClick={() => history.push("/users/checkPass")}
          >
            Profile Settings
          </Button>
        </div>
        <div className="myself">
          <p>
            Sex:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>{store.users.userEmail}</span>
          </p>

          <p>
            Age:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>{store.users.userEmail}</span>
          </p>

          <p>
            Email:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>{store.users.userEmail}</span>
          </p>
<p>hello</p>
          <p>
            Phone:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>{store.users.userEmail}</span>
          </p>
          
          <Button
            variant="warning"
            onClick={() => history.push("/users/logout")}
          >
            Logout
          </Button>
<br/>
          <Button
            variant="warning"
            onClick={() => history.push("/users/deleteAccount")}
          >
            Delete Account
          </Button>

        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps)(MyProfile);
