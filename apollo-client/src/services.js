const AUTH_TOKEN = 'authentication-token';

export const authToken = {
  check() {
    return localStorage.getItem(AUTH_TOKEN) != null;
  },
  save(token) {
    localStorage.setItem(AUTH_TOKEN, token);
  },
  clear() {
    localStorage.removeItem(AUTH_TOKEN);
  },
};
