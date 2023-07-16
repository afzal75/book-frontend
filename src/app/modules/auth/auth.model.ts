import { Schema, model } from "mongoose";
import { IUser } from "./auth.interface";
import { UserRole } from "../../../enums/cow";

const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      enum: Object.values(UserRole),
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the User model
export const AuthUser = model<IUser>('User', userSchema)

