import React from "react";
import { Route, Switch } from "react-router";
import { Navbar } from "../component";
import { Register } from ".";

function BeforeLoginSection() {
  return (
    <Switch>
      <Route exact path="/register" component={Register}></Route>
    </Switch>
  );
}

export default BeforeLoginSection;
