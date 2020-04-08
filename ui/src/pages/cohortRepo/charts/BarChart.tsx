import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveSankey } from "@nivo/sankey";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type ChartData = { country: string; cohorts: number }[];

const data = {
  nodes: [
    {
      id: "23AndMe"
    },
    {
      id: "Argo"
    },
    {
      id: "KF"
    },
    {
      id: "GDC"
    },
    {
      id: "PACA-AU"
    },

    {
      id: "Blood"
    },
    {
      id: "Stool"
    },
    {
      id: "Saliva"
    },
    {
      id: "Urine"
    }
  ],
  links: [
    {
      source: "PACA-AU",
      target: "Blood",
      value: 1
    },
    {
      source: "KF",
      target: "Stool",
      value: 1
    },
    {
      source: "GDC",
      target: "Stool",
      value: 1
    },
    {
      source: "23AndMe",
      target: "Stool",
      value: 1
    },
    {
      source: "23AndMe",
      target: "Saliva",
      value: 1
    },
    {
      source: "23AndMe",
      target: "Urine",
      value: 1
    },
    {
      source: "Argo",
      target: "Saliva",
      value: 1
    },
    {
      source: "Argo",
      target: "Urine",
      value: 1
    }
  ]
};

export default ({ sqon }: { sqon: {} | null }) => {
  // const { data, loading: loadingCountries } = useQuery<{
  //   cohort: {
  //     aggregations: {
  //       countries: {
  //         buckets: { key: string; doc_count: number }[];
  //       };
  //     };
  //   };
  // }>(
  //   gql`
  //     query COUNTRIES_AGGREGATION($sqon: JSON) {
  //       cohort {
  //         aggregations(filters: $sqon) {
  //           countries {
  //             buckets {
  //               key
  //               doc_count
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `,
  //   {
  //     variables: {
  //       sqon: sqon
  //     },
  //     fetchPolicy: "network-only"
  //   }
  // );
  // const chartData: ChartData =
  //   data?.cohort.aggregations.countries.buckets.map(({ key, doc_count }) => ({
  //     cohorts: doc_count,
  //     country: key
  //   })) || [];
  return (
    <ResponsiveSankey
      data={data}
      margin={{ top: 10, right: 80, bottom: 10, left: 80 }}
      align="justify"
      colors={{ scheme: "category10" }}
      nodeOpacity={1}
      nodeThickness={18}
      nodeInnerPadding={3}
      nodeSpacing={24}
      nodeBorderWidth={0}
      nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
      enableLinkGradient={true}
      labelPosition="outside"
      labelOrientation="horizontal"
      labelPadding={16}
      labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
      // legends={[
      //   {
      //     anchor: "bottom-right",
      //     direction: "column",
      //     translateX: 130,
      //     itemWidth: 100,
      //     itemHeight: 14,
      //     itemDirection: "right-to-left",
      //     itemsSpacing: 2,
      //     itemTextColor: "#999",
      //     symbolSize: 14,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000"
      //         }
      //       }
      //     ]
      //   }
      // ]}
    />
  );
};
