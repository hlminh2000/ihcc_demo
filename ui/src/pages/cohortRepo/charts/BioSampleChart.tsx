import React from "react";
import { ResponsivePie } from "@nivo/pie";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type ChartData = {
  id: string;
  label: string;
  value: number;
}[];

export default ({ sqon }: { sqon: {} | null }) => {
  const { data: bioSampleQueryData } = useQuery<{
    cohort: {
      aggregations: {
        biosample__biosample_types: {
          buckets: {
            key: string;
            doc_count: number;
          }[];
        };
      };
    };
  }>(
    gql`
      query BIOSAMPLE_AGGREGATION {
        cohort {
          aggregations {
            biosample__biosample_types {
              buckets {
                key
                doc_count
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        sqon: sqon
      },
      fetchPolicy: "network-only"
    }
  );

  const chartData: ChartData =
    bioSampleQueryData?.cohort.aggregations.biosample__biosample_types.buckets.map(
      ({ doc_count, key }) => ({
        id: key,
        label: key,
        value: doc_count
      })
    ) || [];

  console.log("chartData: ", chartData);

  return (
    <ResponsivePie
      data={chartData}
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
