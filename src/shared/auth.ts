import { authService } from "../lib/auth/auth-service.js";

export async function login(login: string, password: string) {
  const isEmail = login.includes("@");
  if (isEmail) {
    await authService.signIn(login, password);
  } else {
    await authService.signInWithUsername(login, password);
  }
}

export async function register(username: string, email: string, password: string) {
  return authService.signUp(email, password, username);
}

export async function logout() {
  await authService.signOut();
}
