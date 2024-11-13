export type User = {
  userId: number;
  dateCreated: string;
  email: string;
  hashedPassword: string;
  isAuthenticated: boolean;
  Flash: string;
};

export const initialState: User = {
  userId: -1,
  dateCreated: "",
  email: "",
  hashedPassword: "",
  isAuthenticated: false,
  Flash: "",
};

export type UserInput = {
  email: string;
  password: string;
};
