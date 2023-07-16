import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderService } from "./order.service";
import sendResponse from "../../../shared/sendApiResponse";
import httpStatus from "http-status";
import { IOrder } from "./order.interface";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  {
    const { ...userData } = req.body;
    const result = await OrderService.createOrder(userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order Created Successfully",
      data: result,
    });
  }
});

// get All Orders

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getOrders();

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved successfully !",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
};
