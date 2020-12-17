import React from "react";
import Login from "containers/Login";
import Signup from "containers/Signup";
// import Homepage from "./containers/Homepage";
// import ProfileDetail from "./containers/ProfileDetail";
import LandingPage from 'LandingPage/LandingPage'
import { Route, Switch } from "react-router-dom";
import ProfilePage from 'Portfolio/Portfolio.js'
import Error404 from 'Error404/Error404.js'


const BaseRouter = () => (
    <Switch>
        {/* <Route exact path="/" component={Homepage}/> */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/:id" component={ProfilePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup/" component={Signup} />
        <Route component={Error404} />
    </Switch>
);

export default BaseRouter;
