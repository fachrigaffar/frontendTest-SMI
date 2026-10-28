import { beforeEach, describe, expect, it } from 'vitest';
import { isValidEmail, login, logout, readSession } from './authService';

beforeEach(() => localStorage.clear());

describe('authService', () => {
  it('validates email format', () => {
    expect(isValidEmail('emily.johnson@fachristudio.demo')).toBe(true);
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('   ')).toBe(false);
  });

  it('creates and restores a session for valid demo credentials', () => {
    expect(login('EMILY.JOHNSON@FACHRISTUDIO.DEMO', 'emilyspass')).toEqual({ email: 'emily.johnson@fachristudio.demo', name: 'Emily Johnson' });
    expect(readSession()).toEqual({ email: 'emily.johnson@fachristudio.demo', name: 'Emily Johnson' });
  });

  it('rejects incorrect credentials without creating a session', () => {
    expect(() => login('emily.johnson@fachristudio.demo', 'wrongpass')).toThrow('Email atau password tidak sesuai');
    expect(readSession()).toBeNull();
  });

  it('clears malformed and logged-out sessions', () => {
    localStorage.setItem('atelier-session', '{invalid');
    expect(readSession()).toBeNull();
    expect(localStorage.getItem('atelier-session')).toBeNull();
    login('emily.johnson@fachristudio.demo', 'emilyspass');
    logout();
    expect(readSession()).toBeNull();
  });
});
