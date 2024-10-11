import { Camelize } from "camelize-ts";

export type UserResponse = {
  id: string;
  user_name: string;
  email: string;
  profile_picture: string | null;
};

export type User = Camelize<UserResponse>;
