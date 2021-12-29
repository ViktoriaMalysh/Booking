import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../style/App.css";
import "../style/admin.css";
import { fetchShowProject } from "../redux/actionProjects";
import {
  ADMIN_COUNT_PROJECT,
  PROJECT,
  REQUESTED_SUCCEEDED_CLOSE_ADMIN,
  SHOW_PROJECT,
  USER,
} from "../redux/types";
import { fetchDeleteUserAdmin } from "../redux/actionAdmin";

function UserProfile() {
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    dispatch({ type: SHOW_PROJECT, payload: [{}] });
    dispatch(fetchShowProject(store.admin.idUserAdmin));
  }, []);

  useEffect(() => {
    if (store.projects.showProject.length > 0)
      dispatch({
        type: ADMIN_COUNT_PROJECT,
        payload: store.projects.showProject.length,
      });
  }, [store.projects.showProject]);

  if (loading) {
    return (
      <div className="adminform">
        <div className="form1111admin">
          <div className="spinner1">
            <Spinner
              animation="border"
              variant="primary"
              role="status"
            ></Spinner>
          </div>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (store.admin.user) {
      history.push("/admin/showUsers");
      setTimeout(() => {
        dispatch({ type: USER, payload: false });
      }, 1000);
    } else if (store.admin.project) {
      history.push("/admin/showProjects");
      setTimeout(() => {
        dispatch({ type: PROJECT, payload: false });
      }, 1000);
    }
  };

  const handleDelete = () => {
    dispatch(fetchDeleteUserAdmin(store.admin.idUserAdmin));
    setTimeout(() => {
      history.push("/admin/showUsers");
      dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN });
    }, 1400);
  };

  const handleUser = () => {
    history.push("/projects/showProjects");
  };

  return (
    <div className="firstform9admin">
      <div className="form119admin">
        <div className="button88">
          <Button variant="info" onClick={handleBack}>
            &#8592;
          </Button>
        </div>

        <div className="image9">
          <img
            alt="Avatar"
            class="avatar"
            src="https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"
          />
        </div>
        <div className="nameAndSurname">
          <p className="name">
            {store.admin.adminName}

            {"  "}
            {store.admin.adminSurname}
          </p>
          <p className="country">{store.admin.adminCountry}</p>

          <Button
            variant="link"
            style={{
              color: "white",
              fontFamily: "Georgia",
              fontSize: "1.2em",
              fontStyle: "italic",
            }}
            onClick={() => handleUser()}
          >
            {store.admin.adminCountProject}
          </Button>
          <span className="projects"> created projects</span>
        </div>
        <div className="myself">
          <p>
            Gender:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>
              {store.admin.adminGender ? store.admin.adminGender : " - "}
            </span>
          </p>

          <p>
            Age:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>
              {store.admin.adminAge ? store.admin.adminAge + " year" : " - "}
            </span>
          </p>

          <p>
            Email:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>
              {store.admin.adminEmail}
            </span>
          </p>

          <p>
            Phone:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>
              {store.admin.adminPhone != null
                ? "+380" + store.admin.adminPhone
                : "not specified"}
            </span>
          </p>

          <Button variant="primary" onClick={handleDelete}>
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

export default connect(mapStateToProps)(UserProfile);
