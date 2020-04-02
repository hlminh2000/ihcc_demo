import express from "express";

//@ts-ignore
import arranger from "@arranger/server";
//@ts-ignore
import adminGraphql from "@arranger/admin/dist";

const PORT = process.env.PORT || 6060;
const ES_HOST = process.env.ES_HOST || "http://localhost:9200";

const app = express();

(async () => {
  const adminApolloServer = await adminGraphql({
    esHost: ES_HOST
  });

  adminApolloServer.applyMiddleware({
    app: app,
    cors: true,
    path: "/admin"
  });

  const arrangerRouter = await arranger({ enableAdmin: false });
  app.use(arrangerRouter);

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
})();
