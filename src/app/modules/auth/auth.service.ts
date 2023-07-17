import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, ILoginUserResponse, IUser } from "./auth.interface";
import { User } from "./auth.model";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist", '');
  }

  // match password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect", '');
  }

  const { email: userEmail, name } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userEmail, name },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    user: {email, name},
  };
};

const signupUser = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  loginUser,
  signupUser,
};
