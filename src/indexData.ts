import { Client } from "@elastic/elasticsearch";
import mapping from "./assets/cohort_centric.json";
import transformDocs from "transformDocs";
import { ES_INDEX } from "config";

export const initIndexMapping = async (index: string, esClient: Client) => {
  const serializedIndexName = index.toLowerCase();
  await esClient.indices.putMapping({
    index: serializedIndexName,
    body: mapping.mappings,
  });
};

const sleep = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

export default async (esClient: Client) => {
  const cohorts = transformDocs();
  await esClient.indices
    .delete({
      index: ES_INDEX,
    })
    .catch((err) => console.log("index already exists"))
    .then(sleep);
  await esClient.indices
    .create({
      index: ES_INDEX,
      body: mapping,
    })
    .catch((err) => console.log("create"))
    .then(sleep);
  await Promise.all(
    cohorts.map((cohort: object, i: number) => {
      try {
        return esClient.index({
          index: ES_INDEX,
          body: cohort,
        });
      } catch (err) {
        console.log("i: ", i);
        throw err;
      }
    })
  );
};
