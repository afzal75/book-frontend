import { Model, Types } from "mongoose";
import { IUser } from "../auth/auth.interface";
import { CowCategory, CowLocation, LabelEnum } from "../../../enums/cow";

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: CowLocation;
  breed:
    | "Brahman"
    | "Nellore"
    | "Sahiwal"
    | "Gir"
    | "Indigenous"
    | "Tharparkar"
    | "Kankrej";
  weight: number;
  label: LabelEnum;
  category: CowCategory;
  seller: Types.ObjectId | IUser;
};

export type ICowFilters = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  breed?: string;
  category?: string;
};

export type CowModel = Model<ICow, Record<string, unknown>>;
