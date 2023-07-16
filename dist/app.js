"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
// import { UserRoutes } from "./app/modules/auth/auth.route";
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const user_route_1 = require("./app/modules/user/user.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const cow_route_1 = require("./app/modules/cow/cow.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application routes
app.use("/api/v1", user_route_1.UserRoutes);
app.use("/api/v1", auth_route_1.AuthRoutes);
app.use("/api/v1", cow_route_1.CowRoutes);
app.use("/api/v1", order_route_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(globalErrorHandler_1.default);
// handle not fund route
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
