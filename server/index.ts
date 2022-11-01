import express, { Express } from "express";
import { search, view } from "./routes/search";

const app: Express = express();
const port = 5500;

// Used to parse the request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/search", search);
app.use("/view", view);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
