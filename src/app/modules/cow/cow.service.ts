import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../interfaces/common";
import { IPaginationOptions } from "../../interfaces/pagination";
import { cowSearchableFields } from "./cow.constance";
import { ICow, ICowFilters } from "./cow.interface";
import { CowUser } from "./cow.model";

// create a new cow

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const createdCow = (await CowUser.create(cow)).populate("seller");

  if (!createdCow) {
    throw new ApiError(400, "Failed Create Cow", "");
  }
  return createdCow;
};

// Get ALl Cows

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // filtering by minimum price

  if (maxPrice !== undefined) {
    andConditions.push({
      price: { $lte: maxPrice },
    });
  }

  // filtering by maximum price

  if (minPrice !== undefined) {
    andConditions.push({
      price: { $gte: minPrice },
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await CowUser.find(whereConditions)
    .populate("seller")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await CowUser.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get Single cow

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await CowUser.findById(id).populate("seller");
  return result;
};

// update cow

const updatedCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const { name, seller, ...userData } = payload;

  const updatedUserData: Partial<ICow> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<ICow>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await CowUser.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate("seller");
  return result;
};

// Delete Cow

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await CowUser.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updatedCow,
  deleteCow,
};
