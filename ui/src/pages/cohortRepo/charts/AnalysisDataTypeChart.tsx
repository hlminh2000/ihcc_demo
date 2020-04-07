import React from "react";
import { ResponsivePie } from "@nivo/pie";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type ChartData = { country: string; participants: number }[];

const data = [
  {
    id: "stylus",
    label: "stylus",
    value: 209,
    color: "hsl(322, 70%, 50%)"
  },
  {
    id: "hack",
    label: "hack",
    value: 378,
    color: "hsl(332, 70%, 50%)"
  },
  {
    id: "c",
    label: "c",
    value: 465,
    color: "hsl(69, 70%, 50%)"
  },
  {
    id: "scala",
    label: "scala",
    value: 596,
    color: "hsl(127, 70%, 50%)"
  },
  {
    id: "lisp",
    label: "lisp",
    value: 298,
    color: "hsl(335, 70%, 50%)"
  }
];

export default ({ sqon }: { sqon: {} | null }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 0, bottom: 30, left: 0 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={0}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      enableRadialLabels={false}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000"
              }
            }
          ]
        }
      ]}
    />
  );
};
