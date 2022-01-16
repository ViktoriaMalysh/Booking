import React from "react";
import Auth from "./dashboard_users/auth";
import Login from "./dashboard_users/login";
import Logout from "./dashboard_users/logout";
import Tracker from "./tracker/tracker";
import Home from "./home";
import ContainedButtons from "./App";
import NewProject from "./projects/newProject";
import DeleteAccount from "./dashboard_users/deleteAccount";
import MyProfile from "./dashboard_users/myProfile";
import ChangeProfile from "./dashboard_users/changeProfile";
import CheckPassword from "./dashboard_users/checkPass";
import UserProfile from "./dashboard_admin/userProfile";
import Profile from "./dashboard_admin/profile";
import ShowProj from "./dashboard_admin/showProj";
import ShowUsers from "./dashboard_admin/showUsers";
import ShowProjects from "./projects/showProjects";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GuardedRoute from "./guardedRoute";
import { useSelector } from "react-redux";

export default function App() {
  const store = useSelector((state) => state);

  return (
    <Router>
      <ContainedButtons />
      <Switch>
      //---------------------------------dashboard_users----------------------------------------

        <Route path="/users/auth" component={Auth} />
        <Route path="/users/login" component={Login} />
        <Route path="/users/logout" component={Logout} />
        <Route path="/users/deleteAccount" component={DeleteAccount} />
        <Route path="/users/changeProfile" component={ChangeProfile} />
        <Route path="/users/checkPass" component={CheckPassword} />
        <Route path="/users/myProfile" component={MyProfile} />

      //---------------------------------dashboard_admin----------------------------------------

        <Route path="/admin/showUsers" component={ShowUsers} />
        <Route path="/admin/showProjects" component={ShowProj} />
        <Route path="/admin/profileUser" component={UserProfile} />
        <Route path="/admin/profile" component={Profile} />

      //---------------------------------tracker----------------------------------------

        <Route path="/projects/showProjects" component={ShowProjects} />
        <Route path="/projects/teamgeist" component={Tracker} />
        <GuardedRoute path="/projects/newProject" component={NewProject} auth={store.users.isAuth}/>

        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}