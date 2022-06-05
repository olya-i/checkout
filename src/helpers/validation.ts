export function validateEmail(email: string): boolean {
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regExp.test(String(email).toLowerCase());
}
