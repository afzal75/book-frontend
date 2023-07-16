"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowUser = void 0;
const mongoose_1 = require("mongoose");
const cow_1 = require("../../../enums/cow");
const cow_constance_1 = require("./cow.constance");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: Object.values(cow_1.CowLocation),
    },
    breed: {
        type: String,
        enum: cow_constance_1.CowBreed,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
        unique: true,
    },
    label: {
        type: String,
        enum: Object.values(cow_1.LabelEnum),
        default: cow_1.LabelEnum.ForSale,
    },
    category: {
        type: String,
        enum: Object.values(cow_1.CowCategory),
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.CowUser = (0, mongoose_1.model)("Cow", cowSchema);
