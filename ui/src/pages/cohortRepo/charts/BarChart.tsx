import React from "react";
import { ResponsiveBar } from "@nivo/bar";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type ChartData = { country: string; participants: number }[];

export default ({ sqon }: { sqon: {} | null }) => {
  const { data: countriesQueryData, loading: loadingCountries } = useQuery<{
    cohort: {
      aggregations: {
        countries: {
          buckets: { key: string }[];
        };
      };
    };
  }>(
    gql`
      query($sqon: JSON) {
        cohort {
          aggregations(filters: $sqon) {
            countries {
              buckets {
                key
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        sqon: sqon
      }
    }
  );
  const countries = countriesQueryData?.cohort?.aggregations?.countries?.buckets?.map(
    ({ key }) => key
  );
  const { data: participantsData, loading, error } = useQuery<{
    cohort: {
      [k: string]: {
        cohort_attributes__number_of_participants: {
          stats: {
            sum: number;
          };
        };
      };
    };
  }>(
    gql`
    query COUNTRY_PARTICIPANTS_QUERY($sqon: JSON) {
      cohort {
        ${countries
          ?.map(
            country => `
            ${country}: aggregations(
              filters: {
                op: "and"
                content: [
                  { op: "in", content: { field: "countries", value: ["${country}"] } }
                  $sqon
                ]
              }
            ) {
              cohort_attributes__number_of_participants {
                stats {
                  sum
                }
              }
            }`
          )
          .join("\n")}
      }
    }
  `,
    {
      variables: {
        sqon: sqon || {
          op: "and",
          content: []
        }
      }
    }
  );
  const chartData: ChartData = Object.entries(participantsData?.cohort || {})
    .filter(([key]) => key !== "__typename")
    .map(([country, countryAggregation]) => ({
      country,
      participants:
        countryAggregation.cohort_attributes__number_of_participants.stats
          ?.sum || 0
    }));
  return (
    <ResponsiveBar
      data={chartData}
      keys={["participants"]}
      indexBy="country"
      margin={{ top: 10, right: 0, bottom: 40, left: 0 }}
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
          stagger: true
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 32
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
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};
