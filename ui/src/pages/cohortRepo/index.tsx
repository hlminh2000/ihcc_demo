import React from "react";
import { css } from "emotion";
import GGMC_logo from "./GGMC_logo.png";

import {
  Arranger,
  Aggregations,
  CurrentSQON,
  Table
  // @ts-ignore
} from "@arranger/components/dist/Arranger";
import "@arranger/components/public/themeStyles/beagle/beagle.css";

const pageContainer = css`
  display: flex;
  flex-direction: row;
  max-height: 100%;
  height: 100%;
`;
const facetPanelContainer = css`
  width: 250px;
  max-height: calc(100vh - 64px);
  border-right: solid 1px #dcdde1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
`;
const body = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const bodyContent = css`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
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
const facetScroller = css`
  overflow: scroll;
  display: flex;
  .aggregation-card {
    border-top: none;
    &:last-child {
      border-bottom: none;
    }
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
const footerStyle = css`
  height: 56px;
  min-height: 56px;
  max-height: 56px;
  background: white;
  border-top: solid 1px #dcdde1;
  font-size: 12px;
  padding: 0px 10px;
`;
const facetPanelFooter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const bodyFooter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const footerSponsor = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const footerLink = css`
  margin: 10px;
`;
const sponsorLogo = css`
  width: 180px;
`;

const PageContent = ({ style, ...props }: { style: {} }) => {
  return (
    <div className={pageContainer}>
      <div className={facetPanelContainer}>
        <div className={facetScroller}>
          <Aggregations
            style={{ width: "100%" }}
            componentProps={{
              getTermAggProps: () => ({
                maxTerms: 3
              })
            }}
            {...props}
          />
        </div>
        <div className={`${footerStyle} ${facetPanelFooter}`}>
          <div>{"<<"}</div>
        </div>
      </div>
      <div className={body}>
        <div className={bodyContent}>
          <CurrentSQON {...props} />
          <Table {...props} />
        </div>
        <div className={`${footerStyle} ${bodyFooter}`}>
          <div className={footerSponsor}>
            Sponsored by
            <img className={sponsorLogo} src={GGMC_logo}></img>
          </div>
          <div>
            <a href="/" className={footerLink}>
              About IHCC
            </a>
            <a href="/" className={footerLink}>
              Contact Us
            </a>
          </div>
          <div>© 2020 International HundredK+ Cohorts Consortium</div>
        </div>
      </div>
    </div>
  );
};

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
      render={PageContent}
    />
  );
};

export default CohortRepo;
