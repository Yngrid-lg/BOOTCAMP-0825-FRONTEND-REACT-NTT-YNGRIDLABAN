import type { LoginResponse } from "../app/domain/auth";

export async function loginUser(
  username: string,
  password: string,
): Promise<LoginResponse> {

  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok)
    throw new Error(
      res.status === 400 ? "Credenciales incorrectas" : "Error de servidor",
    );


  return res.json();
}
