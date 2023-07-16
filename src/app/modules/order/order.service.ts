import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IOrder } from "./order.interface";
import mongoose from "mongoose";
import { CowUser } from "../cow/cow.model";
import { AuthUser } from "../auth/auth.model";
import { CowOrder } from "./order.model";
import { LabelEnum } from "../../../enums/cow";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  try {
    const { cow, buyer } = payload;

    const existingCow = await CowUser.findById(cow);
    if (!existingCow) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Invalid cow reference ID",
        ""
      );
    }

    const existingBuyer = await AuthUser.findOne({ _id: buyer, role: "buyer" });
    if (!existingBuyer) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Invalid buyer reference ID",
        ""
      );
    }

    const existingOrder = await CowOrder.findOne(payload);
    if (existingOrder) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Already purchased this cow",
        ""
      );
    }

    const cowPrice = existingCow.price;
    const buyerBudget = existingBuyer.budget;
    const sellerId = existingCow.seller;

    if (cowPrice > buyerBudget) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You don't have sufficient amount to buy this cow",
        ""
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      existingCow.label = LabelEnum.SoldOut;
      await existingCow.save();

      // Deduct cow's cost from the buyer's budget
      existingBuyer.budget -= cowPrice;
      await existingBuyer.save();

      // Increase seller's income by the cow's cost
      const existingSeller = await AuthUser.findById(sellerId);
      if (!existingSeller) {
        throw new Error("Seller not found");
      }
      existingSeller.income += cowPrice;
      await existingSeller.save();

      // Create the order
      const createdOrder = await CowOrder.create(payload);

      await session.commitTransaction();
      session.endSession();

      return createdOrder;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

// get all Order
const getOrders = async (): Promise<IOrder[]> => {
  try {
    const orders = await CowOrder.find();
    return orders;
  } catch (error) {
    throw error;
  }
};

export const OrderService = {
  createOrder,
  getOrders
};
