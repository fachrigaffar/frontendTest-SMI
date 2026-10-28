import type { AuthUser } from '../types';
import { demoUsers } from '../data/dummyUsers';

const SESSION_KEY = 'atelier-session';

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function login(email: string, password: string): AuthUser {
  const user = demoUsers.find((entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password);
  if (!user) throw new Error('Email atau password tidak sesuai. Periksa kembali kredensial Anda.');
  const session: AuthUser = { email: user.email, name: user.name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function readSession(): AuthUser | null {
  try {
    const value = localStorage.getItem(SESSION_KEY);
    if (!value) return null;
    const session: unknown = JSON.parse(value);
    if (
      typeof session === 'object' && session !== null &&
      'email' in session && typeof session.email === 'string' &&
      'name' in session && typeof session.name === 'string' && isValidEmail(session.email)
    ) return { email: session.email, name: session.name };
  } catch {
    // Corrupt storage is treated as a signed-out session.
  }
  localStorage.removeItem(SESSION_KEY);
  return null;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}
