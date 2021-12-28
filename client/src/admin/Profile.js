import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../App.css";
import "../admin.css";
import { fetchShowProject } from "../redux/actionProjects";
import { SHOW_PROJECT, USER_COUNT_PROJECT } from "../redux/types";

function MyProfile() {
  const [role, setRole] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    if (store.users.userRole === 1) {
      setRole("user");
    } else if (store.users.userRole === 2) {
      setRole("admin");
    }
console.log("length ", store.projects.showProject.length )
    dispatch({ type: SHOW_PROJECT, payload: [{}] });
    dispatch(fetchShowProject(store.users.userId));
    dispatch({ type: USER_COUNT_PROJECT, payload: store.projects.showProject.length });
  }, []);

  if (loading) {
    return (
      <div className="form1111">
        <Spinner animation="border" variant="danger" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="firstform9admin1">
      <div className="form119admin1">
        <div className="nameAndSurnameadmin1">
          <p className="nameadmin1">
            Admin is {" "}
            <span  style={{ fontStyle: "italic" }}>{store.users.userName}</span>
            {"  "}
            <span  style={{ fontStyle: "italic" }}>{store.users.userSurname}</span>
          </p>
          <p className="country">{store.users.userCountry}</p>

          <Button
            variant="primary"
            onClick={() => history.push("/users/checkPass")}
          >
            Profile Settings
          </Button>
        </div>
        <div className="myselfadmin1">
          <p>
            Email:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>{store.users.userEmail}</span>
          </p>

          <p>
            Phone:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>+380{store.users.userPhone}</span>
          </p>
          
          <Button
            variant="primary"
            onClick={() => history.push("/users/logout")}
          >
            Logout
          </Button>
            <br/>
          <Button
            variant="primary"
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
