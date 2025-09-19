export enum StorageKeys {
  Token = "token",
  IsLoggedIn = "isLoggedIn",
  UserFullName = "userFullName",
}

export interface LoginResponse {
  token: string;
  firstName: string;
  lastName: string;
}

