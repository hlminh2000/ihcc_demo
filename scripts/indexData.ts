import { Client } from "@elastic/elasticsearch";
import mapping from "./assets/cohort_centric.json";
import cohorts from "./assets/transformed_data.json";

const INDEX = "demo_index";

const esClient = new Client({
  node: "http://localhost:9200",
});

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

(async () => {
  await esClient.indices
    .delete({
      index: INDEX,
    })
    .catch((err) => console.log("index already exists"))
    .then(sleep);
  await esClient.indices
    .create({
      index: INDEX,
      body: mapping,
    })
    .catch((err) => console.log("create"))
    .then(sleep);
  await Promise.all(
    cohorts.map((cohort: object, i: number) => {
      try {
        return esClient.index({
          index: INDEX,
          body: cohort,
        });
      } catch (err) {
        console.log("i: ", i);
        throw err;
      }
    })
  );
})();
