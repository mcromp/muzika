import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import GameContainer from "./GameContainer";
import About from "./About";
import HowToPlay from "./HowToPlay";

const App = () => {
  return (
    <div className="app">
      <HashRouter basename="/muzika">
        <NavBar />
        <Switch>
          <Route exact path="/muzika" component={GameContainer} />
          <Route path="/muzika/about" component={About} />
          <Route path="/muzika/howtoplay" component={HowToPlay} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
