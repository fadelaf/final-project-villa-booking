import "./App.css";
import logo from "./logo.svg";
import { Navbar, Footer } from "./component";
import { LoginForm } from "./component";
import { BrowserRouter, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { AfterLoginSection, BeforeLoginSection } from "./page";
import { Route } from "react-router";
import { Register } from "./page";
import Home from "./page/Home";
import { VillaDetail } from "./page";

function App() {
  const [login, setLogin] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const userLogin = (param) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLogin(param);
    }, 2000);
  };

  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  };

  const getUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [login]);

  return (
    <BrowserRouter>
      <Switch>
        <div className="">
          <Navbar
            login={login}
            userLogin={userLogin}
            getToken={getToken}
            getUser={getUser}
          />

          {login ? (
            <>
              <Route exact path="/" component={Home}>
                <Home exact path="/" login={login} />
              </Route>
              <AfterLoginSection login={login} />
            </>
          ) : (
            <>
              {" "}
              <Route exact path="/" component={Home}>
                <Home login={login} />
              </Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/detail/:id" component={VillaDetail}>
                <VillaDetail login={login} />
              </Route>
            </>
          )}

          <Footer />
        </div>
      </Switch>{" "}
    </BrowserRouter>
  );
}

export default App;
