export function hasAtLeastOneDigit(password) {
  return /\d/.test(password);
}

export function hasAtLeastOneUppercase(password) {
  return /[A-Z]/.test(password);
}

export function hasAtLeastOneLowercase(password) {
  return /[a-z]/.test(password);
}

export function hasAtLeastOneSpecialChar(password) {
  return /[!@#$%^&*.(),?":{}|<>]/.test(password);
}

export function isAtLeast8Characters(password) {
  return password.length >= 8;
}

export function isValidEmail(email) {
  const emailRegex = /^\s*[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+\s*$/;
  return emailRegex.test(email);
}

export function isEmpty(input) {
  return input.trim() === '';
}
