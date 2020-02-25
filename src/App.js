import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import GameContainer from "./GameContainer";
import About from "./About";
import HowToPlay from "./HowToPlay";

const App = () => {
  return (
    <div className="app">
      <Router basename="/">
        <NavBar />
        <Switch>
          <Route exact path="/" component={GameContainer} />
          <Route path="/about" component={About} />
          <Route path="/howtoplay" component={HowToPlay} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
