import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import _ from "lodash";

type ChartData = { country: string; cohorts: number }[];

export default ({ sqon }: { sqon: {} | null }) => {
  const { data, loading: loadingCountries } = useQuery<{
    cohort: {
      aggregations: {
        countries: {
          buckets: { key: string; doc_count: number }[];
        };
      };
    };
  }>(
    gql`
      query COUNTRIES_AGGREGATION($sqon: JSON) {
        cohort {
          aggregations(filters: $sqon, aggregations_filter_themselves: true) {
            countries {
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
        sqon: sqon,
      },
      fetchPolicy: "network-only",
    }
  );
  const rawChartData: ChartData =
    data?.cohort.aggregations.countries.buckets.map(({ key, doc_count }) => ({
      cohorts: doc_count,
      country: key,
    })) || [];
  const topGroup = _(rawChartData).orderBy("doc_count").take(20).value();
  const remaining = _(rawChartData)
    .difference(topGroup)
    .reduce((acc, bucket) => ({
      country: "other",
      cohorts: acc.cohorts + bucket.cohorts,
    }));
  return (
    <ResponsiveBar
      data={_(remaining ? [...topGroup, remaining] : topGroup)
        .orderBy("cohorts")
        .reverse()
        .value()}
      keys={["cohorts"]}
      indexBy="country"
      margin={{ top: 10, right: 0, bottom: 80, left: 0 }}
      padding={0.3}
      colors={["#47a8bd"]}
      enableGridY={false}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};
