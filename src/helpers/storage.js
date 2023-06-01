const tokenKey = 'token';

export function getAccessToken() {
  const token = localStorage.getItem(tokenKey);
  return token || '';
}

export function setAccessToken(accessToken) {
  localStorage.setItem(tokenKey, accessToken);
}

export function removeAccessToken() {
  localStorage.removeItem(tokenKey);
}
