export const PORT = Number(process.env.PORT);
export const ES_INDEX = String(process.env.ES_INDEX || "cohort_centric");
export const ES_HOSTS = (process.env.ES_HOSTS || "http://localhost:9200").split(
  ","
);
