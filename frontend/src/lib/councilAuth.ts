// src/lib/councilAuth.ts

const COUNCIL_ID = "COUNCIL2025";
const COUNCIL_PASSWORD = "admin@123";
const STORAGE_KEY = "bhoomika_council_auth";

export function loginCouncil(id: string, password: string): boolean {
  if (id === COUNCIL_ID && password === COUNCIL_PASSWORD) {
    localStorage.setItem(STORAGE_KEY, "true");
    return true;
  }
  return false;
}

export function isCouncilLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function logoutCouncil() {
  localStorage.removeItem(STORAGE_KEY);
}
