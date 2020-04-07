import React from "react";
import { css } from "emotion";
import BarChart from "./BarChart";
import DiseaseTypeChart from "./DiseaseTypeChart";
import AnalysisDataTypeChart from "./AnalysisDataTypeChart";

import { Row, Col } from "react-grid-system";

const container = css`
  display: flex;
  position: relative;
  margin-top: 10px;
  border: solid 1px #d9d9df;
  padding: 8px;
`;
const chartContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
`;
const chartTitleStyle = css`
  font-size: 12px;
  font-weight: bold;
  color: #202020;
`;

export default ({ sqon }: { sqon?: {} }) => {
  return (
    <div className={container}>
      <Row className="row" style={{ width: "100%" }}>
        <Col lg={6}>
          <div className={`${chartContainer}`}>
            <div className={chartTitleStyle}>Participants by Country</div>
            <BarChart sqon={null} />
          </div>
        </Col>
        <Col lg={3}>
          <div className={`${chartContainer}`}>
            <div className={chartTitleStyle}>Disease Types</div>
            <DiseaseTypeChart sqon={null} />
          </div>
        </Col>
        <Col lg={3}>
          <div className={`${chartContainer}`}>
            <div className={chartTitleStyle}>Analysis Data Types</div>
            <AnalysisDataTypeChart sqon={null} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
