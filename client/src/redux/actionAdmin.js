import axios from "axios";
import {
  ADMIN_AGE,
  ADMIN_COUNTRY,
  ADMIN_EMAIL,
  ADMIN_ID,
  ADMIN_NAME,
  ADMIN_PHONE,
  ADMIN_ROLE,
  ADMIN_SEX,
  ADMIN_SURNAME,
  CLEAR_USER,
  HIDE_LOADER,
  IS_AUTH,
  REQUESTED_ADMIN,
  REQUESTED_FAILED_ADMIN,
  REQUESTED_SUCCEEDED_ADMIN,
  REQUESTED_SUCCEEDED_CLOSE_ADMIN,
  SHOW_ALERT,
  SHOW_LOADER,
  SHOW_PROJECT_ADMIN,
  SHOW_USERS_ADMIN,
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

export const fetchSearchProjectAdmin = (projectName) => {   //done
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

export const fetchDeleteProjectAdmin = (id) => {    //done
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

export const fetchShowUsersAdmin = () => {
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .get(`http://localhost:8080/admin/showUser`, {})
      .then((res) => dispatch({ type: SHOW_USERS_ADMIN, payload: res.data }))
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

export const fetchSearchUserAdmin = (id) => {   //done
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .post(`http://localhost:8080/admin/searchUser`, {
        id: id,
        option: "",
      })
      .then((res) => {
        console.log("res.data", res.data[0])
        dispatch({type: ADMIN_ID, payload: res.data[0].id})
        dispatch({type: ADMIN_NAME, payload: res.data[0].name})
        dispatch({type: ADMIN_SURNAME, payload: res.data[0].surname})
        dispatch({type: ADMIN_EMAIL, payload: res.data[0].email})
        dispatch({type: ADMIN_SEX, payload: res.data[0].sex})
        dispatch({type: ADMIN_AGE, payload: res.data[0].age})
        dispatch({type: ADMIN_COUNTRY, payload: res.data[0].country})
        dispatch({type: ADMIN_PHONE, payload: res.data[0].phone})
        dispatch({type: ADMIN_ROLE, payload: res.data[0].role}) 
      })
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



export const fetchSearchUsersAdmin = (search, option) => {   //done
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .post(`http://localhost:8080/admin/searchUser`, {
        search: search,
        option: option,
      })
      .then((res) => {
        console.log('-------------------------------------------fetchSearchUsersAdmin', res.data)
        dispatch({type: SHOW_USERS_ADMIN, payload: res.data})
      })
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



export const fetchDeleteUserAdmin = (id) => {    //
  return (dispatch) => {
    dispatch(requestAdmin());
    axios
      .post(`http://localhost:8080/admin/deleteUser`, {
        id: id,
      })
      .then((res) => {
        dispatch(alert('Account has been deleted!'))
      })
      .then(
        (data) => dispatch(requestSuccessAdmin(data)),
        (err) => dispatch(requestErrorAdmin(err, 'Error! Account has not been deleted')),
      );
  };
};