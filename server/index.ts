import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { logoutRouter } from "./routes/logout";
import { secretRouter } from "./routes/secret";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Test");
});

// routes
app.use("/logout", logoutRouter);
app.get("/secret", secretRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
