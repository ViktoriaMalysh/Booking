import { USER_NAME, IS_AUTH, CHANGE, ERROR, USER_SURNAME, USER_EMAIL, USER_PASSWORD, USER_ROLE, USER_ID, CLEAR_USER, REQUESTED_USER, REQUESTED_SUCCEEDED_USER, REQUESTED_SUCCEEDED_CLOSE_USER, REQUESTED_FAILED_USER, SHOW_ALERT_USER, HIDE_ALERT_USER, FLAG, SUCCESS } from "./types";

const initialState = {
  isAuth: false,
  userName: "",
  userSurname: "",
  userEmail: "",
  userPassword: "",
  userRole: 0,
  userId: 0,
  flag: false,
  err: false,
  text: false,
  success: false,
  loading: false,
  flagSuccess: false,
  change: false,
  error: "",
};

export const reducerUsers = (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTH:
      return { ...state, isAuth: action.payload };
    case USER_NAME:
      return { ...state, userName: action.payload };
    case USER_SURNAME:
      return { ...state, userSurname: action.payload };
    case USER_EMAIL:
      return { ...state, userEmail: action.payload };
    case USER_PASSWORD:
      return { ...state, userPassword: action.payload };
    case USER_ROLE:
      return { ...state, userRole: action.payload };
    case USER_ID:
      return { ...state, userId: action.payload };
    case CLEAR_USER:
      return initialState; 
    case REQUESTED_USER:
      return { ...state };
    case REQUESTED_SUCCEEDED_USER:
      return { ...state, success: true };
    case REQUESTED_SUCCEEDED_CLOSE_USER:
      return { ...state, success: false };
    case REQUESTED_FAILED_USER:
      return { ...state, err: true };
    case SHOW_ALERT_USER:
      return { ...state, text: action.payload };
    case HIDE_ALERT_USER:
      return { ...state, text: false };
    case SUCCESS:
      return { ...state, flagSuccess: action.payload };
    case FLAG:
      return { ...state, flag: action.payload };

    case CHANGE:
      return { ...state, change: action.payload };
    case ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
