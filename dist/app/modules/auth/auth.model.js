"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const mongoose_1 = require("mongoose");
const cow_1 = require("../../../enums/cow");
const userSchema = new mongoose_1.Schema({
    role: {
        type: String,
        required: true,
        enum: Object.values(cow_1.UserRole),
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// Create and export the User model
exports.AuthUser = (0, mongoose_1.model)('User', userSchema);
