import axios from "axios";
import { CHANGE, CLEAR_USER, ERROR, FLAG, IS_AUTH, REQUESTED_FAILED_USER, REQUESTED_SUCCEEDED_USER, REQUESTED_USER, SHOW_ALERT, USER_AGE, USER_COUNTRY, USER_EMAIL, USER_ID, USER_NAME, USER_PHONE, USER_ROLE, USER_SEX, USER_SURNAME } from "./types";

const requestUser = () => {
  return { type: REQUESTED_USER };
};

const requestSuccessUser = (data) => {
  return { type: REQUESTED_SUCCEEDED_USER };
};

const requestErrorUser = (err, message) => {
  return (dispatch) => {
    console.log('Error:', err)
    dispatch({ type: REQUESTED_FAILED_USER })
    dispatch(alert(message))
  };
};

const alert = (message) => {
  return (dispatch) => {
    dispatch({type: SHOW_ALERT, payload: message})
    setTimeout(() => {
      dispatch({type: SHOW_ALERT, payload: false})
    }, 1200)
  };
};

export const fetchVerifyToken = (token) => {
  return (dispatch) => {
    dispatch(requestUser());
    axios
      .post(`http://localhost:8080/auth/verify1`, {}, {headers: {'authorization': token}})
      .then((res) => {
        console.log('data', res.data)
        localStorage.setItem('token', res.data.token)
        dispatch({type: IS_AUTH, payload: true})
        dispatch({type: USER_ID, payload: res.data.id})
        dispatch({type: USER_NAME, payload: res.data.name})
        dispatch({type: USER_SURNAME, payload: res.data.surname})
        dispatch({type: USER_EMAIL, payload: res.data.email})
        dispatch({type: USER_ROLE, payload: res.data.role})

        dispatch({type: USER_SEX, payload: res.data.sex})
        dispatch({type: USER_AGE, payload: res.data.age})
        dispatch({type: USER_COUNTRY, payload: res.data.country})
        dispatch({type: USER_PHONE, payload: res.data.phone})
      })
      .then(
        (data) => dispatch(requestSuccessUser(data)),
        (err) => dispatch(requestErrorUser(err))
      );
  };
};

export const fetchAuth = (user) => {
  return (dispatch) => {
    dispatch(requestUser());
    axios
      .post(`http://localhost:8080/auth/authentication`, {
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        dispatch({type: IS_AUTH, payload: true})
        dispatch({type: USER_ID, payload: res.data.id})
        dispatch(alert('Authorization was successful!'))
        dispatch({type: USER_NAME, payload: res.data.name})
        dispatch({type: USER_SURNAME, payload: res.data.surname})
        dispatch({type: USER_EMAIL, payload: res.data.email})
        dispatch({type: USER_SEX, payload: res.data.sex})
        dispatch({type: USER_AGE, payload: res.data.age})
        dispatch({type: USER_COUNTRY, payload: res.data.country})
        dispatch({type: USER_PHONE, payload: res.data.phone})
        dispatch({type: USER_ROLE, payload: res.data.role})
      })
      .then(
        (data) => dispatch(requestSuccessUser(data)),  
        (err) => dispatch(requestErrorUser(err, 'Error. Try again'))
      );
  };
};  

export const fetchLogin = (user) => {
  return (dispatch) => {
    dispatch(requestUser());
    axios
      .post(`http://localhost:8080/auth/authorization`, {
        email: user.email,
        password: user.password
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        dispatch({type: IS_AUTH, payload: true})
        dispatch({type: USER_ID, payload: res.data.id})
        dispatch({type: USER_NAME, payload: res.data.name})
        dispatch({type: USER_SURNAME, payload: res.data.surname})
        dispatch({type: USER_EMAIL, payload: res.data.email})
        dispatch({type: USER_SEX, payload: res.data.sex})
        dispatch({type: USER_AGE, payload: res.data.age})
        dispatch({type: USER_COUNTRY, payload: res.data.country})
        dispatch({type: USER_PHONE, payload: res.data.phone})
        dispatch({type: USER_ROLE, payload: res.data.role})

        
        dispatch(alert('Success!'))
      })
      .then(
        (data) => dispatch(requestSuccessUser(data)),
        (err) => dispatch(requestErrorUser(err, 'User not found')),
      );
  };
};

export const fetchDelete = (token) => {
  return (dispatch) => {
    dispatch(requestUser());
    axios
      .post(`http://localhost:8080/auth/logout`, {}, {headers: {'authorization': token}})
      .then((res) => {
        localStorage.clear()
        dispatch({type: IS_AUTH, payload: false})
        dispatch({type: CLEAR_USER})
        dispatch(alert('Account has been deleted!'))
      })
      .then(
        (data) => dispatch(requestSuccessUser(data)),
        (err) => dispatch(requestErrorUser(err, 'Error! Account has not been deleted')),
      );
  };
};

export const fetchChangePass = (id, password) => {
  return (dispatch) => {
    dispatch(requestUser());
    axios
      .post(`http://localhost:8080/auth/pass`, {
        id: id,
        password: password,
      })
      .then((res) => {
        if (res.data.error) dispatch({ type: ERROR, payload: res.data.error });
        else dispatch({ type: FLAG, payload: true });

        dispatch(alert("Success!"));
      })
      .then(
        (data) => dispatch(requestSuccessUser(data)),
        (err) => dispatch(requestErrorUser(err, "User not found"))
      );
  };
};


export const fetchChange = (id, name, surname, sex, age, country, phone, email, password) => {
  return (dispatch) => {
    dispatch(requestUser());
    axios
      .post(`http://localhost:8080/auth/changeProfile`, {
        id: id,
        name: name,
        surname: surname,
        sex: sex,
        age: age,
        country: country,
        phone: phone,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.error) dispatch({ type: ERROR, payload: res.data.error });
        else dispatch({ type: CHANGE, payload: true });

        dispatch(alert("Success!"));
      })
      .then(
        (data) => dispatch(requestSuccessUser(data)),
        (err) => dispatch(requestErrorUser(err, "User not found"))
      );
  };
};



