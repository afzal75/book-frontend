import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { AuthRoutes } from "./app/modules/auth/auth.route";
const app: Application = express();
app.use(cors());

// parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", AuthRoutes);

app.get("/", (req, res) => {
  res.send("Heello World!");
});

app.use(globalErrorHandler)

// handle not fund route

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  })
  next()
})

export default app;
