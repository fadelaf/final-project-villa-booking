import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Navbar } from "../component";
import { Profile } from ".";

function AdminSection({ userLogin }) {
  return (
    <>
      <Navbar userLogin={userLogin} />
      <Switch>
        <Route path="/dashboard"></Route>
        <Route path="/profile" component={Profile}></Route>
      </Switch>
    </>
  );
}

export default AdminSection;
