import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import CohortRepo from "./pages/cohortRepo";

function App() {
  const customHistory = createBrowserHistory();
  return (
    <Router history={customHistory}>
      <Switch>
        <Route exact path="/">
          <CohortRepo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
