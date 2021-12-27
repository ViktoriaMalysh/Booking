import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../App.css";
import { fetchShowProject } from "../redux/actionProjects";
import {
  ADMIN_COUNT_PROJECT,
  PROJECT,
  SHOW_PROJECT,
  USER,
} from "../redux/types";

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
      <div className="form1111">
        <Spinner animation="border" variant="danger" role="status"></Spinner>
      </div>
    );
  }

  const handleBack = () => {
    if(store.admin.user){
      history.push("/admin/showUsers");
      setTimeout(() => {
        dispatch({ type: USER, payload: false });
      }, 1000)
    }else if(store.admin.project){
      history.push("/admin/showProjects");
      setTimeout(() => {
        dispatch({ type: PROJECT, payload: false });
      }, 1000)
    }

  };

  const handleUser = () => {
    history.push("/projects/showProjects");
  };

  return (
    <div className="firstform9">
      
      <div className="form119">
        <div className="button88">
          <Button variant="warning" onClick={handleBack}>
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
              color: "black",
              fontFamily: "Georgia",
              fontSize: "1.2em",
              fontStyle: "italic",
            }}
            onClick={() => handleUser()}
          >
            {store.admin.adminCountProject}
          </Button>
          <span className="projects"> created projects</span>

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
            <span className="myselfspan" style={{ fontStyle: "italic" }}>
              {store.admin.adminSex}
            </span>
          </p>

          <p>
            Age:{" "}
            <span className="myselfspan" style={{ fontStyle: "italic" }}>
              {store.admin.adminAge} year
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
              +380{store.admin.adminPhone}
            </span>
          </p>

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

export default connect(mapStateToProps)(UserProfile);
