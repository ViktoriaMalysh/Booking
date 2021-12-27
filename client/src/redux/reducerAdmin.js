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
  ADMIN_ID,
  ADMIN_ROLE,
  ADMIN_PASSWORD,
  ADMIN_EMAIL,
  ADMIN_COUNT_PROJECT,
  ADMIN_PHONE,
  ADMIN_COUNTRY,
  ADMIN_AGE,
  ADMIN_SEX,
  ADMIN_SURNAME,
  ADMIN_NAME,
  NAME_USER_ADMIN,
  USER,
  PROJECT,
} from "./types";

const initialState = {
  adminCountProject: 0,
  adminName: "",
  adminSurname: "",
  adminSex: "",
  adminAge: 0,
  adminCountry: "",
  adminPhone: 0,
  adminEmail: "",
  adminPassword: "",
  adminRole: 0,
  adminId: 0,

  user: false,
  project: false,

  idUserAdmin: 0,
  searchUserAdmin: "",
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

    case NAME_USER_ADMIN:
      return { ...state, searchUserAdmin: action.payload };

    case SHOW_USER_ADMIN:
      return { ...state, userAdmin: action.payload };

    case ADMIN_NAME:
      return { ...state, adminName: action.payload };
    case ADMIN_SURNAME:
      return { ...state, adminSurname: action.payload };
    case ADMIN_SEX:
      return { ...state, adminSex: action.payload };
    case ADMIN_AGE:
      return { ...state, adminAge: action.payload };
    case ADMIN_COUNTRY:
      return { ...state, adminCountry: action.payload };
    case ADMIN_PHONE:
      return { ...state, adminPhone: action.payload };
    case ADMIN_COUNT_PROJECT:
      return { ...state, adminCountProject: action.payload };
    case ADMIN_EMAIL:
      return { ...state, adminEmail: action.payload };
    case ADMIN_PASSWORD:
      return { ...state, adminPassword: action.payload };
    case ADMIN_ROLE:
      return { ...state, adminRole: action.payload };
    case ADMIN_ID:
      return { ...state, adminId: action.payload };

    case USER:
      return { ...state, user: action.payload };
    case PROJECT:
      return { ...state, project: action.payload };

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
