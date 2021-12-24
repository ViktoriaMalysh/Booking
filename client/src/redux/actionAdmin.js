import axios from "axios";
import {
  CLEAR_USER,
  HIDE_LOADER,
  IS_AUTH,
  REQUESTED_ADMIN,
  REQUESTED_FAILED_ADMIN,
  REQUESTED_SUCCEEDED_ADMIN,
  REQUESTED_SUCCEEDED_CLOSE_ADMIN,
  SHOW_ALERT,
  SHOW_LOADER,
  SHOW_PROJECT,
  SHOW_PROJECT_ADMIN,
  SHOW_USER_ADMIN,
} from "./types";

const requestAdmin = () => {
  return { type: REQUESTED_ADMIN };
};

const requestSuccessAdmin = (message) => {
  return (dispatch) => {
    dispatch({ type: REQUESTED_SUCCEEDED_ADMIN });
    dispatch(alert(message));
  };
};

const requestErrorAdmin = (err, message) => {
  return (dispatch) => {
    console.log("Error:", err);
    dispatch({ type: REQUESTED_FAILED_ADMIN });
    dispatch(alert(message));
  };
};

export const alert = (message) => {
  return (dispatch) => {
    dispatch({ type: SHOW_ALERT, payload: message });
    setTimeout(() => {
      dispatch({ type: SHOW_ALERT, payload: false });
    }, 1200);
  };
};

export const fetchShowProjectAdmin = (id) => {  //done
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .get(`http://localhost:8080/admin/showProj`, {})
      .then((res) => dispatch({ type: SHOW_PROJECT_ADMIN, payload: res.data }))
      .then(
        (data) => dispatch(requestSuccessAdmin(data)),
        dispatch({ type: SHOW_LOADER }),
        setTimeout(() => {
          dispatch({ type: HIDE_LOADER });
        }, 300),
        (err) => dispatch(requestErrorAdmin(err))
      );
  };
};

export const fetchSearchProjectAdmin = (projectName) => {
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .post(`http://localhost:8080/admin/searchProj`, {
        projectName: projectName,
      })
      .then((res) => dispatch({ type: SHOW_PROJECT_ADMIN, payload: res.data }))
      .then(
        (data) => dispatch(requestSuccessAdmin()),
        dispatch({ type: SHOW_LOADER }),
        setTimeout(() => {
          dispatch({ type: HIDE_LOADER });
        }, 300),
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN }),
        (err) => dispatch(requestErrorAdmin(err, "Project not found"))
      );
  };
};

export const fetchDeleteProjectAdmin = (id) => {
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .post(`http://localhost:8080/project/delete`, {
        id: id,
      })
      .then((res) => res.data.delete)
      .then(
        (data) => dispatch(requestSuccessAdmin(data)),
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN }),
        (err) => dispatch(requestErrorAdmin(err, "Error. Try again"))
      );
  };
};


export const fetchDeleteAdmin = (token) => {
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .post(`http://localhost:8080/auth/logout`, {}, {headers: {'authorization': token}})
      .then((res) => {
        localStorage.clear()
        dispatch({type: IS_AUTH, payload: false})
        dispatch({type: CLEAR_USER})
        dispatch(alert('Account has been deleted!'))
      })
      .then(
        (data) => dispatch(requestSuccessAdmin(data)),
        (err) => dispatch(requestErrorAdmin(err, 'Error! Account has not been deleted')),
      );
  };
};


export const fetchShowUsersAdmin = (id) => {
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .post(`http://localhost:8080/project/show`, {
        id: id,
      })
      .then((res) => dispatch({ type: SHOW_PROJECT_ADMIN, payload: res.data }))
      .then(
        (data) => dispatch(requestSuccessAdmin(data)),
        dispatch({ type: SHOW_LOADER }),
        setTimeout(() => {
          dispatch({ type: HIDE_LOADER });
        }, 300),
        (err) => dispatch(requestErrorAdmin(err))
      );
  };
};

export const fetchSearchUserAdmin = (id) => {
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .post(`http://localhost:8080/admin/searchUser`, {
        id: id,
      })
      .then((res) => dispatch({ type: SHOW_USER_ADMIN, payload: res.data }))
      .then(
        (data) => dispatch(requestSuccessAdmin()),
        dispatch({ type: SHOW_LOADER }),
        setTimeout(() => {
          dispatch({ type: HIDE_LOADER });
        }, 300),
        dispatch({ type: REQUESTED_SUCCEEDED_CLOSE_ADMIN }),
        (err) => dispatch(requestErrorAdmin(err, "Project not found"))
      );
  };
};