import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
// import { UserRoutes } from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { UserRoutes } from "./app/modules/user/user.route";
import { AuthRoutes } from "./app/modules/auth/auth.route";
import { CowRoutes } from "./app/modules/cow/cow.route";
import { OrderRoutes } from "./app/modules/order/order.route";
const app: Application = express();
app.use(cors());

// parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes

app.use("/api/v1", UserRoutes);
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", CowRoutes);
app.use("/api/v1", OrderRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
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
