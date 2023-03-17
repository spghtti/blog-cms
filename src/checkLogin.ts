export function checkLogin() {
  if (
    localStorage.getItem('isLoggedIn') === 'true' &&
    localStorage.getItem('token') !== null
  ) {
    return true;
  } else {
    return false;
  }
}
