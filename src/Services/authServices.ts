export enum StorageKeys {
  Token = "token",
  IsLoggedIn = "isLoggedIn",
  UserFullName = "userFullName",
}

export type LoginResponse = {
  token: string;
  firstName: string;
  lastName: string;
};

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error(res.status === 400 ? "Credenciales incorrectas" : "Error de servidor");

  return res.json();
}

export function saveLoginData(data: LoginResponse) {
  localStorage.setItem(StorageKeys.Token, JSON.stringify(data.token));
  localStorage.setItem(StorageKeys.UserFullName, JSON.stringify(`${data.firstName} ${data.lastName}`));
  localStorage.setItem(StorageKeys.IsLoggedIn, JSON.stringify(true));
}
