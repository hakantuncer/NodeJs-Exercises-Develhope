// Configure your app (app.use()) to:
// accept JSON from the Client
// log the Client's requests

import express from "express";
import morgan from "morgan";
import "dotenv/config";
import {
  getAll,
  getOneById,
  createOne,
  updateOneById,
  deleteOneById,
} from "./controllers/planets.js";
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", createOne);

app.put("/api/planets/:id", updateOneById);

app.delete("/api/planets/:id", deleteOneById);

app.listen(port, () => {
  console.log(
    `Server is running on port http://localhost:${port}`
  );
});
