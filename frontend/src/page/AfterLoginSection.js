import React from "react";
import { Switch } from "react-router";
import { Route } from "react-router";
import { Profile } from ".";

function AfterLoginSection() {
  return (
    <Switch>
      <Route path="/profile" component={Profile}></Route>
    </Switch>
  );
}

export default AfterLoginSection;
