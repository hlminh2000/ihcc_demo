import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveSankey } from "@nivo/sankey";
import { css } from "emotion";
import take from "lodash/take";
import identity from "lodash/identity";
import uniqBy from "lodash/uniqBy";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { stringify } from "querystring";
import { link } from "fs";

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
              sample_types: string[];
            };
          };
        }[];
      };
    };
  }>(
    gql`
      query($sqon: JSON) {
        cohort {
          hits(first: 1000, filters: $sqon) {
            edges {
              node {
                cohort_name
                biosample {
                  sample_types
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: { sqon },
      fetchPolicy: "network-only",
    }
  );
  const topCohorts = take(
    cohortsQueryData?.cohort.hits.edges
      .map((cohort) => ({
        name: cohort.node.cohort_name,
        sampleCount: cohort.node.biosample.sample_types.length,
      }))
      .sort((a, b) => b.sampleCount - a.sampleCount),
    5
  );
  const isInTopCohortList = (cohortName: string) =>
    topCohorts.some(({ name }) => name === cohortName);
  const OTHER_COHORTS = "Other Cohorts";
  const chartNodes: ChartData["nodes"] = uniqBy(
    cohortsQueryData?.cohort.hits.edges.reduce((acc, { node }) => {
      [
        ...node.biosample.sample_types.map((bioSampleType) => ({
          id: bioSampleType,
        })),
        isInTopCohortList(node.cohort_name) &&
        node.biosample.sample_types.length
          ? { id: node.cohort_name }
          : { id: OTHER_COHORTS },
      ].forEach((chartNode) => chartNode && acc.push(chartNode));
      return acc;
    }, [] as ChartData["nodes"]) || [],
    "id"
  );
  const chartLinks: ChartData["links"] = uniqBy(
    cohortsQueryData?.cohort.hits.edges.reduce((acc, { node }) => {
      node.biosample.sample_types
        .map((sampleType) => ({
          source: sampleType,
          target:
            isInTopCohortList(node.cohort_name) &&
            node.biosample.sample_types.length
              ? node.cohort_name
              : OTHER_COHORTS,
          value: 1 as 1,
        }))
        .forEach((chartNode) => acc.push(chartNode));
      return acc;
    }, [] as ChartData["links"]) || [],
    (link) => `${link.source}_${link.target}`
  );
  return (
    <div className={container(loading)}>
      {chartNodes.length && chartLinks.length && (
        <ResponsiveSankey
          data={{
            nodes: chartNodes,
            links: chartLinks,
          }}
          margin={{ top: 10, right: 200, bottom: 15, left: 85 }}
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
