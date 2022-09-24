import React from "react";
import { Route, Switch } from "react-router";
import { Navbar } from "../component";
import { Register, VillaDetail } from ".";

function BeforeLoginSection() {
  return (
    <Switch>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/detail/:id" component={VillaDetail}></Route>
    </Switch>
  );
}

export default BeforeLoginSection;
