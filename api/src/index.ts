import express from "express";

const PORT = process.env.PORT || 5050;

const app = express();

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
