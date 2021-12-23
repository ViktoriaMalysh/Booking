import { NAME_PROJECT, SHOW_PROJECT, SHOW_ALERT, HIDE_ALERT, SHOW_LOADER, HIDE_LOADER, REQUESTED_SUCCEEDED_PROJECT, REQUESTED_SUCCEEDED_CLOSE_PROJECT, REQUESTED_FAILED_PROJECT, REQUESTED_PROJECT, FLAG_DELETE } from "./types";

const initialState = {
  nameProject: "",
  showProject: [{}],
  flag: false,
  err: false,
  text: false,
  delete: false,
  success: false,
  loading: false,
};

export const reducerProjects = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PROJECT:
      return { ...state, showProject: action.payload };
    case NAME_PROJECT:
      return { ...state, nameProject: action.payload };
    case REQUESTED_PROJECT:
      return { ...state };
    case REQUESTED_SUCCEEDED_PROJECT:
      return { ...state, success: true };
    case REQUESTED_SUCCEEDED_CLOSE_PROJECT:
      return { ...state, success: false };
    case REQUESTED_FAILED_PROJECT:
      return { ...state, err: true };
    case SHOW_ALERT:
      return { ...state, text: action.payload };
    case HIDE_ALERT:
      return { ...state, text: false };
    case SHOW_LOADER:
        return { ...state, loading: true };
    case HIDE_LOADER:
        return { ...state, loading: false };
    case FLAG_DELETE:
      return { ...state, delete: action.payload };

    default:
      return state;
  }
};
