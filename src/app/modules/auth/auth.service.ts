import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./auth.interface";
import { AuthUser } from "./auth.model";

const createUser = async (user: IUser): Promise<IUser | any> => {
  // default password

  if (!user.password) {
    user.password = config.default_user_password as string;
  }
  const createdUser = await AuthUser.create(user);

  if(user.role === 'seller'){
    user.income = 0
  }

  if (!createdUser) {
    throw new ApiError(400, "Failed Create User", "");
  }
  return createdUser;
};

export const AuthService = {
  createUser,
};
