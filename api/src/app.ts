import express from "express";

//@ts-ignore
import arranger from "@arranger/server";
//@ts-ignore
import adminGraphql from "@arranger/admin/dist";

const PORT = process.env.PORT || 5050;
const ES_HOST = process.env.ES_HOST || "http://localhost:9200";

const app = express();

adminGraphql({
  esHost: ES_HOST
}).then((adminServer: any) => {
  adminServer.applyMiddleware({
    app: app,
    cors: true,
    path: "/admin"
  });

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});
