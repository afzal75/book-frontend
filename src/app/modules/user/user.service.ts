import { IUser } from "../auth/auth.interface";
import { AuthUser } from "../auth/auth.model";

// get all users

const getAllUsers = async (): Promise<IUser[] | any> => {
  const result = await AuthUser.find();
  return result;
};

// get single user

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await AuthUser.findById(id);
  return result;
};

// update user

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // `name.fisrtName`
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await AuthUser.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// Delete User

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await AuthUser.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
