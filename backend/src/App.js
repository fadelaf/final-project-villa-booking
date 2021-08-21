import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";
import { Register } from "./page";
function App() {
  return (
    <BrowserRouter>
      <Route path="/register" component={Register}></Route>
    </BrowserRouter>
  );
}

export default App;
