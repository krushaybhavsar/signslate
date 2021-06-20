import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import "./App.css";
import "./globalVars";

import MainPage from "./pages/Main/Main";
import TranslateToASL from "./pages/TranslateToASL/TranslateToASL";
import TranslateToEnglish from "./pages/TranslateToEnglish/TranslateToEnglish";
import VideoPlayer from "./pages/videoplayer/VideoPlayer";

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path={global.translateToASL} component={TranslateToASL} />
        <Route
          exact
          path={global.translateToEnglish}
          component={TranslateToEnglish}
        />
        <Route exact path={global.showtranslateToASL} component={VideoPlayer} />
        <Redirect to={global.home} />
      </Switch>
    </Router>
  );
};

export default App;
