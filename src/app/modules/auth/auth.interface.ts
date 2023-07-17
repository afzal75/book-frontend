import { Model } from "mongoose";

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserResponse {
  accessToken: string;
  user: { name: string; email: string };
}

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, "name" | "email" | "password">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
