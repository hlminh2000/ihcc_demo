import React from "react";
import { css } from "emotion";
import BarChart from "./BarChart";

const container = css`
  display: flex;
  position: relative;
  margin-top: 10px;
  height: 160px;
  border: solid 1px #d9d9df;
  padding: 8px;
`;
const barChartContainerStyle = css`
  width: 500px;
  height: 100%;
`;
const chartContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const chartTitleStyle = css`
  font-size: 12px;
  font-weight: bold;
  color: #202020;
`;

export default ({ sqon }: { sqon?: {} }) => {
  return (
    <div className={container}>
      <div className={`${barChartContainerStyle} ${chartContainer}`}>
        <div className={chartTitleStyle}>Participants by Country</div>
        <BarChart sqon={null} />
      </div>
      <div className={`${barChartContainerStyle} ${chartContainer}`}>
        <div className={chartTitleStyle}>Disease Type</div>
        {/* <BarChart sqon={null} /> */}
      </div>
    </div>
  );
};
