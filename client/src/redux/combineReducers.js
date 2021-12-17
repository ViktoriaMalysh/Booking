import { combineReducers } from "redux";
import { reducerApp } from "./reducerApp";
import { reducerProjects } from "./reducerProjects";
import { reducerUsers } from "./reducerUsers";

export const rootReducers = combineReducers({
  projects: reducerProjects,
  users: reducerUsers,
  app: reducerApp,
});
