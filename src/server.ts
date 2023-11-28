import * as express from "express";

import { AppDataSource } from "./db";
import { User } from "./entity/User";
import userRoutes from "./routes/UserRoutes";

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        name: "Karin",
        document: "",
        birthDate: new Date(),
      })
    );

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        name: "Sans",
        document: "",
        birthDate: new Date(),
      })
    );
  })
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

export default app;
