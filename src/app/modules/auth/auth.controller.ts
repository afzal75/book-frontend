import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import sendResponse from "../../../shared/sendApiResponse";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const signupUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.signupUser(userData);

  if (result) {
    const { email, name } = result;

    const accessToken = jwtHelpers.createToken(
      { email, name },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User created successfully",
      data: {
        accessToken,
        user: result,
      },
    });
  }
});

export const AuthController = {
  loginUser,
  signupUser,
};
