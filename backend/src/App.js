import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import { Register, Login, AdminSection, Home } from "./page";
import { useState, useEffect } from "react";
import { NavbarBeforeLogin } from "./component";

function App() {
  const [login, setLogin] = useState(false);
  const userLogin = (param) => {
    setLogin(param);
  };
  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  };

  const getUser = (user) => {
    localStorage.setItem("admin", JSON.stringify(user));
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [login]);

  console.log(login);
  return (
    <BrowserRouter>
      {login ? (
        <AdminSection login={login} userLogin={userLogin} />
      ) : (
        <Switch>
          <Route exact path="/" component={Home}>
            <Home
              userLogin={userLogin}
              getToken={getToken}
              getUser={getUser}
            ></Home>
          </Route>
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
