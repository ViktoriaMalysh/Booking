import { combineReducers } from "redux";
import { reducerApp } from "./reducerApp";
import { reducerProjects } from "./reducerProjects";
import { reducerUsers } from "./reducerUsers";
import { reducerAdmin } from "./reducerAdmin";

export const rootReducers = combineReducers({
  projects: reducerProjects,
  users: reducerUsers,
  admin: reducerAdmin,
  app: reducerApp,
});
