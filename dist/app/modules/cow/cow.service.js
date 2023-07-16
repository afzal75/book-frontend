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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const cow_constance_1 = require("./cow.constance");
const cow_model_1 = require("./cow.model");
// create a new cow
const createCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    const createdCow = (yield cow_model_1.CowUser.create(cow)).populate("seller");
    if (!createdCow) {
        throw new ApiError_1.default(400, "Failed Create Cow", "");
    }
    return createdCow;
});
// Get ALl Cows
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constance_1.cowSearchableFields.map((field) => ({
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
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.CowUser.find(whereConditions)
        .populate("seller")
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.CowUser.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get Single cow
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.CowUser.findById(id).populate("seller");
    return result;
});
// update cow
const updatedCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, seller } = payload, userData = __rest(payload, ["name", "seller"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`; // `name.fisrtName`
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = yield cow_model_1.CowUser.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate("seller");
    return result;
});
// Delete Cow
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.CowUser.findByIdAndDelete(id);
    return result;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updatedCow,
    deleteCow,
};
