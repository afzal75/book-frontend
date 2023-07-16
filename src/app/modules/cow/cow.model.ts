import { Schema, model } from "mongoose";
import { ICow } from "./cow.interface";
import { CowCategory, CowLocation, LabelEnum } from "../../../enums/cow";
import { CowBreed, level } from "./cow.constance";

const cowSchema = new Schema<ICow>(
  {
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
      enum: Object.values(CowLocation),
    },
    breed: {
      type: String,
      enum: CowBreed,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      enum: Object.values(LabelEnum),
      default: LabelEnum.ForSale,
    },
    category: {
      type: String,
      enum: Object.values(CowCategory),
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const CowUser = model<ICow>("Cow", cowSchema);
