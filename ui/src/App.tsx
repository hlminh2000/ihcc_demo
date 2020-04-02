import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import CohortRepo from "./pages/cohortRepo";
import logo from "./logo.png";
import { css } from "emotion";

function App() {
  const customHistory = createBrowserHistory();
  const fullView = css`
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  `;
  const headerStyle = css`
    height: 64px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.04;
    letter-spacing: normal;
    color: #191970;
    background: white;
    border-bottom: solid 2px #dcdde1;
    width: 100%;
  `;
  const logoStyle = css`
    width: 142px;
  `;
  const pageContainer = css`
    position: relative;
    flex: 1;
  `;
  return (
    <div className={fullView}>
      <div className={headerStyle}>
        <img src={logo} className={logoStyle}></img>
        International HundredK+ Cohorts Consortium
      </div>
      <div className={pageContainer}>
        <Router history={customHistory}>
          <Switch>
            <Route exact path="/">
              <CohortRepo />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
