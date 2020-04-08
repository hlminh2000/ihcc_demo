import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveSankey } from "@nivo/sankey";
import { css } from "emotion";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { stringify } from "querystring";

const container = (loading: boolean) => css`
  height: 100%;
  width: 100%;
  position: relative;
  opacity: ${loading ? 0.5 : 1};
  transition: all 0.25s;
`;

type ChartData = {
  nodes: {
    id: string;
  }[];
  links: {
    source: string;
    target: string;
    value: 1;
  }[];
};

export default ({ sqon }: { sqon: {} | null }) => {
  const { data: cohortsQueryData, loading } = useQuery<{
    cohort: {
      hits: {
        edges: {
          node: {
            cohort_name: string;
            biosample: {
              biosample_types: string[];
            };
          };
        }[];
      };
    };
  }>(
    gql`
      query($sqon: JSON) {
        cohort {
          hits(
            first: 1000
            sort: [
              { field: "cohort_attributes.number_of_participants", order: desc }
            ]
            filters: $sqon
          ) {
            edges {
              node {
                cohort_name
                biosample {
                  biosample_types
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: { sqon },
      fetchPolicy: "network-only"
    }
  );
  const chartNodes: ChartData["nodes"] =
    cohortsQueryData?.cohort.hits.edges.reduce((acc, { node }) => {
      [
        ...node.biosample.biosample_types.map(bioSampleType => ({
          id: bioSampleType
        })),
        { id: node.cohort_name }
      ]
        .filter(chartNode => !acc.some(({ id }) => id === chartNode.id))
        .forEach(chartNode => acc.push(chartNode));
      return acc;
    }, [] as ChartData["nodes"]) || [];
  const chartLinks: ChartData["links"] =
    cohortsQueryData?.cohort.hits.edges.reduce((acc, { node }) => {
      node.biosample.biosample_types
        .map(sampleType => ({
          source: sampleType,
          target: node.cohort_name,
          value: 1 as 1
        }))
        .forEach(chartNode => acc.push(chartNode));
      return acc;
    }, [] as ChartData["links"]) || [];
  return (
    <div className={container(loading)}>
      {chartNodes.length && chartLinks.length && (
        <ResponsiveSankey
          data={{
            nodes: chartNodes,
            links: chartLinks
          }}
          margin={{ top: 10, right: 85, bottom: 15, left: 85 }}
          align="justify"
          colors={{ scheme: "category10" }}
          nodeOpacity={1}
          nodeThickness={18}
          nodeInnerPadding={3}
          nodeSpacing={2}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
          linkOpacity={0.5}
          linkHoverOthersOpacity={0.1}
          enableLinkGradient={false}
          labelPosition="outside"
          labelOrientation="horizontal"
          labelPadding={16}
          labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
        />
      )}
    </div>
  );
};
