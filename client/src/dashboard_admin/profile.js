import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../style/App.css";
import "../style/admin.css";
import { fetchShowProject } from "../redux/actionProjects";
import { SHOW_PROJECT, USER_COUNT_PROJECT } from "../redux/types";

function Profile() {
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    dispatch({ type: SHOW_PROJECT, payload: [{}] });
    dispatch(fetchShowProject(store.users.userId));
    dispatch({
      type: USER_COUNT_PROJECT,
      payload: store.projects.showProject.length,
    });
  }, []);

  if (loading) {
    return (
      <div className="adminform">
        <div className="form1111admin">
          <div className="spinner1">
            <Spinner animation="border" variant="primary" role="status" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="firstform9admin1">
      <div className="form119admin1">
        <div className="nameAndSurnameadmin1">
          <p className="nameadmin1">
            Admin is{" "}
            <span style={{ fontStyle: "italic" }}>{store.users.userName}</span>
            {"  "}
            <span style={{ fontStyle: "italic" }}>
              {store.users.userSurname}
            </span>
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
            <span className="myselfspan" style={{ fontStyle: "italic" }}>
              {store.users.userEmail}
            </span>
          </p>

          <p>
            Phone:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>
              {store.users.phone != 0
                ? "+380" + store.users.userPhone
                : "not specified"}
            </span>
          </p>

          <Button
            variant="primary"
            onClick={() => history.push("/users/logout")}
          >
            Logout
          </Button>
          <br />
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

export default connect(mapStateToProps)(Profile);
