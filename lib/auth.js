'use client';
// Vista sposi protetta da password, come nel sito ospiti.
const KEY = 'viaggio_sposi_auth';
const PASSWORD = 'chiave2706';

export function isSposi() {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(KEY) === 'ok';
}
export function loginSposi(pw) {
  if (pw === PASSWORD) {
    sessionStorage.setItem(KEY, 'ok');
    return true;
  }
  return false;
}
export function logoutSposi() {
  sessionStorage.removeItem(KEY);
}
