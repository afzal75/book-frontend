"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = require("../cow/cow.model");
const auth_model_1 = require("../auth/auth.model");
const order_model_1 = require("./order.model");
const cow_1 = require("../../../enums/cow");
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cow, buyer } = payload;
        const existingCow = yield cow_model_1.CowUser.findById(cow);
        if (!existingCow) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid cow reference ID", "");
        }
        const existingBuyer = yield auth_model_1.AuthUser.findOne({ _id: buyer, role: "buyer" });
        if (!existingBuyer) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid buyer reference ID", "");
        }
        const existingOrder = yield order_model_1.CowOrder.findOne(payload);
        if (existingOrder) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Already purchased this cow", "");
        }
        const cowPrice = existingCow.price;
        const buyerBudget = existingBuyer.budget;
        const sellerId = existingCow.seller;
        if (cowPrice > buyerBudget) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You don't have sufficient amount to buy this cow", "");
        }
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            existingCow.label = cow_1.LabelEnum.SoldOut;
            yield existingCow.save();
            // Deduct cow's cost from the buyer's budget
            existingBuyer.budget -= cowPrice;
            yield existingBuyer.save();
            // Increase seller's income by the cow's cost
            const existingSeller = yield auth_model_1.AuthUser.findById(sellerId);
            if (!existingSeller) {
                throw new Error("Seller not found");
            }
            existingSeller.income += cowPrice;
            yield existingSeller.save();
            // Create the order
            const createdOrder = yield order_model_1.CowOrder.create(payload);
            yield session.commitTransaction();
            session.endSession();
            return createdOrder;
        }
        catch (error) {
            yield session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
    catch (error) {
        throw error;
    }
});
// get all Order
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.CowOrder.find();
        return orders;
    }
    catch (error) {
        throw error;
    }
});
exports.OrderService = {
    createOrder,
    getOrders
};
