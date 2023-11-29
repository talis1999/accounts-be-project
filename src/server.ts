import * as express from "express";

import { AppDataSource } from "./db";
import userRoutes from "./routes/UserRoutes";

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

export default app;
