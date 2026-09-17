"use client";

import type { StudentProfile } from "./types";

export interface StudentAccount {
  id: string;
  username: string;
  name: string;
  pin: string; // 4-digit PIN
  board: string;
  medium: string;
  targetScore: number;
  avatar: string;
  createdAt: string;
}

const ACCOUNTS_KEY = "daksh_student_accounts_v1";
const ACTIVE_USER_KEY = "daksh_active_user_id_v1";

export function listAccounts(): StudentAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getCurrentUser(): StudentAccount | null {
  if (typeof window === "undefined") return null;
  try {
    const activeId = localStorage.getItem(ACTIVE_USER_KEY);
    if (!activeId) return null;
    const accounts = listAccounts();
    return accounts.find((a) => a.id === activeId) || null;
  } catch {
    return null;
  }
}

export function signUp(data: {
  name: string;
  username: string;
  pin: string;
  board?: string;
  medium?: string;
  targetScore?: number;
  avatar?: string;
}): { success: boolean; error?: string; account?: StudentAccount } {
  if (typeof window === "undefined") return { success: false, error: "Window unavailable" };

  const accounts = listAccounts();
  const cleanUsername = data.username.trim().toLowerCase();

  if (!cleanUsername) return { success: false, error: "Username is required." };
  if (accounts.some((a) => a.username === cleanUsername)) {
    return { success: false, error: "Username already exists on this device." };
  }
  if (!data.name.trim()) return { success: false, error: "Full name is required." };
  if (!/^d{4}$/.test(data.pin)) return { success: false, error: "PIN must be exactly 4 digits." };

  const newAccount: StudentAccount = {
    id: "student_" + Math.random().toString(36).substring(2, 9),
    username: cleanUsername,
    name: data.name.trim(),
    pin: data.pin,
    board: data.board || "CBSE",
    medium: data.medium || "English",
    targetScore: data.targetScore || 95,
    avatar: data.avatar || "🎓",
    createdAt: new Date().toISOString(),
  };

  accounts.push(newAccount);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  localStorage.setItem(ACTIVE_USER_KEY, newAccount.id);

  // Dispatch auth event
  window.dispatchEvent(new CustomEvent("daksh-auth-changed", { detail: newAccount }));
  return { success: true, account: newAccount };
}

export function signIn(username: string, pin: string): { success: boolean; error?: string; account?: StudentAccount } {
  if (typeof window === "undefined") return { success: false, error: "Window unavailable" };

  const accounts = listAccounts();
  const cleanUsername = username.trim().toLowerCase();

  const account = accounts.find((a) => a.username === cleanUsername);
  if (!account) return { success: false, error: "Account not found. Please Sign Up." };
  if (account.pin !== pin) return { success: false, error: "Incorrect 4-digit PIN." };

  localStorage.setItem(ACTIVE_USER_KEY, account.id);
  window.dispatchEvent(new CustomEvent("daksh-auth-changed", { detail: account }));
  return { success: true, account };
}

export function switchAccount(id: string): { success: boolean; account?: StudentAccount } {
  if (typeof window === "undefined") return { success: false };

  const accounts = listAccounts();
  const account = accounts.find((a) => a.id === id);
  if (!account) return { success: false };

  localStorage.setItem(ACTIVE_USER_KEY, account.id);
  window.dispatchEvent(new CustomEvent("daksh-auth-changed", { detail: account }));
  return { success: true, account };
}

export function signOut(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACTIVE_USER_KEY);
  window.dispatchEvent(new CustomEvent("daksh-auth-changed", { detail: null }));
}

export function updateCurrentUser(patch: Partial<StudentAccount>): StudentAccount | null {
  if (typeof window === "undefined") return null;

  const current = getCurrentUser();
  if (!current) return null;

  const accounts = listAccounts();
  const updated = { ...current, ...patch };
  const idx = accounts.findIndex((a) => a.id === current.id);
  if (idx !== -1) {
    accounts[idx] = updated;
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  window.dispatchEvent(new CustomEvent("daksh-auth-changed", { detail: updated }));
  return updated;
}
