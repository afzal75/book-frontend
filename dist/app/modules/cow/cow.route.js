"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const router = express_1.default.Router();
router.patch('/cows/:id', cow_controller_1.CowController.updatedCow);
router.delete('/cows/:id', cow_controller_1.CowController.deleteCow);
router.get('/cows/:id', cow_controller_1.CowController.getSingleCow);
router.post('/cows', cow_controller_1.CowController.createCow);
router.get('/cows', cow_controller_1.CowController.getAllCows);
exports.CowRoutes = router;
