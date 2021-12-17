import axios from "axios";
import { HIDE_LOADER, REQUESTED_FAILED_PROJECT, REQUESTED_PROJECT, REQUESTED_SUCCEEDED_CLOSE_PROJECT, REQUESTED_SUCCEEDED_PROJECT, SHOW_ALERT, SHOW_LOADER, SHOW_PROJECT } from "./types";

const requestProject = () => {
  return { type: REQUESTED_PROJECT };
};

const requestSuccessProject = (message) => {
  return (dispatch) => {
    dispatch({ type: REQUESTED_SUCCEEDED_PROJECT });
    dispatch(alert(message))
  };
};

const requestErrorProject = (err, message) => {
  return (dispatch) => {
    console.log('Error:', err)
    dispatch({ type: REQUESTED_FAILED_PROJECT })
    dispatch(alert(message))
  };
};

export const alert = (message) => {
  return (dispatch) => {
    dispatch({type: SHOW_ALERT, payload: message})
    setTimeout(() => {
      dispatch({type: SHOW_ALERT, payload: false})
    }, 1200)
  };
};

export const fetchTime = (project) => {
  return (dispatch) => {
    const time = project.end - project.start;
    dispatch(requestProject());
    axios
      .post(`http://localhost:8080/project/addTime`, {
        projectName: project.projectName,
        id: project.id,
        time: time,
      })
      .then((res) => res.json())
      .then(dispatch(requestSuccessProject()), (err) => dispatch(requestErrorProject(err)));
  };
};

export const fetchNewProject = (project) => {
  return (dispatch) => {
    dispatch(requestProject());
    axios
      .post(`http://localhost:8080/project/create`, {
        projectName: project.projectName,
        id: project.id,
      })
      .then((res) => res.data.projectName)
      .then(
        (data) => dispatch(requestSuccessProject(`Project ${data} was created!`)),
        (err) => dispatch(requestErrorProject(err, `Error! New project was not created`))
      );
  };
};

export const fetchShowProject = (id) => {
  return (dispatch) => {
    dispatch(requestProject());
    axios
      .post(`http://localhost:8080/project/show`, {
        id: id,
      })
      .then((res) => dispatch({ type: SHOW_PROJECT, payload: res.data }))
      .then(
        (data) => dispatch(requestSuccessProject(data)),
        dispatch({ type: SHOW_LOADER }),
        setTimeout(() => {
          dispatch({ type: HIDE_LOADER });
        }, 300),
        (err) => dispatch(requestErrorProject(err))
      );
  };
};

export const fetchSearchProject = (projectName) => {
  return (dispatch) => {
    dispatch(requestProject());
    axios
      .post(`http://localhost:8080/project/search`, {
        projectName: projectName,
      })
      .then((res) => dispatch({ type: SHOW_PROJECT, payload: res.data }))
      .then(
        (data) => dispatch(requestSuccessProject()),
        dispatch({ type: SHOW_LOADER }),
        setTimeout(() => {
          dispatch({ type: HIDE_LOADER });
        }, 300),
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT }),
        (err) => dispatch(requestErrorProject(err, 'Project not found'))
      );
  };
};

export const fetchDeleteProject = (id) => {
  return (dispatch) => {
    dispatch(requestProject());
    axios
      .post(`http://localhost:8080/project/delete`, {
        id: id,
      })
      .then((res) => res.data.delete)
      .then(
        (data) => console.log(data),
        (data) => dispatch(requestSuccessProject(data)),
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_PROJECT }),
        (err) => dispatch(requestErrorProject(err, 'Error. Try again'))
      );
  };
};
