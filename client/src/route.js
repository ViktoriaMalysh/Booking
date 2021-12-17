import React from "react";
import Auth from "./users/auth";
import Login from "./users/login";
import Logout from "./users/logout";
import Teamgeist from "./teamgeist";
import Home from "./home";
import ContainedButtons from "./App";
import NewProject from "./projects/newProject";
import DeleteAccount from "./users/deleteAccount";

import MyProjects from "./users/myProjects";
import MyProfile from "./users/myProfile";
import MyAccounts from "./users/myAccounts";
import ChangeProfile from "./users/changeProfile";
import CheckPassword from "./users/checkPass";

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
        <Route path="/users/auth" component={Auth} />
        <Route path="/users/login" component={Login} />
        <Route path="/users/logout" component={Logout} />
        <Route path="/users/deleteAccount" component={DeleteAccount} />
        <GuardedRoute path="/projects/newProject" component={NewProject} auth={store.users.isAuth}/>
        <GuardedRoute path="/projects/showProjects" component={ShowProjects} auth={store.users.isAuth}/>
        <Route path="/projects/teamgeist" component={Teamgeist} />
        <Route path="/" component={Home} />

        //----------------------------------------profile---------------------------------------------

        {/* <Route path="/users/myAccounts/myTickets" component={MyProjects} />
        <Route path="/users/myAccounts/myProfile" component={MyProfile} />
        <Route path="/users/myAccounts" component={MyAccounts} />
        <Route path="/users/changeProfile" component={ChangeProfile} />
        <Route path="/users/checkPass" component={CheckPassword} /> */}
      </Switch>
    </Router>
  );
}
