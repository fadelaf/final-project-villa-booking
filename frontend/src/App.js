import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./component";
import { LoginForm } from "./component";
import { BrowserRouter, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { AfterLoginSection, BeforeLoginSection } from "./page";
import { Route } from "react-router";
import { Register } from "./page";
import Home from "./page/Home";

function App() {
  const [login, setLogin] = useState();
  const userLogin = (param) => {
    setLogin(param);
  };
  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  };

  const getUser = (user) => {
    localStorage.setItem("admin", JSON.stringify(user));
  };

  return (
    <BrowserRouter>
      <Switch>
        <div className="">
          <Navbar login={login} />
          <Route exact path="/" component={Home}></Route>
          {login ? (
            <>
              <AfterLoginSection />
            </>
          ) : (
            <>
              {" "}
              <Route exact path="/register" component={Register}></Route>
            </>
          )}
        </div>
      </Switch>{" "}
    </BrowserRouter>
  );
}

export default App;
