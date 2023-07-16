import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendApiResponse";
import httpStatus from "http-status";
import { CowService } from "./cow.service";
import pick from "../../../shared/pick";
import { cowFilterableFields } from "./cow.constance";
import { paginationFields } from "../../../constants/pagination";
import { ICow } from "./cow.interface";

// create a cow
const createCow = catchAsync(async (req: Request, res: Response) => {
  {
    const { ...cowData } = req.body;
    const result = await CowService.createCow(cowData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow Created Successfully",
      data: result,
    });
    //   next();
  }
});

// Get ALL Cows

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

//  Get Single Cow

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow retrieved successfully !",
    data: result,
  });
});

// update cow

const updatedCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await CowService.updatedCow(id, updatedData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow updated successfully !",
    data: result,
  });
});

// Delete Cow

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow deleted successfully !",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updatedCow,
  deleteCow,
};
