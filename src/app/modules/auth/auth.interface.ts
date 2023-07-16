import { UserRole } from "../../../enums/cow";

export type UserName = {
    firstName: string
    lastName: string
  }

export type IUser = {
    UserRole: string;
    save: any;
    phoneNumber: string;
    name: UserName;
    role: UserRole;
    password?: string;
    address: string;
    budget: number;
    income: number;
  }

  