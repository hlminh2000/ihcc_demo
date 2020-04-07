import React, { useState } from "react";
import { css } from "emotion";
import GGMC_logo from "./GGMC_logo.png";
import chevron from "./chevron-right.svg";
import websiteIcon from "./website.svg";
import arrow from "./arrow-right@2x.png";
import Charts from "./charts";

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
const facetPanelContainer = (collapsed: boolean) => css`
  width: ${collapsed ? `50px` : `250px`};
  transition: all 0.25s;
  max-height: calc(100vh - 64px);
  border-right: solid 1px #dcdde1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
  min-height: 100%;
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
  padding: 18px;
  padding-bottom: 0px;
  & .sqon-view {
    & .sqon-bubble.sqon-value {
      background-color: #1e6e6d;
    }
    & .sqon-bubble.sqon-clear {
      color: #191970;
    }
  }
`;
const tableContainer = css`
  & .tableToolbar {
    padding: 8px 0px;
    font-size: 12px;
    & .group {
      & .dropDownHeader {
        display: none;
      }
      & .buttonWrapper {
        /* the Export TSV button */
        border-radius: 10px;
        border: solid 1px #b2b7c1;
        height: 27px;
      }
    }
    & .inputWrapper {
      display: none !important;
    }
    & .group {
      height: 32px;
    }
  }
  & .ReactTable {
    border: none;
    max-height: calc(100vh - 430px);
    & .rt-table {
      border: solid 1px lightgrey;
      & .rt-thead {
        background: white;
        & .rt-tr .rt-th {
          & .rt-resizable-header-content {
            color: #202020;
          }
          &.-sort-asc {
            box-shadow: inset 0 3px 0 0 #748ea6;
          }
          &.-sort-desc {
            box-shadow: inset 0 -3px 0 0 #748ea6;
          }
          padding-top: 8px;
          padding-bottom: 8px;
        }
      }
    }
    & .pagination-bottom {
      & .-pagination {
        padding: 0px;
        height: 45px;
        box-shadow: none;
        border: none;
      }
    }
  }
`;
const facetScroller = (collapsed: boolean) => css`
  overflow: scroll;
  display: flex;
  ${collapsed
    ? css`
        & > * {
          display: none;
        }
      `
    : ""}
  .aggregation-card {
    border-top: none;
    border-left: none;
    padding: 0px;
    margin: 0px;
    &:last-child {
      border-bottom: none;
    }
    .header {
      margin: 0px;
      .title-wrapper {
        padding: 10px;
        padding: 10px;
        background-color: #e8e8f0;
        color: #202020;
        & .title {
          color: #202020;
        }
        &.collapsed {
          padding-bottom: 10px;
          & > .arrow {
            padding: 0px;
          }
        }
      }
    }
    & .showMore-wrapper {
      & ::before {
        color: #47a8bd;
      }
      color: #202020;
      margin-top: 0px;
      padding-left: 8px;
      justify-content: flex-start;
    }
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
  justify-content: flex-end;
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
  color: #47478d;
`;
const sponsorLogo = css`
  width: 180px;
`;
const chevronLeft = css`
  width: 10px;
  margin-left: -5px;
`;

const emptySqonContainer = css`
  padding: 0px;
  height: 52px;
  font-size: 14px;
  padding-left: 19px;
  display: flex;
  align-items: center;
`;

const emptySqonArrowStyle = css`
  width: 12px;
  transform: rotate(180deg);
  margin-right: 5px;
`;

const collapseButtonStyle = (collapsed: boolean) => css`
  border: none;
  cursor: pointer;
  transform: rotate(${collapsed ? "0deg" : "180deg"});
  transition: all 0.5s;
`;

const TableWebsiteCell = ({ original }: { original: { website: string } }) => {
  const icon = css`
    width: 15px;
  `;
  const link = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `;
  return (
    <a className={link} href={original.website} target="_blank">
      <img className={icon} src={websiteIcon}></img>
    </a>
  );
};

type SQON = {};

const PageContent = (props: { sqon: SQON | null }) => {
  const [facetPanelCollapsed, setFacetPanelCollapsed] = React.useState(false);
  const onFacetCollapserClick = () => {
    setFacetPanelCollapsed(!facetPanelCollapsed);
  };

  console.log("sqon: ", props.sqon);

  return (
    <div className={pageContainer}>
      <div className={facetPanelContainer(facetPanelCollapsed)}>
        <div className={facetScroller(facetPanelCollapsed)}>
          <Aggregations
            style={{
              width: "100%"
            }}
            componentProps={{
              getTermAggProps: () => ({
                maxTerms: 3
              })
            }}
            {...props}
          />
        </div>
        <div className={`${footerStyle} ${facetPanelFooter}`}>
          <div
            className={collapseButtonStyle(facetPanelCollapsed)}
            onClick={onFacetCollapserClick}
          >
            <img src={chevron} className={chevronLeft}></img>
            <img src={chevron} className={chevronLeft}></img>
          </div>
        </div>
      </div>
      <div className={body}>
        <div className={bodyContent}>
          {!props.sqon ? (
            <div className={`sqon-view ${emptySqonContainer}`}>
              <img src={arrow} className={emptySqonArrowStyle}></img>
              Use the filter panel on the left to customize your cohort search.
            </div>
          ) : (
            <CurrentSQON {...props} />
          )}
          <Charts></Charts>
          <div className={tableContainer}>
            <Table
              {...props}
              customColumns={[
                {
                  index: 9999,
                  content: {
                    accessor: "website",
                    Header: "Website",
                    Cell: TableWebsiteCell,
                    width: 70
                  }
                }
              ]}
            />
          </div>
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
  const projectId = "demo_6";
  return (
    <Arranger
      disableSocket
      index={index}
      graphqlField={graphqlField}
      projectId={projectId}
      render={(props: any) => <PageContent {...props} />}
    />
  );
};

export default CohortRepo;
