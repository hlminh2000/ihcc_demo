import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { css } from "emotion";

import {
  Arranger,
  GetProjects,
  Aggregations,
  CurrentSQON,
  Table
  // @ts-ignore
} from "@arranger/components/dist/Arranger";
import "@arranger/components/public/themeStyles/beagle/beagle.css";

const repoStyle = css``;

const CohortRepo = () => {
  const index = "cohort_centric";
  const graphqlField = "cohort";
  const projectId = "demo_1";
  return (
    <Arranger
      disableSocket
      index={index}
      graphqlField={graphqlField}
      projectId={projectId}
      render={({ style, ...props }: { style: {} }) => {
        return (
          <div style={{ display: "flex", ...style }} className={repoStyle}>
            <Aggregations
              style={{ width: 300 }}
              componentProps={{
                getTermAggProps: () => ({
                  maxTerms: 3
                })
              }}
              {...props}
            />
            <div
              className={css`
                position: relative;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
              `}
            >
              <CurrentSQON {...props} />
              <Table {...props} />
            </div>
          </div>
        );
      }}
    />
  );
};

export default CohortRepo;
