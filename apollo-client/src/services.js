const AUTH_TOKEN = 'authentication-token';

// TODO: change from singleton to context passing into react tree
//   via mount/unmount mechanism so consumers don't have to call
//   these methods imperatively
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
