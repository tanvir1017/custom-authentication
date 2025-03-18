export type TUser = {
  _id: string;
  email: string;
  gender: string;
  isDeleted: boolean;
  name: {
    firstName: string;
    lastName: string;
  };
  profileImg: string;
  role: string;
};

export type TResponseUsers = {
  success: string;
  message: string;
  data: TUser[];
};
