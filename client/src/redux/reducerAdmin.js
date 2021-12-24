import {
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_LOADER,
  HIDE_LOADER,
  REQUESTED_ADMIN,
  REQUESTED_SUCCEEDED_ADMIN,
  REQUESTED_SUCCEEDED_CLOSE_ADMIN,
  REQUESTED_FAILED_ADMIN,
  SHOW_USERS_ADMIN,
  SHOW_PROJECT_ADMIN,
  NAME_PROJECT_ADMIN,
  SHOW_USER_ADMIN,
  SHOW_USER_ID_ADMIN,
} from "./types";

const initialState = {
  idUserAdmin: 0,
  userAdmin: [{}],
  nameProject: "",
  showUsersAdmin: [{}],
  showProjectsAdmin: [{}],
  success: false,
  err: false,
};

export const reducerAdmin = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_USERS_ADMIN:
      return { ...state, showUsersAdmin: action.payload };
    case SHOW_PROJECT_ADMIN:
      return { ...state, showProjectsAdmin: action.payload };

    case SHOW_USER_ID_ADMIN:
      return { ...state, idUserAdmin: action.payload };

    case NAME_PROJECT_ADMIN:
      return { ...state, nameProject: action.payload };
    case SHOW_USER_ADMIN:
      return { ...state, userAdmin: action.payload };

    case REQUESTED_ADMIN:
      return { ...state };
    case REQUESTED_SUCCEEDED_ADMIN:
      return { ...state, success: true };
    case REQUESTED_SUCCEEDED_CLOSE_ADMIN:
      return { ...state, success: false };
    case REQUESTED_FAILED_ADMIN:
      return { ...state, err: true };

    // case SHOW_ALERT:
    //   return { ...state, text: action.payload };
    // case HIDE_ALERT:
    //   return { ...state, text: false };
    // case SHOW_LOADER:
    //     return { ...state, loading: true };
    // case HIDE_LOADER:
    //     return { ...state, loading: false };

    default:
      return state;
  }
};
