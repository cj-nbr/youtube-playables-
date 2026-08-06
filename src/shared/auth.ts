import { authService } from "../lib/auth/auth-service";

export async function login(login: string, secretCode: string) {
 return authService.signIn(login, secretCode);
}

export async function register(fullName: string, email: string, phone: string, secretCode: string) {
 return authService.signUp(fullName, email, phone, secretCode);
}

export async function logout() {
 await authService.signOut();
}

