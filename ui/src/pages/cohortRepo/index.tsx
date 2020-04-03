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

const PageContent = ({ style, ...props }: { style: {} }) => {
  const pageContainer = css`
    display: flex;
    flex-direction: row;
    max-height: 100%;
    height: 100%;
  `;
  const facetPanelContainer = css`
    max-height: calc(100vh - 64px);
    border-right: solid 1px #dcdde1;
    overflow: scroll;
    .aggregation-card {
      border-top: none;
      .header {
        margin: 0px;
        .title-wrapper {
          padding: 10px;
          padding: 10px;
          background-color: #e8e8f0;
          &.collapsed {
            padding-bottom: 10px;
            & > .arrow {
              padding: 0px;
            }
          }
        }
      }
      border-left: none;
      padding: 0px;
      margin: 0px;
      .filter {
        padding-left: 5px;
        padding-right: 5px;
      }
      .bucket {
        padding: 3px 5px 5px 5px;
      }
    }
  `;
  const searchResultSection = css`
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    & .tableToolbar {
      & .inputWrapper {
        display: none !important;
      }
      & .group {
        height: 32px;
      }
    }
  `;
  return (
    <div className={pageContainer}>
      <div className={facetPanelContainer}>
        <Aggregations
          style={{ width: 300 }}
          componentProps={{
            getTermAggProps: () => ({
              maxTerms: 3
            })
          }}
          {...props}
        />
      </div>
      <div className={searchResultSection}>
        <CurrentSQON {...props} />
        <Table {...props} />
      </div>
    </div>
  );
};

const CohortRepo = () => {
  const index = "cohort_centric";
  const graphqlField = "cohort";
  const projectId = "demo_4";
  return (
    <Arranger
      disableSocket
      index={index}
      graphqlField={graphqlField}
      projectId={projectId}
      render={PageContent}
    />
  );
};

export default CohortRepo;
