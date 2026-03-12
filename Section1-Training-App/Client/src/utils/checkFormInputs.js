export function checkEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function checkPassword(password) {
  // return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/.test(
  //   password,
  // );
  return /^(?=.*[a-z])(?=.*[0-9]).{8,16}$/.test(password);
}

export function checkConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}
