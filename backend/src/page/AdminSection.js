import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Navbar } from "../component";
import { AddVilla, MyVilla, Profile, VillaDetail } from ".";

function AdminSection({ userLogin }) {
  return (
    <>
      <Navbar userLogin={userLogin} />
      <Switch>
        <Route exact path="/dashboard"></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/myVilla" component={MyVilla}></Route>
        <Route exact path="/myVilla/:id" component={VillaDetail}></Route>
        <Route exact path="/addVilla" component={AddVilla}></Route>
      </Switch>
    </>
  );
}

export default AdminSection;
