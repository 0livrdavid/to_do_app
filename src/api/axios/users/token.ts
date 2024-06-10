import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export function setToken(token: string) {
  setCookie('token', token, { maxAge: 60 * 60 * 2 }); // 2 hours
}

export function getToken() {
  return getCookie('token');
}

export function removeToken() {
  deleteCookie('token');
}