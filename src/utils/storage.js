const TOKEN_KEY = 'KMS_TOKEN'

export function setToken(data) {
  window.localStorage.setItem(TOKEN_KEY, data)
}

export function getToken() {
  return window.localStorage.getItem(TOKEN_KEY)
}
