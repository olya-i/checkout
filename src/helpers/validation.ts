export function validateEmail(email: string): boolean {
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regExp.test(String(email).toLowerCase());
}

export function validateString(value: string | boolean): boolean {
  return typeof value === "string" && value?.trim()?.length > 0;
}
