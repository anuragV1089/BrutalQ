import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import session from "express-session";
import postRouter from "./routes/postRouter";
import userRouter from "./routes/userRouter";
import replyRouter from "./routes/replyRouter";
import database from "./config/databse";
import ExpressError from "./config/errorHandler";
import { NextFunction } from "connect";
import connectPgSimple from "connect-pg-simple";
import cors from "cors";

const app: Express = express();

declare module "express-session" {
  interface SessionData {
    userId: number;
    userName: string;
  }
}

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: new (connectPgSimple(session))({
      conString: process.env.POSTGRES_URL,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "development" ? false : true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://frontend:3000",
    "http://localhost:8080",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/replies", replyRouter);

app.all("*splat", (req, res) => {
  throw new ExpressError(`This route doesn't exist`, 404);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  let message = "Internal Server Error";

  if (err instanceof ExpressError) {
    message = err.message;
  } else if (err.code) {
    // err.code is a Postgres SQLSTATE error code
    message = err.message;

    // Optional: customize certain codes
    switch (err.code) {
      case "23505": // unique_violation
        message = "Duplicate entry";
        break;
      case "22P02": // invalid_text_representation
        message = "Invalid input syntax";
        break;
      case "42703": // undefined_column
        message = err.message; // "column \"email\" does not exist"
        break;
      default:
        message = "Internal server error";
    }
  }

  res.status(200).json({ success: false, message, err });
});
const startServer = async () => {
  await database();

  app.listen(process.env.PORT, () => {
    console.log(`App is listening on ${process.env.PORT}`);
  });
};

startServer();
