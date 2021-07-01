import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import routes from "./routes";
import cors from 'cors';

const app = express();
createConnection().then(connection => {
  console.log("Connected");
}).then(error => console.log(error));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);