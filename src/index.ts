import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";

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
app.use(bodyParser.json());

app.listen(3000);
