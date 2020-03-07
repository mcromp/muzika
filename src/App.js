import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import GameContainer from "./GameContainer";
import About from "./About";
import HowToPlay from "./HowToPlay";

const App = () => (
  <div className="app">
    <HashRouter basename="/">
      <NavBar />
      <Switch>
        <Route exact path="/" component={GameContainer} />
        <Route path="/about" component={About} />
        <Route path="/howtoplay" component={HowToPlay} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
