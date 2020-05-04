import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import CohortRepo from "./pages/cohortRepo";
import logo from "./logo.png";
import { css } from "emotion";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

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
    justify-content: space-between;
  `;
  const logoStyle = css`
    width: 142px;
  `;
  const pageContainer = css`
    position: relative;
    flex: 1;
  `;

  const index = "cohort_centric";
  const graphqlField = "cohort";
  const projectId = "demo_4";

  const client = new ApolloClient({
    uri: `${process.env.REACT_APP_ARRANGER_API}/${projectId}/graphql`,
  });

  return (
    <ApolloProvider client={client}>
      <div className={fullView}>
        <div className={headerStyle}>
          <div
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            <img src={logo} className={logoStyle}></img>
            International HundredK+ Cohorts Consortium
          </div>
          <div
            className={css`
              text-align: right;
              margin-right: 10px;
              color: black;
            `}
          >
            IHCC Cohort Atlas
          </div>
        </div>
        <div className={pageContainer}>
          <Router history={customHistory}>
            <Switch>
              <Route exact path="/">
                <CohortRepo
                  index={index}
                  graphqlField={graphqlField}
                  projectId={projectId}
                />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
